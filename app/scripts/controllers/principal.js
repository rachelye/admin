App.PrincipalController = Ember.Controller.extend({
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
    }
});