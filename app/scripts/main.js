var magenta = require('magenta');

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

DS.JSONTransforms.object = {
    deserialize: function(serialized) {
        return Em.isNone(serialized) ? {} : serialized;
    },
    serialize: function(deserialized) {
        return Em.isNone(deserialized) ? {} : deserialized;
    }
};

// TODO: refactor with SDK abstraction.

var client = new Faye.Client(config.realtime_url, {
    timeout: 120
});

client.subscribe('/messages', function(message) {
    console.log("realtime message received: " + message);

    App.store.load(App.Message, JSON.parse(message));
});
