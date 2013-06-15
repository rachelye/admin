App.MessagesController = Ember.ArrayController.extend({
    hasPreviousPage: function() {
        return parseInt(this.get('router.params.skip')) !== 0;
    }.property('router.params.skip'),

    fullPage: function() {
        return this.get('content.length') >= this.get('router.messagePageLimit');
    }.property('content.length', 'messagesPerPage'),

    claim: function() {
        var principalId = $('principalId').val();

        console.log("claiming device: " + principalId);

        var claim = new nitrogen.Message({
            to: 'system',
            type: 'claim',
            body: {
                principal: principalId
            },
            expires: 'never'
        });

        response.save(App.session, function(err, messages) {
            if (err) console.log(err);
        });
    },

    changePage: function(dir) {
        return {
            skip: parseInt(this.get('router.params.skip')) + dir * parseInt(this.get('router.messagePageLimit')),
            direction: this.get('router.params.direction'),
            sort: this.get('router.params.sort')
        };
    },

    nextPage: function() {
        return this.changePage(1);
    }.property('router.params.skip', 'router.params.direction', 'router.params.sort'),

    previousPage: function() {
        return this.changePage(-1);
    }.property('router.params.skip', 'router.params.direction', 'router.params.sort')
});