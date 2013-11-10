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

    actions: {
        willTransition: function(transition) {
            if (this.subscription) {
                App.session.disconnectSubscription(this.subscription);
                this.subscription = null;
            }
        }        
    }
});