App.PrincipalView = Em.View.extend({
    viewing: true,

    edit: function() {
        this.set('viewing', false);
    },

    save: function(principal) {
        this.set('viewing', true);
        this.set('principal', principal.save());
    }
});