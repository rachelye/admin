App.PrincipalController = Ember.Controller.extend({

    maxTailMessages: 25,

    sendSnapshot: function() {
        var snapshot = new nitrogen.Message({
            to: this.get('content.id'),
            type: 'cameraCommand',
            body: {
                command: 'snapshot'
            }
        });

        snapshot.save(App.session, function(err, messages) {
            if (err) console.log('snapshot command failed: ' + err);
        });
    },

    tailMessages: function() {
        var messages = this.get('messages');

        if (typeof this.get('messages') != 'object')
            return messages;
        else
            return messages.reverse().slice(0, this.get('maxTailMessages'));
    }.property('messages')
});