App.Permission = Ember.Object.extend(nitrogen.Permission.prototype);
App.Permission.reopen({
    issuedToPrincipal: function() {
        if (!this.get('issued_to')) return;
        var self = this;

        App.Principal.findById(this.get('issued_to')).then(function(value) {
             self.set('issuedToPrincipal', value);
        });
    }.property('issued_to'),

    issuedToName: function() {
        return this.get('issuedToPrincipal.name');
    }.property('issued_to', 'issuedToPrincipal'),

    principalForPrincipal: function() {
        if (!this.get('principal_for')) return;
        var self = this;

        App.Principal.findById(this.get('principal_for')).then(function(value) {
             self.set('principalForPrincipal', value);
        });
    }.property('principal_for'),

    principalForName: function() {
        return this.get('principalForPrincipal.name');
    }.property('principal_for', 'principalForPrincipal'),

    actionString: function() {
        if (!this.get('action')) {
            return 'all';
        } else {
            return this.get('action');
        }
    }.property('action'),

    expiresString: function() {
        if (!this.get('expires')) {
            return 'never';
        } else {
            return this.get('expires')
        }
    }.property('expires')
});

App.Permission.reopenClass({
    find: function(query, options) {
        return App.findWithAdapter(query, options, nitrogen.Permission, App.Permission);
    }
});
