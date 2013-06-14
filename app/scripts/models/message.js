App.Message = Ember.Object.extend({
    is: function(type) {
        return this.get('type') === type;
    },

    isCameraCommand: function() { return this.is('cameraCommand'); }.property('type'),
    isImage: function() { return this.is('image'); }.property('type'),
    isLog: function() { return this.is('log'); }.property('type'),
    isIP: function() { return this.is('ip'); }.property('type'),
    isIPMatch: function() { return this.is('ip_match'); }.property('type'),
    isNotHeartbeat: function() { return !this.is('heartbeat'); }.property('type'),

    createdAtString: function() {
        var date = new Date(Date.parse(this.get('created_at')));
        return date.toLocaleString();
    }.property('created_at'),

    timestampString: function() {
        var date = new Date(Date.parse(this.get('ts')));
        return date.toLocaleString();
    }.property('ts'),

    // TODO: build message specific views that encapsulate this.
    bodyUrlWithAccessToken: function() {
        if (!this.get('body') || !this.get('body.url')) return null;

        return this.get('body.url') + "?access_token=" + encodeURIComponent(App.get('session.accessToken.token'));
    }.property('body.url'),

    save: function() {
        return App.saveWithDeferred(new nitrogen.Message(this));
    }
});

App.Message.reopenClass({
    find: function(query, options) {
        return App.findWithAdapter(query, options, nitrogen.Message, App.Message);
    }
});