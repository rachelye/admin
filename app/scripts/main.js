var config = {
    host: "localhost",
    http_port: 3030,
    protocol: "http"
};

config.store = new magenta.HTML5Store(config);
config.base_url = config.protocol + "://" + config.host + ":" + config.http_port + "/api/v1";
config.headwaiter_endpoint = config.base_url + "/headwaiter";

App = Ember.Application.create({
    rootElement: window.TESTING ? '#mocha' : '#app',
    LOG_TRANSITIONS: true
});

App.service = new magenta.Service(config);

// define function that we can use to jumpstart a user session.

var authFailureHandler = function() {
    if (App.session) {
        App.session.close();
        App.session = null;
    }

    window.location = "/#/user/login";
    console.log("redirecting to login");
};

App.startSession = function(user) {
    App.service.connect(user, function(err, session, user) {
        if (err) return authFailureHandler();

        // save away the session for use in the ember application.
        App.session = session;
        App.user = user;

        session.onAuthFailure(authFailureHandler);

        session.onMessage(function(message) {
            console.log("message received: " + JSON.stringify(message));
            App.store.load(App.Message, message);
        });

    });
};

// attempt to start session from the cached credentials in local storage.
// if the user doesn't exist or the credentials are invalid -> direct to login.

App.user = new magenta.User({ local_id: "current" });
App.startSession(App.user);