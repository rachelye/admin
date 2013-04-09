App.Message = Ember.Object.extend({
    is: function(message_type) {
        return this.get('message_type') == message_type;
    },

    isImage: function() {
        return this.is('image');
    }.property('message_type'),

    isLog: function() {
        return this.is('log');
    }.property('message_type')
});

App.Message.reopenClass({
    find: function(query) {
        return App.findWithAdapter(query, magenta.Message, App.Message);
    }
});

//  from: DS.attr('string'),
//  timestamp: DS.attr('date'),
//  message_type: DS.attr('string'),
//  body: DS.attr('object'),