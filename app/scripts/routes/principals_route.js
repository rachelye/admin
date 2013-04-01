App.PrincipalsRoute = Ember.Route.extend({

    model: function() {
        return App.Principal.find();
    }

});