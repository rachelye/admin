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
    findAll: function() {
        var query = $.Deferred();
        magenta.Message.findAll(App.session, function(err, messages) {
            if (err) return query.reject(err);

            var emberMessages = messages.map(function(message) {
               return new App.Message(message);
            });

            query.resolve(emberMessages);
        });

        return query;
    },

    find: function(id) {
        var query = $.Deferred();
        magenta.Message.find(App.session, id, function(err, messages) {
            if (err) return query.reject(err);

            var emberMessage = new App.Message(message);
            query.resolve(emberMessages);
        });

        return query;
    }
});

//  from: DS.attr('string'),
//  timestamp: DS.attr('date'),
//  message_type: DS.attr('string'),
//  body: DS.attr('object'),