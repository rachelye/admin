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
//    host: 'api.nitrogen.io',
//    http_port: 443,
//    protocol: 'https'
};

App.config.store = new nitrogen.HTML5Store(App.config);
App.service = new nitrogen.Service(App.config);
