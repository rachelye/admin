App.UserLoginController = Ember.Controller.extend({
    login: function() {
        var user = new magenta.User({ email: $('#email').val(),
                                      password: $('#password').val(),
                                      local_id: "current" });

        App.service.authenticate(user, App.sessionHandler);
    }
});
