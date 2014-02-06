App.AuthenticatedRoute = Ember.Route.extend({
    beforeModel: function() {
        if (!App.session) {
            return Ember.RSVP.reject();
        }
    },

    actions: {
        error: function(reason, transition) {
            App.set('attempedTransition', transition);
            this.transitionTo('user.login');
        }
    }
});