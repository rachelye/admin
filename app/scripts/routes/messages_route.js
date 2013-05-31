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

    model: function() {
        return App.Message.find();
    }
});
