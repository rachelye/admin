App.PrincipalPermissionsRoute = App.AuthenticatedRoute.extend({
    messagePageLimit: 50,

    activate: function() {
        setTimeout(function() { $('#principalPermissionsTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#principalPermissionsTab').removeClass('active'); }, 0);
    },

    model: function(params) {
        console.log('in permissions model');
        var principal = this.modelFor('principal');
        return App.Permission.find({ 
            $or: [ 
                { issued_to: principal.id }, 
                { principal_for: principal.id } 
            ] 
        }, {});
    }
});