App.AuthenticatedRoute = Ember.Route.extend({
    beforeModel: function() {
        if (!App.session) {
            return Ember.RSVP.reject();
        }
    },

    events: {
        error: function(reason, transition) {
            console.log('oops');
            App.set('attempedTransition', transition);
            this.transitionTo('login');
        }
    }
});