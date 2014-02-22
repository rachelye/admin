App.PrincipalPermissionsRoute = App.AuthenticatedRoute.extend({
    messagePageLimit: 50,

    activate: function() {
        setTimeout(function() { $('#principalPermissionsTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#principalPermissionsTab').removeClass('active'); }, 0);
    },

    model: function(params) {
        return this.query();
    },

    query: function() {
        var principal = this.modelFor('principal');
        return App.Permission.find({ 
            $or: [ 
                { issued_to: principal.id }, 
                { principal_for: principal.id } 
            ] 
        }, {});
    },

    actions: {
        deletePermission: function(permission) {
            var self = this;
            permission.remove(App.session, function(err) {
                if (err) return App.set('flash', err.message);

                self.query().then(function(permissions) {
                    self.controller.set('content', permissions);
                });
            });
        }        
    }

});