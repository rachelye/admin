App.PrincipalController = Ember.Controller.extend({

    maxTailMessages: 25,

    sendCommand: function(cmd) {
        var snapshot = new nitrogen.Message({
            to: this.get('content.id'),
            type: 'cameraCommand',
            body: {
                command: cmd
            }
        });

        snapshot.send(App.session, function(err, messages) {
            if (err) console.log('snapshot command failed: ' + err);
        });
    },

    sendSnapshot: function() { this.sendCommand('snapshot'); },
    sendMotion: function() { this.sendCommand('motion'); },

    tailMessages: function() {
        var messages = this.get('messages');

        if (typeof this.get('messages') != 'object')
            return messages;
        else
            return messages.reverse().slice(0, this.get('maxTailMessages'));
    }.property('messages')
});
