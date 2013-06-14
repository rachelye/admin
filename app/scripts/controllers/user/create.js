App.UserCreateController = Ember.Controller.extend({
    create: function() {
        App.set('flash', null);
        var user = new nitrogen.User({ 
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            nickname: 'current' 
        });

        App.service.create(user, App.sessionHandler);
    }
});
