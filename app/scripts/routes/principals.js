App.PrincipalsRoute = App.AuthenticatedRoute.extend({
    pageLimit: 50,
    maxUpdateRate: 10000,
    timeoutSet: false,
    nextUpdate: new Date(),

    tabHighlight: function() {
        if (this.get('params.type') === 'user') {
            setTimeout(function() { $('#usersTab').addClass('active'); }, 0);
            setTimeout(function() { $('#allTab').removeClass('active'); }, 0);
            setTimeout(function() { $('#devicesTab').removeClass('active'); }, 0);
        } else if (this.get('params.type') === 'device') {
            setTimeout(function() { $('#usersTab').removeClass('active'); }, 0);
            setTimeout(function() { $('#allTab').removeClass('active'); }, 0);
            setTimeout(function() { $('#devicesTab').addClass('active'); }, 0);
        } else {
            setTimeout(function() { $('#usersTab').removeClass('active'); }, 0);
            setTimeout(function() { $('#allTab').addClass('active'); }, 0);
            setTimeout(function() { $('#devicesTab').removeClass('active'); }, 0);
        }
    }.observes('params.type'),

    activate: function() {
        if (this.get('params.type') === 'user') {
            setTimeout(function() { $('#usersTab').addClass('active'); }, 0);
        } else if (this.get('params.type') === 'device') {
            setTimeout(function() { $('#devicesTab').addClass('active'); }, 0);
        } else {
            setTimeout(function() { $('#allTab').addClass('active'); }, 0);
        }
    },

    deactivate: function() {
        setTimeout(function() { $('#usersTab').removeClass('active'); }, 0);
        setTimeout(function() { $('#allTab').removeClass('active'); }, 0);
        setTimeout(function() { $('#devicesTab').removeClass('active'); }, 0);
    },

    model: function(params) {
        params.sort = 'last_connection';
        params.direction = -1;
        params.skip = 0;

        this.set('params', params);
        return this.query();
    },

    query: function() {
        var filter = {};

        if (this.get('params.type') != 'all') {
            filter.type = this.get('params.type');
        }

        var sort = {};
        sort[this.get('params').sort] = parseInt(this.get('params').direction);

        if (!App.session) return;

        return App.Principal.find(filter, {
            skip: parseInt(this.get('params').skip),
            limit: parseInt(this.get('pageLimit')),
            sort: sort
        });
    },

    setupController: function(controller, model) {
        this._super(controller, model);

        this.controller.set('router', this);

//        var self = this;
//        setInterval(function() {
//            self.query().then(function(principals) {
//                self.controller.set('content', principals);
//            });
//        }, 10000);
    },

    actions: {
        delete: function(principal) {
            var self = this;
            principal.remove(App.session, function(err) {
                if (err) return App.set('flash', err.message);

                self.query().then(function(principals) {
                    self.controller.set('content', principals);
                });
            });
        }
/*

        willTransition: function(transition) {
            if (this.subscription) {
                App.session.disconnectSubscription(this.subscription);
                this.subscription = null;
            }
        }
*/
    }
});
