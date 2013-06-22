App.PrincipalRowView = Em.View.extend({
    templateName: 'principals/principalRow',

    lastConnectionClass: function() {
    	var msSinceLastConnection = new Date().getTime() - Date.parse(this.get('principal.last_connection'));
    	return msSinceLastConnection > 30 * 60 * 1000 ? "text-error" : "";
    }.property('principal.last_connection')
 });
