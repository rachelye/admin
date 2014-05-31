App.ApikeysRoute = App.AuthenticatedRoute.extend({
    model: function() {
        return App.ApiKey.find();
    },

    actions: {
        redirectToRaspbianImage: function(apikey) {
            var imageUrl = App.get('session.service.config.endpoints.images') + '/raspbian-' + apikey.key + ".gz";
            window.location = imageUrl;
        }        
    }

});
