App.PrincipalsRoute = App.AuthenticatedRoute.extend({
    pageLimit: 50,
    maxUpdateRate: 10000,
    timeoutSet: false,
    nextUpdate: new Date(),

    activate: function() {
        setTimeout(function() { $('#principalsTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#principalsTab').removeClass('active'); }, 0);
    },

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

        return App.Principal.find({ }, {
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

    actions : {
        delete: function(principal) {
            var self = this;
            principal.remove(App.session, function(err) {
                self.transitionTo('principals');
            });
        }
    },

    activate: function() {
        setTimeout(function() { $('#principalsTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#principalsTab').removeClass('active'); }, 0);
    },

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
        this.subscription = App.session.onMessage({$or: [ { to: this.get('controller.content.id') }, 
                                                          { from: this.get('controller.content.id') } ]}, function(nitrogenMessage) {
            self.queryMessages(principal);
        });

        /*

        TODO: principals_realtime: disabled until we work out rate limiting to prevent update storms.

        this.subscription = App.session.onPrincipal({ id: this.get('controller.content.id') }, function(nitrogenPrincipal) {
            var updatedPrincipal = App.Principal.create(nitrogenPrincipal);
            self.controller.set('content', updatedPrincipal);
        });
        */
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
