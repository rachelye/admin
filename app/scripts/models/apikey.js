App.ApiKey = Ember.Object.extend(nitrogen.ApiKey.prototype);
App.ApiKey.reopen({
    raspbianImageUrl: function() {
        return "http://www.test.com/"
    }.property('key')
});

App.ApiKey.reopenClass({
    find: function(query, options) {
        return App.findWithAdapter(query, options, nitrogen.ApiKey, App.ApiKey);
    }
});
