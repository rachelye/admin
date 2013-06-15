App.Agent = Ember.Object.extend(nitrogen.Agent.prototype);
App.Agent.reopen({
    enabledString: function() {
        return this.get('enabled') ? "true" : "false";
    }.property('enabled'),

    save: function() {
        return App.saveWithDeferred(new nitrogen.Agent(this));
    }
});

App.Agent.reopenClass({
    find: function(query, options) {
        return App.findWithAdapter(query, options, nitrogen.Agent, App.Agent);
    }
});
