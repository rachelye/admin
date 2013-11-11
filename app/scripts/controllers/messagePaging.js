App.MessagePagingController = Ember.ArrayController.extend({
    buildPageUrl: function(params) {
        return this.get('router.baseUrl') + "/skip/" + params.skip + "/sort/" + params.sort + "/direction/" + params.direction;
    },

    changePage: function(dir) {
        return {
            skip: parseInt(this.get('router.params.skip')) + dir * parseInt(this.get('router.messagePageLimit')),
            direction: this.get('router.params.direction'),
            sort: this.get('router.params.sort')
        };
    },

    fullPage: function() {
        return this.get('content.length') >= this.get('router.messagePageLimit');
    }.property('content.length', 'messagesPerPage'),

    hasPreviousPage: function() {
        return parseInt(this.get('router.params.skip')) !== 0;
    }.property('router.params.skip'),

    nextPage: function() {
        return this.changePage(1);
    }.property('router.params.skip', 'router.params.direction', 'router.params.sort'),

    nextPageUrl: function() {
        return this.buildPageUrl(this.get('nextPage'));
    }.property('nextPage'),

    previousPage: function() {
        return this.changePage(-1);
    }.property('router.params.skip', 'router.params.direction', 'router.params.sort'),

    previousPageUrl: function() {
        return this.buildPageUrl(this.get('previousPage'));
    }.property('previousPage')
});