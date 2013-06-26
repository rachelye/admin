App.MessagesRoute = App.AuthenticatedRoute.extend({
    messagePageLimit: 50,

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

        return App.Message.find({ type: { $ne: 'heartbeat' } }, {
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
        }
    },

    setupController: function(controller, model) {
        this._super(controller, model);

        this.controller.set('router', this);

        var self = this;
        App.session.onMessage(function(nitrogenMessage) {
            self.query().then(function(messages) {
                self.controller.set('content', messages);
            });
        });
    }
});
