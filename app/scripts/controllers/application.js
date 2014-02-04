App.ApplicationController = Ember.Controller.extend({
    actions: {
        signout: function() {
            App.session.service.clearCredentials(App.user);
            this.transitionToRoute('user.login');
            App.set('session', null);
        }        
    }
});
