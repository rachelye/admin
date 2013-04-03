App.MessagesRoute = Ember.Route.extend({

    model: function() {
        return magenta.Message.findAll(App.session);
    }

});
