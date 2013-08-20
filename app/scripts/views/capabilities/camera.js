App.CameraCapabilityView = Em.View.extend({
    templateName: 'capabilities/camera',

    invalidation: null,

    init: function() {
        var self = this;
        App.session.onMessage(function(nitrogenMessage) {
            if (!self.cameraManager) return;
            console.log("cameraManager: processing realtime message: " + JSON.stringify(message));

            var message = App.Message.create(nitrogenMessage);
            self.cameraManager.process(message);

            self.set('invalidation', new Date());
        });
    },

    commands: function() {

        var ret = Em.A();
        if (!this.cameraManager) return Em.A([]);

        this.cameraManager.messageQueue.forEach(function(message) {
            ret.pushObject(message);
        });

        console.log('commands: ' + ret.length);

        return ret;
    }.property('invalidation'),

    onMessages: function() {
        this.cameraManager = new nitrogen.CameraManager();
        var self = this;

        this.cameraManager.start(App.session, this.get('controller.messages'), function() {
            self.set('invalidation', new Date());
        });

    }.observes('controller.messages')
});
