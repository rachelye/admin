/*global Ember */

var App = window.App = Ember.Application.create({
    rootElement: window.TESTING ? '#mocha' : '#app',
    LOG_TRANSITIONS: true
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/controllers/user/*');
require('scripts/helpers/*');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/agents/*');
require('scripts/views/capabilities/*');
require('scripts/views/messages/*');
require('scripts/views/principals/*');

App.config = {
//    Nitrogen uses the following by default to connect to the service.   Modify these as necessary to point elsewhere.
// 
//    host: 'localhost',
//    http_port: 3030,
//    protocol: 'http'
};

request.log = {
    debug: function() {},
    info: function() {},
    error: function() {}
};

App.config.store = new nitrogen.HTML5Store(App.config);
App.service = new nitrogen.Service(App.config);

App.deferReadiness();

App.resetSession = function(err) {
    if (App.get('session')) {
        App.get('session').stop();
    }

    var flash = null;
    if (err && err.message)
        flash = err.message;

    App.set('flash', flash);
    App.set('session', null);
    App.set('user', null);

    App.set('attemptedNavigation', window.location.hash);
    window.location = "/#/user/login";
};

App.sessionHandler = function(err, session, user) {
    App.advanceReadiness();

    if (err || !session || !user) return App.resetSession(err);

    App.set('flash', null);

    // save away the session for use in the ember application.
    App.set('session', session);
    App.set('user', App.Principal.create(user));

    if (App.get('attemptedNavigation') && App.get('attemptedNavigation') !== '#/user/login') {
        console.log('successful auth, reloading attempedNavigation url: ' + App.get('attemptedNavigation'));
        window.location = App.get('attemptedNavigation');
        App.set('attemptedNavigation', null);

    } else {
        console.log('successful auth, using default url');
        window.location = "/#/principals";
    }

    session.onAuthFailure(App.resetSession);
};

App.set('attemptedNavigation', window.location.hash);

App.config.store.get('principal.current', function(err, userJSON) {
    var user;

    if (!userJSON) {
        user = new nitrogen.User({ nickname: 'current' });
    } else {
        userJson.nickname = 'current';
        user = new nitrogen.User(userJSON);
    }

    App.service.authenticate(user, App.sessionHandler);
});