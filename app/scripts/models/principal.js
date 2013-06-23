App.Principal = Ember.Object.extend(nitrogen.Principal.prototype);
App.Principal.reopen({
    hasCapability: function(capability) {
        return this.get('capabilities').indexOf(capability) !== -1;
    },

    hasCamera: function() {
        return this.hasCapability('camera');
    }.property('capabilities'),

    isDevice: function() {
        return this.is('device');
    }.property('type'),

    lastConnectionString: function() {
        var date = new Date(Date.parse(this.get('last_connection')));
        return date.toLocaleString();
    }.property('last_connection'),

    save: function() {
        return App.saveWithDeferred(new nitrogen.Principal(this));
    }
});

App.Principal.reopenClass({
    find: function(query, options) {
        return App.findWithAdapter(query, options, nitrogen.Principal, App.Principal);
    },
    findById: function(id) {
        return App.findByIdWithAdapter(id, nitrogen.Principal, App.Principal);
    }
});