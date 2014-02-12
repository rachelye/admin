App.UserLoginController = Ember.Controller.extend({
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
            var self = this;
            nitrogen.Principal.resetPassword(App.config, this.get('email'), function(err) {
                var message;
                if (err) message = err.message;

                var msg = message || "Your password has been reset.  Please check your email for login instructions.";
                App.set('flash', msg);
            
                if (!err) self.set('mode', 'signin');
            });
        },

        switchToCreate:         function() { this.set('mode', 'create'); },
        switchToResetPassword:  function() { this.set('mode', 'reset'); },
        switchToSignIn:         function() { this.set('mode', 'signin'); }
    }
});
