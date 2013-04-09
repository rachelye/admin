App.UserCreateController = Ember.Controller.extend({
    create: function() {
        console.log("creating account");
        var user = new magenta.User({ name: $('#name').val(),
                                      email: $('#email').val(),
                                      password: $('#password').val(),
                                      local_id: 'current' });

        // wait until session established to route
        App.deferReadiness();

        // TODO: do something more elegant that this.
        window.location = "/#/";

        App.service.create(user, App.sessionHandler);
    }
});