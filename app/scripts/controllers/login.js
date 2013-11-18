App.LoginController = Ember.Controller.extend({
    mode: 'signin',

    createMode:             function() { return this.get('mode') === 'create';   }.property('mode'),
    resetPasswordMode:      function() { return this.get('mode') === 'reset';   }.property('mode'),
    notResetPasswordMode:   function() { return !this.get('resetPasswordMode'); }.property('resetPasswordMode'),
    signInMode:             function() { return this.get('mode') === 'signin';   }.property('mode'),

    modeTitle: function() {
        var mode = this.get('mode');

        if (mode === 'create') return "CREATE ACCOUNT";
        if (mode === 'signin') return "SIGN IN";
        if (mode === 'reset') return "RESET PASSWORD";
    }.property('mode'),

    actions: {

        create: function() {
            var user = new nitrogen.User({
                name: this.get('name'),
                email: this.get('email'),
                password: this.get('password'),
                nickname: 'current'
            });

            App.service.create(user, App.sessionHandler);
        },

        login: function() {
            var user = new nitrogen.User({
                email: this.get('email'),
                password: this.get('password'),
                nickname: 'current' 
            });

            App.service.authenticate(user, App.sessionHandler);
        },

        resetPassword: function() {
            // App.service.resetPassword(this.get('email'), function(err) {
            //     var msg = err || "Your password has been reset.  We'll email you a link to reset your password shortly."
            //     App.set('flash', msg);
            //
            //     this.switchToSignIn();
            // });
        },

        switchToCreate:         function() { this.set('mode', 'create'); },
        switchToResetPassword:  function() { this.set('mode', 'reset'); },
        switchToSignIn:         function() { this.set('mode', 'signin'); }
    }
});
