App.ApikeysRoute = App.AuthenticatedRoute.extend({
    model: function() {
        return App.ApiKey.find();
    },

    actions: {
        redirectToRaspbianImage: function(apikey) {
            window.location = App.get('session.service.config.endpoints.images') + apikey.raspbian_image_id;
        }        
    }

});
