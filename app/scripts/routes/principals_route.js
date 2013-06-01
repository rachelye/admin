App.PrincipalsRoute = Ember.Route.extend({
    model: function(params) {
        return App.Principal.find({});
    }
});

App.PrincipalRoute = Ember.Route.extend({
    model: function(params) {
        console.log('in principal route, looking for ' + params.principal_id);
        return App.Principal.findById(params.principal_id);
    }
})
