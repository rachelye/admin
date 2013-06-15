App.MessagesRoute = Ember.Route.extend({

    messagePageLimit: 50,

    model: function(params) {
        console.log('skip: ' + params.skip);
        console.log('direction: ' + params.direction);
        console.log('sort: ' + params.sort);

        this.set('params', params);

        return this.query();
    },

    query: function() {
        var sort = {};
        sort[this.get('params').sort] = parseInt(this.get('params').direction);

        return App.Message.find({}, {
            skip: parseInt(this.get('params').skip),
            limit: parseInt(this.get('messagePageLimit')),
            sort: sort
        });
    },

    serialize: function(params) {
        return {
            skip: params.skip,
            sort: params.sort,
            direction: params.direction
        }
    },

    setupController: function(controller, model) {
        var self = this;
        this._super(controller, model);

        this.controller.set('router', this);

        Ember.Instrumentation.subscribe('onMessage', {
            before: function(name, timestamp, message) {
                self.query().then(function(response) {
                    self.controller.set('content', response);
                });
            },
            after: function() {}
        });
    }

});
