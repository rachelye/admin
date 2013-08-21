App.PrincipalsRoute = App.AuthenticatedRoute.extend({
    pageLimit: 50,
    maxUpdateRate: 10000,
    timeoutSet: false,
    nextUpdate: new Date(),

    model: function(params) {
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

        if (!App.session) return;

        return App.Principal.find({ type: 'device' }, {
            skip: parseInt(this.get('params').skip),
            limit: parseInt(this.get('pageLimit')),
            sort: sort
        });
    },

    setupController: function(controller, model) {
        this._super(controller, model);

        this.controller.set('router', this);

//        var self = this;
//        this.subscription = App.session.onPrincipal(function(nitrogenMessage) {
            // if we already are locked and loaded to update, just return.
//            if (self.get('timeoutSet')) {
//                console.log('principals timeout already set, returning.')
//                return;
//            }

            // only update at most once every N seconds.
//            var updateTimeout = Math.max(0, self.get('nextUpdate').getTime() - new Date().getTime());
//            console.log('updating principals in ' + updateTimeout);

//            setTimeout(function() {
//                self.query().then(function(principals) {
//                    self.controller.set('content', principals);
//                });

//                self.set('nextUpdate', new Date(new Date().getTime() + self.get('maxUpdateRate')));
//                self.set('timeoutSet', false);
//            }, updateTimeout);

//            self.set('timeoutSet', true);
//        });
    },

    events: {
        willTransition: function(transition) {
            if (this.subscription) {
                App.session.disconnectSubscription(this.subscription);
                this.subscription = null;
            }
        }        
    }
});

App.PrincipalRoute = App.AuthenticatedRoute.extend({
    model: function(params) {
        this.set('params', params);
        return this.query();
    },

    query: function() {
        return App.Principal.findById(this.get('params.id'));
    },

    queryMessages: function(principal) {
        var self = this;
        var messages = App.Message.find({$or: [ { to: principal.id }, { from: principal.id } ]}, { limit: 25 })
            .then(function(messages) {
                self.controller.set('messages', messages);
            }
        );
    },

    serialize: function(model, params) {
        return { id: model.get('id') };
    },

    setupController: function(controller, principal) {
        this._super(controller, principal);

        this.controller.set('router', this);

        this.queryMessages(principal);

        var self = this;
        this.subscription = App.session.onMessage(function(nitrogenMessage) {
            self.queryMessages(principal);
        });

//        this.subscription = App.session.onPrincipal(function(nitrogenPrincipal) {
//           if (nitrogenPrincipal.id === self.get('controller.content.id')) {
//               var updatedPrincipal = App.Principal.create(nitrogenPrincipal);
//               self.controller.set('content', updatedPrincipal);
//           }
//        });
    },

    events: {
        willTransition: function(transition) {
            if (this.subscription) {
                App.session.disconnectSubscription(this.subscription);
                this.subscription = null;
            }
        }        
    }
});
