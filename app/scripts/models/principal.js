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
        if (!App.Principal.cache)
            App.Principal.cache = {};

        if (!App.Principal.cache[id]) {
            return App.findByIdWithAdapter(id, nitrogen.Principal, App.Principal).then(function(principal) {
                App.Principal.cache[id] = principal;
            });
        } else {
            return App.Principal.cache[id];
        }
    }
    /*
    ,

    invalidated: true,

    principals: function() {
        App.Principal.set('invalidated', false);
        return App.Principal.find({}, {});
    }.property('invalidated'),

    hashedPrincipals: function() {
        var hash = {};
        App.Principal.get('principals').forEach(function(principal) {
            hash[principal.id] = principal;
        });

        return hash;
    }.property('principals'),

    nameForPrincipal: function(id) {
        var hashedPrincipals = App.Principal.get('hashedPrincipals')
        if (hashedPrincipals && hashedPrincipals[id] && hashedPrincipals[id].get('name')) {
            return hashedPrincipals[id].get('name');
        } else {
            return id;
        }
    } */

});