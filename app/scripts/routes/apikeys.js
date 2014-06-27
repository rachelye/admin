App.ApikeysRoute = App.AuthenticatedRoute.extend({
    model: function() {
        return this.query();
    },

    query: function() {
        return App.ApiKey.find();
    },

    actions: {
        createNew: function() {
            var self = this;
            var newName = $("#newName").val();
            var newRedirectUri = $("#newRedirectUri").val();

            if (!newName) return App.set('flash', 'A name is required for your new API key.');
            if (!newRedirectUri) return App.set('flash', 'A redirect_uri is required for your new API key.');

            var apiKey = new nitrogen.ApiKey({
                name: newName,
                type: 'app',
                redirect_uri: newRedirectUri
            });

            apiKey.create(App.session, function(err) {
                if (err) return App.set('flash', err.message);

                self.query().then(function(apiKeys) {
                    self.controller.set('content', apiKeys);
                });
            });
        },

        redirectToRaspbianImage: function(apikey) {
            var imageUrl = App.get('session.service.config.endpoints.images') + '/raspbian-' + apikey.key + ".img.gz";
            window.location = imageUrl;
        }        
    }
});
