App.PrincipalCommandsRoute = App.AuthenticatedRoute.extend({
    activate: function() {
        setTimeout(function() { $('#commandsTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#commandsTab').removeClass('active'); }, 0);
    },

    model: function() {
        console.log('in commands model');
        return this.modelFor("principal");
    }
});