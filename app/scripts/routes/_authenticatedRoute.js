App.AuthenticatedRoute = Ember.Route.extend({
    beforeModel: function() {
        if (!App.session) {
            var loginController = this.controllerFor('login');
            var user = new nitrogen.User({ nickname: "current" });

            App.service.resume(user, function(err, session, user) {
                loginController.sessionHandler(err, session, user);
            });
        }
    },

    events: {
        error: function(reason, transition) {
            if (reason.status === 401) {

                var loginController = this.controllerFor('login');
                loginController.set('attemptedTransition', transition);
                this.transitionTo('login');
            }
        }
    }
});