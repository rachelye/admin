App.AgentsRoute = App.AuthenticatedRoute.extend({
    model: function() {
        return App.Agent.find();
    }
});
