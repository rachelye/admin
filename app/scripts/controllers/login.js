App.LoginController = Ember.Controller.extend({
    mode: 'signin',

    createMode:             function() { return this.get('mode') === 'create';   }.property('mode'),
    forgotPasswordMode:     function() { return this.get('mode') === 'forgot';   }.property('mode'),
    notForgotPasswordMode:  function() { return !this.get('forgotPasswordMode'); }.property('forgotPasswordMode'),
    signInMode:             function() { return this.get('mode') === 'signin';   }.property('mode'),

    modeTitle: function() {
        var mode = this.get('mode');

        if (mode === 'create') return "Create Account";
        if (mode === 'signin') return "Sign In";
        if (mode === 'forgot') return "Password Reset";
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

        var self = this;
        App.service.create(user, function(err, session, user) { self.sessionHandler(err, session, user); });
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

        var self = this;
        App.service.authenticate(user, function(err, session, user) { self.sessionHandler(err, session, user); });
    },

    resetSession: function(err) {
        if (App.get('session')) {
            App.get('session').close();
        }

        App.set('flash', err);
        App.set('session', null);
        App.set('user', null);

        this.transitionToRoute('login');
    },

    sessionHandler: function(err, session, user) {
        if (err || !session || !user) return this.resetSession(err);

        App.set('flash', null);


        // save away the session for use in the ember application.
        App.set('session', session);
        App.set('user', App.Principal.create(user));

        var self = this;
        session.onAuthFailure(function() { self.resetSession(); });

        this.transitionToRoute('principals');
    }

});
