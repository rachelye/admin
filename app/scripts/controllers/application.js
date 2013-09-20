App.ApplicationController = Ember.Controller.extend({
    actions: {
        signout: function() {
            App.session.clearCredentials();
            App.set('session', null);
            this.transitionToRoute('login');
        }        
    }
});