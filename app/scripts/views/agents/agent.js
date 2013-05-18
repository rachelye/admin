App.AgentView = Em.View.extend({
    templateName: 'agents/agent',

    editing: false,

    notEditing: function() {
        return !this.get('editing');
    }.property('editing'),

    edit: function() {
        this.set('editing', true);
    },

    save: function(agent) {
        this.set('editing', false);
        this.set('agent', agent.save());
    }
});
