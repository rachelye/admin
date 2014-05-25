App.ApplicationController = Ember.Controller.extend({
    changePasswordUrl: function() {
        return App.get('session.service.config.endpoints.users') + '/changepassword';
    }.property('App.session'),

    loginUrl: function() {
        return App.get('session.service.config.endpoints.users') + '/login';
    }.property('App.session'),

    logoutUrl: function() {
        return App.get('session.service.config.endpoints.users') + '/logout';
    }.property('App.session')
});
