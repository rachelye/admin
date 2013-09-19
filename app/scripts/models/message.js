App.Message = Ember.Object.extend(nitrogen.Message.prototype);

App.Message.reopen({

    bodyJSON: function() {
        return JSON.stringify(this.get('body'));
    }.property('body'),

    bodyUrlWithAccessToken: function() {
        if (!this.get('body') || !this.get('body.url')) return null;

        return this.get('body.url') + "?access_token=" + encodeURIComponent(App.get('session.accessToken.token'));
    }.property('body.url'),

    createdAtString: function() {
        var date = new Date(Date.parse(this.get('created_at')));
        return date.toLocaleString();
    }.property('created_at'),

    fromPrincipal: function() {
        if (!this.get('from')) return;
        var self = this;

        App.Principal.findById(this.get('from')).then(function(value) {
             self.set('fromPrincipal', value);
        });
    }.property('from'),

    fromName: function() {
        return this.get('fromPrincipal.name');
    }.property('from', 'fromPrincipal'),

    toPrincipal: function() {
        if (!this.get('to')) return;

        var self = this;

        App.Principal.findById(this.get('to')).then(function(value) {
            self.set('toPrincipal', value);
        });
    }.property('to'),

    toName: function() {
        return this.get('toPrincipal.name');
    }.property('to', 'toPrincipal'),

    isCameraCommand: function() { return this.is('cameraCommand'); }.property('type'),
    isHeartbeat: function() { return this.is('heartbeat'); }.property('type'),
    isImage: function() { return this.is('image'); }.property('type'),
    isLog: function() { return this.is('log'); }.property('type'),
    isIP: function() { return this.is('ip'); }.property('type'),
    isIPMatch: function() { return this.is('ip_match'); }.property('type'),
    isNotHeartbeat: function() { return !this.is('heartbeat'); }.property('type'),

    send: function() {
        return App.sendWithDeferred(new nitrogen.Message(this));
    },

    timestampString: function() {
        var date = new Date(Date.parse(this.get('ts')));
        return date.toLocaleString();
    }.property('ts')
});

App.Message.reopenClass({
    find: function(query, options) {
        return App.findWithAdapter(query, options, nitrogen.Message, App.Message);
    }
});
