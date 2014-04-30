App.MessagesRoute = App.MessagePagingRoute.extend({
    messagePageLimit: 50,
    baseUrl: "/#/messages",

    activate: function() {
        setTimeout(function() { $('#messagesTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#messagesTab').removeClass('active'); }, 0);
    },

    model: function(params) {
        this.set('params', params);

        return this.query();
    },

    query: function() {
        var sort = {};
        sort[this.get('params').sort] = parseInt(this.get('params').direction);

        return App.Message.find({
            type:   { $ne: 'heartbeat' },
            ts:     { $lt: new Date() }
        }, {
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

        //this.get('controller').set('router', this);

        var self = this;
        this.subscription = App.session.onMessage(function(nitrogenMessage) {
            self.query().then(function(messages) {
                self.controller.set('content', messages);
            });
        });
    },

    actions: {
        willTransition: function(transition) {
            if (this.subscription) {
                var session = App.get('session');

                if (session) session.disconnectSubscription(this.subscription);
                this.subscription = null;
            }
        }
    }
});
