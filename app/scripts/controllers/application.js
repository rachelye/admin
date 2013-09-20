App.ApplicationController = Ember.Controller.extend({
    actions: {
        signout: function() {
            App.session.clearCredentials();
            this.transitionToRoute('login');
            App.set('session', null);
        }        
    }
});