App.LocationCapabilityView = Em.View.extend({
    templateName: 'capabilities/location',

    actions: {
        sendLocation: function() { this.sendLocation(); },
    },

    commands: function() {
        return Em.A();
    }.property('invalidation'),

    invalidation: null,

    sendLocation: function(cmd) {
        var principalId = this.get('principal.id');

        navigator.geolocation.getCurrentPosition(function(position) {
            var location = new nitrogen.Message({
                from: principalId,
                type: 'location',
                body: {
                    accuracy: position.coords.accuracy,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            });

            if (position.coords.altitude) location.altitude = position.coords.altitude;
            if (position.coords.altitudeAccuracy) location.altitudeAccuracy = position.coords.altitudeAccuracy;

            location.send(App.session);
        });
    }
});
