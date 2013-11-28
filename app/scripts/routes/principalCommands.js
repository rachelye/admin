App.PrincipalCommandsRoute = App.AuthenticatedRoute.extend({
    activate: function() {
        setTimeout(function() { $('#commandsTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#commandsTab').removeClass('active'); }, 0);
    },

    model: function() {
        return this.modelFor("principal");
    }
});