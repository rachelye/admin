App.PrincipalController = Ember.Controller.extend({

    maxTailMessages: 25,

    sendCommand: function(cmd) {
        var command = new nitrogen.Message({
            expires: 'never',
            to: this.get('content.id'),
            type: 'cameraCommand',
            body: {
                command: cmd
            }
        });

        command.send(App.session, function(err, messages) {
            if (err) console.log('sending command failed: ' + err);
        });
    },

    sendSnapshot: function() { this.sendCommand('snapshot'); },
    sendMotion: function() { this.sendCommand('motion'); },

    tailMessages: function() {
        var messages = this.get('messages');

        if (typeof this.get('messages') != 'object')
            return messages;
        else
            return messages.slice(0, this.get('maxTailMessages'));
    }.property('messages')
});
