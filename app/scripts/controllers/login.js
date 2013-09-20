App.LoginController = Ember.Controller.extend({
    mode: 'signin',

    createMode:             function() { return this.get('mode') === 'create';   }.property('mode'),
    forgotPasswordMode:     function() { return this.get('mode') === 'forgot';   }.property('mode'),
    notForgotPasswordMode:  function() { return !this.get('forgotPasswordMode'); }.property('forgotPasswordMode'),
    signInMode:             function() { return this.get('mode') === 'signin';   }.property('mode'),

    modeTitle: function() {
        var mode = this.get('mode');

        if (mode === 'create') return "CREATE ACCOUNT";
        if (mode === 'signin') return "SIGN IN";
        if (mode === 'forgot') return "RESET PASSWORD";
    }.property('mode'),

    switchToCreate:         function() { this.set('mode', 'create'); },
    switchToForgotPassword: function() { this.set('mode', 'forgot'); },
    switchToSignIn:         function() { this.set('mode', 'signin'); },

    submit: function() {
        App.set('flash', null);

        if (this.get('signInMode'))
            this.login();
        else if (this.get('forgotPasswordMode'))
            this.forgotPassword();
        else if (this.get('create'))
            this.create();
    },

    create: function() {
        var user = new nitrogen.User({
            name: this.get('name'),
            email: this.get('email'),
            password: this.get('password'),
            nickname: 'current'
        });

        App.service.create(user, App.sessionHandler);
    },

    forgotPassword: function() {
        // App.service.forgotPassword(this.get('email'), function(err) {
        //     var msg = err || "Your password has been reset.  We'll email you a link to reset your password shortly."
        //     App.set('flash', msg);
        //
        //     this.switchToSignIn();
        // });
    },

    login: function() {
        var user = new nitrogen.User({
            email: this.get('email'),
            password: this.get('password'),
            nickname: 'current' 
        });

        App.service.authenticate(user, App.sessionHandler);
    }

});
