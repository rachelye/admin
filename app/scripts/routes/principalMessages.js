App.PrincipalMessagesRoute = App.MessagePagingRoute.extend({
    messagePageLimit: 50,
    baseUrl: function() {
        return "/#/principal/" + this.modelFor('principal').id  + "/messages";
    }.property(),

    activate: function() {
        setTimeout(function() { $('#principalMessagesTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#principalMessagesTab').removeClass('active'); }, 0);
    },

    model: function(params) {
        console.log('messages model called.');
        var principal = this.modelFor("principal");

        params = {
          sort: 'ts',
          skip: 0,
          direction: -1
        };

        var sort = {};
        sort[params.sort] = parseInt(params.direction);

        return App.Message.find({
            $and: [ 
              { 
                  $and: [ 
                      { type: { $ne: 'heartbeat' } }, 
                      { type: { $ne: 'log' } } 
                  ] 
              },
              { 
                  $or: [ 
                      { to: principal.id }, 
                      { from: principal.id } 
                  ] 
              }
            ] 
        }, {
            skip: parseInt(params.skip),
            limit: parseInt(this.get('messagePageLimit')),
            sort: sort
        });
    }/*,

    serialize: function() {
        var params = this.get('params');
        
        if (!params) {
            params = {                
                skip: '0',
                sort: 'ts',
                direction: '1'
            }
        }

        return params;
    },

    setupController: function(controller, principal) {
        this._super(controller, principal);

        this.controller.set('router', this);

        var self = this;
        this.subscription = App.session.onMessage({$or: [ { to: this.get('controller.content.id') }, 
                                                          { from: this.get('controller.content.id') } ]}, function(nitrogenMessage) {
            self.queryMessages(principal);
        });

    }
    */
});