App.MessagesController = Ember.ArrayController.extend({
	sorted: function() {
        if (!this.get('content')) return Em.A([]);

        var array = this.get('content').toArray();

        console.log('array: ' + array.length);
        array.sort(function(a,b) {
            return b.get('timestamp') - a.get('timestamp');
        });

        console.log(JSON.stringify(this.get('content')));
        return array;
    }.property('content.@each', 'content.length')
});