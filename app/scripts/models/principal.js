App.Principal = Ember.Object.extend({
});

App.Principal.reopenClass({
    find: function(query) {
        return App.findWithAdapter(query, magenta.Principal, App.Principal);
    }
});
