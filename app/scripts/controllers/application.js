App.ApplicationController = Ember.Controller.extend({
    signout: function() {
        App.session.clearCredentials();
        this.transitionToRoute('login');
    }
});