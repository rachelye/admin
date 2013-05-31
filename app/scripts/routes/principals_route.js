App.PrincipalsRoute = Ember.Route.extend({
    model: function(params) {
        return App.Principal.find({ type: params.type });
    }
});
