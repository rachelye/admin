App.MessagePagingRoute = App.AuthenticatedRoute.extend({
    buildPageUrl: function(params) {
        return this.get('baseUrl') + "/skip/" + params.skip + "/sort/" + params.sort + "/direction/" + params.direction;
    },

    changePage: function(dir) {
        return {
            skip: parseInt(this.get('params.skip')) + dir * parseInt(this.get('messagePageLimit')),
            direction: this.get('params.direction'),
            sort: this.get('params.sort')
        };
    },

    fullPage: function() {
        return this.get('controller.content.length') >= this.get('messagePageLimit');
    }.property('controller.content.length', 'messagesPerPage'),

    hasPreviousPage: function() {
        return parseInt(this.get('params.skip')) !== 0;
    }.property('params.skip'),

    nextPage: function() {
        return this.changePage(1);
    }.property('params.skip', 'params.direction', 'params.sort'),

    nextPageUrl: function() {
        return this.buildPageUrl(this.get('nextPage'));
    }.property('nextPage'),

    previousPage: function() {
        return this.changePage(-1);
    }.property('params.skip', 'params.direction', 'params.sort'),

    previousPageUrl: function() {
        return this.buildPageUrl(this.get('previousPage'));
    }.property('previousPage')
});