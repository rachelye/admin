App.UserLoginController = Ember.Controller.extend({
    login: function() {
        App.set('flash', null);
        var user = new nitrogen.User({ 
            email: $('#email').val(),
            password: $('#password').val(),
            nickname: 'current' 
        });

        App.service.authenticate(user, App.sessionHandler);
    }
});
