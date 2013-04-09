App.MessagesRoute = Ember.Route.extend({

    model: function() {
        return App.Message.find();
    }

});
