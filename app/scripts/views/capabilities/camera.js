App.CameraCapabilityView = Em.View.extend({
    templateName: 'capabilities/camera',

    actions: {
        sendSnapshot: function() { this.sendCommand('snapshot'); },
        sendMotion: function() { this.sendCommand('motion'); }
    },

    commands: function() {

        var ret = Em.A();
        if (!this.cameraManager) return Em.A([]);

        this.cameraManager.messageQueue.forEach(function(message) {
            ret.pushObject(message);
        });

        return ret;
    }.property('invalidation'),

    invalidation: null,

    init: function() {
        this.cameraManager = new nitrogen.CameraManager();
        var self = this;

        this.cameraManager.start(App.session, this.get('principal.id'), function(err, message) {
            console.log("got another message, invalidating.");
            self.set('invalidation', new Date());
        });
    },

    sendCommand: function(cmd) {
        console.log('sending command');
        var command = new nitrogen.Message({
            expires: 'never',
            to: this.get('principal.id'),
            type: 'cameraCommand',
            body: {
                command: cmd
            }
        });

        command.send(App.session, function(err, messages) {
            if (err) console.log('sending command failed: ' + err);
        });
    }
});
