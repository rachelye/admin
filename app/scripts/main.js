var config = {
    host: "magenta.azurewebsites.net",
    http_port: 80,
    protocol: "http"
};

config.store = new magenta.HTML5Store(config);
config.base_url = config.protocol + "://" + config.host + ":" + config.http_port + "/api/v1";
config.realtime_url = config.base_url + "/realtime";

App = Ember.Application.create({
    rootElement: window.TESTING ? '#mocha' : '#app',
    LOG_TRANSITIONS: true
});

// Ember Data
App.store = DS.Store.create({
    revision: 11,
    adapter: DS.RESTAdapter.extend({
        url: config.base_url
    })
});

// Teach Ember Data how to handle embedded objects in JSON responses.
DS.JSONTransforms.object = {
    deserialize: function(serialized) {
        return Em.isNone(serialized) ? {} : serialized;
    },
    serialize: function(deserialized) {
        return Em.isNone(deserialized) ? {} : deserialized;
    }
};

var service = new magenta.Service(config);
var user = new magenta.User();
service.connect(user, function(err, session, user) {
    if (err) {
        window.location = "/#/user/login";
        return;
    }

    session.onMessage(function(message) {
        console.log("message received: " + JSON.stringify(message));
        App.store.load(App.Message, message);
    });
});