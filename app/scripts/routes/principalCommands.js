App.PrincipalCommandsRoute = App.AuthenticatedRoute.extend({
    activate: function() {
        setTimeout(function() { $('#commandsTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#commandsTab').removeClass('active'); }, 0);
    },

    model: function() {
        var principal = this.modelFor("principal");
        console.log('in principal commands route: ' + principal.id);
        return principal;
    }
});