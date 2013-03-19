App.MessagesController = Ember.ArrayController.extend({
	sorted: function() {
        console.log("messages controller");

        var array = this.get('content').toArray();

        console.log('array: ' + array.length);
        array.sort(function(a,b) {
            return b.get('timestamp') - a.get('timestamp');
        });

        return array;
    }.property('content.@each', 'content.length')
});