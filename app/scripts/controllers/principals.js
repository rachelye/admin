App.PrincipalsController = Ember.ArrayController.extend({
	delete: function(principal) {
		principal.remove(App.session, function(err) {
            window.location.reload();
        });
	}
});