App.CameraCapabilityView = Em.View.extend({
    templateName: 'capabilities/camera',

    invalidation: null,

    init: function() {
        this.cameraManager = new nitrogen.CameraManager();
        var self = this;

        var principalId = this.get('principal').id;

        this.cameraManager.start(App.session, { $or: [ { to: principalId }, { from: principalId } ] }, function() {
            console.log('********************* invalidation camera command display.');
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
    }.property('invalidation')
});
