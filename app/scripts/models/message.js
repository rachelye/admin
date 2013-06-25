App.Message = Ember.Object.extend(nitrogen.Message.prototype);

App.Message.reopen({
    // TODO: build message specific views that encapsulate this.
    bodyUrlWithAccessToken: function() {
        if (!this.get('body') || !this.get('body.url')) return null;

        return this.get('body.url') + "?access_token=" + encodeURIComponent(App.get('session.accessToken.token'));
    }.property('body.url'),

    createdAtString: function() {
        var date = new Date(Date.parse(this.get('created_at')));
        return date.toLocaleString();
    }.property('created_at'),

    fromPrincipal: function() {
        return App.Principal.findById(this.get('from'));
    }.property('from'),

    fromName: function() {
        console.log(this.get('fromPrincipal'));
        return this.get('fromPrincipal.name') || this.get('from');
    }.property('from', 'fromPrincipal'),

    toPrincipal: function() {
        return App.Principal.findById(this.get('to'));
    }.property('to'),

    toName: function() {
        console.log(this.get('toPrincipal'));
        return this.get('toPrincipal.name') || this.get('to');
    }.property('to', 'toPrincipal'),

    isCameraCommand: function() { return this.is('cameraCommand'); }.property('type'),
    isImage: function() { return this.is('image'); }.property('type'),
    isLog: function() { return this.is('log'); }.property('type'),
    isIP: function() { return this.is('ip'); }.property('type'),
    isIPMatch: function() { return this.is('ip_match'); }.property('type'),
    isNotHeartbeat: function() { return !this.is('heartbeat'); }.property('type'),

    save: function() {
        return App.saveWithDeferred(new nitrogen.Message(this));
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