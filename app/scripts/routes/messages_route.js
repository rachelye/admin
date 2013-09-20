App.MessagesRoute = App.AuthenticatedRoute.extend({
    messagePageLimit: 50,

    activate: function() {
        setTimeout(function() { $('#messagesTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#messagesTab').removeClass('active'); }, 0);
    },

    model: function(params) {
        console.log('skip: ' + params.skip);
        console.log('direction: ' + params.direction);
        console.log('sort: ' + params.sort);

        this.set('params', params);

        return this.query();
    },

    query: function() {
        var sort = {};
        sort[this.get('params').sort] = parseInt(this.get('params').direction);

        return App.Message.find({ }, {
            skip: parseInt(this.get('params').skip),
            limit: parseInt(this.get('messagePageLimit')),
            sort: sort
        });
    },

    serialize: function(params) {
        return {
            skip: params.skip,
            sort: params.sort,
            direction: params.direction
        };
    },

    setupController: function(controller, model) {
        this._super(controller, model);

        this.controller.set('router', this);

        var self = this;
        this.subscription = App.session.onMessage(function(nitrogenMessage) {
            self.query().then(function(messages) {
                self.controller.set('content', messages);
            });
        });
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
