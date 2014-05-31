App.PrincipalView = Em.View.extend({
    viewing: true,

    actions: {
	    edit: function() {
	        this.set('viewing', false);
	    },

	    save: function(principal) {
	        this.set('viewing', true);
	        principal.saveModel();
	    }
	}
});