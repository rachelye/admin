App.MessagesRoute = Ember.Route.extend({

    setupController: function(controller, model) {
        this._super(controller, model);
        Ember.Instrumentation.subscribe('onMessage', {
            before: function(name, timestamp, message) {
                controller.send('onMessage', message);
            },
            after: function() {}
        });
    },

    claim: function() {
        console.log("messages route");
    },

    model: function(params) {
        console.log('skip: ' + params.skip);
        console.log('direction: ' + params.direction);
        console.log('sort: ' + params.sort);

        var sort = {};
        sort[params.sort] = parseInt(params.direction);

        return App.Message.find({}, {
            skip: params.skip,
            limit: 50,
            sort: sort
        });
    }
});
