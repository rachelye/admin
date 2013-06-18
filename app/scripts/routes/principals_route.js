App.PrincipalsRoute = Ember.Route.extend({
    pageLimit: 50,
    maxUpdateRate: 10000,
    timeoutSet: false,
    nextUpdate: new Date(),

    model: function(params) {
        // TODO: implement sorting and paging
        params = {
            sort: 'last_connection',
            direction: -1,
            skip: 0
        };

        this.set('params', params);
        return this.query();
    },

    query: function() {
        var sort = {};
        sort[this.get('params').sort] = parseInt(this.get('params').direction);

        return App.Principal.find({}, {
            skip: parseInt(this.get('params').skip),
            limit: parseInt(this.get('pageLimit')),
            sort: sort
        });
    },

    setupController: function(controller, model) {
        this._super(controller, model);

        this.controller.set('router', this);

        var self = this;
        App.session.onPrincipal(function(nitrogenMessage) {
            // if we already are locked and loaded to update, just return.
            if (self.get('timeoutSet')) {
                console.log('principals timeout already set, returning.')
                return;
            }

            // only update at most once every N seconds.
            var updateTimeout = Math.max(0, self.get('nextUpdate').getTime() - new Date().getTime());
            console.log('updating principals in ' + updateTimeout);

            setTimeout(function() {
                self.query().then(function(principals) {
                    self.controller.set('content', principals);
                });

                self.set('nextUpdate', new Date(new Date().getTime() + self.get('maxUpdateRate')));
                self.set('timeoutSet', false);
            }, updateTimeout);

            self.set('timeoutSet', true);
        });
    }
});

App.PrincipalRoute = Ember.Route.extend({
    model: function(params) {
        return App.Principal.findById(params.principal_id);
    },

    setupController: function(controller, principal) {
        this._super(controller, principal);

        this.controller.set('router', this);

        var self = this;
        var messages = App.Message.find({$or: [ { to: principal.id }, { from: principal.id } ]}, {})
            .then(function(messages) {
                self.controller.set('messages', messages);
            }
        );

        this.controller.set('messages', messages);
    }
});
