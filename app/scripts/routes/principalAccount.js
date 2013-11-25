App.PrincipalAccountRoute = App.AuthenticatedRoute.extend({
    activate: function() {
        setTimeout(function() { $('#principalAccountTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#principalAccountTab').removeClass('active'); }, 0);
    },

    model: function() {
        return this.modelFor("principal");
    }
});