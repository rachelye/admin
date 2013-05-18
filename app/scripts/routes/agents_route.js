App.AgentsRoute = Ember.Route.extend({
    model: function() {
        return App.Agent.find();
    }
});
