App.ApplicationController = Ember.Controller.extend({
    actions: {
        signout: function() {
            App.session.clearCredentials();
            this.transitionToRoute('user.login');
            App.set('session', null);
        }        
    }
});