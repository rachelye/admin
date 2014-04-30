App.PrincipalRoute = App.AuthenticatedRoute.extend({
    activate: function() {
    },

    deactivate: function() {
        setTimeout(function() { $('#usersTab').removeClass('active'); }, 0);
        setTimeout(function() { $('#allTab').removeClass('active'); }, 0);
        setTimeout(function() { $('#devicesTab').removeClass('active'); }, 0);
    },

    model: function(params) {
        this.set('params', params);
        return this.query();
    },

    query: function() {
        return App.Principal.findById(this.get('params.id'));
    },

    serialize: function(model, params) {
        return { id: model.get('id') };
    },

    setupController: function(controller, principal) {
        this._super(controller, principal);

        //this.controller.set('router', this);

        if (this.get('controller.content.type') === 'user') {
            setTimeout(function() { $('#usersTab').addClass('active'); }, 0);
        } else if (this.get('controller.content.type') === 'device') {
            setTimeout(function() { $('#devicesTab').addClass('active'); }, 0);
        } else {
            setTimeout(function() { $('#allTab').addClass('active'); }, 0);
        }

    }
});