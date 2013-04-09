App.UserLoginController = Ember.Controller.extend({
    login: function() {
        var user = new magenta.User({email: $('#email').val(), password: $('#password').val()});

        // wait until session established to route
        App.deferReadiness();

        // TODO: do something more elegant that this.
        window.location = "/#/";

        App.service.authenticate(user, App.sessionHandler);
    }
});
