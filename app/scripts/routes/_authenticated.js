App.AuthenticatedRoute = Ember.Route.extend({
    beforeModel: function() {
        if (!App.session) {
            return Ember.RSVP.reject();
        }
    },

    actions: {
        error: function(reason, transition) {
            App.resetSession();
        },

        willTransition: function(transition) {
            App.set('flash', null);
            return true;
        }
    }
});