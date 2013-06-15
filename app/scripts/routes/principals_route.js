App.PrincipalsRoute = Ember.Route.extend({
    model: function(params) {
        return App.Principal.find({});
    }
});

App.PrincipalRoute = Ember.Route.extend({
    model: function(params) {
        return App.Principal.findById(params.principal_id);
    },

    setupController: function(controller, principal) {
        this._super(controller, principal);

        this.controller.set('router', this);

        var self = this;
        var messages = App.Message.find({$or: [ { to: principal.id }, { from: principal.id } ]}, {})
            .then(function(messages) {
                self.controller.set('messages', messages);
            }
        );

            ;
        this.controller.set('messages', messages);
    }
});
