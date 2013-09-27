App.Principal = Ember.Object.extend(nitrogen.Principal.prototype);
App.Principal.reopen({
    hasCapability: function(capability) {
        return this.get('capabilities').indexOf(capability) !== -1;
    },

    hasCamera: function() {
        return this.hasCapability('cameraCommand');
    }.property('capabilities'),

    hasSwitch: function() {
        return this.hasCapability('switchCommand');
    }.property('capabilities'),

    isDevice: function() {
        return this.is('device');
    }.property('type'),

    nameOrId: function() {
        return this.get('name') || this.get('id');
    }.property('id','name'),

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
        if (!id) return;

        return App.findByIdWithAdapter(id, nitrogen.Principal, App.Principal);
    }
});
