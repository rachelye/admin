App.PrincipalController = Ember.Controller.extend({
    maxTailMessages: 25,

    tailMessages: function() {
        var messages = this.get('messages');

        if (typeof this.get('messages') != 'object')
            return messages;
        else
            return messages.slice(0, this.get('maxTailMessages'));
    }.property('messages')
});
