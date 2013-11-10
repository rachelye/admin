App.PrincipalMessagesRoute = App.AuthenticatedRoute.extend({
    messagePageLimit: 50,

    activate: function() {
        console.log('activating messages tab');
        setTimeout(function() { $('#principalMessagesTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        console.log('activating messages tab');
        setTimeout(function() { $('#principalMessagesTab').removeClass('active'); }, 0);
    },

    model: function(params) {
        var principal = this.modelFor("principal");

        console.log('skip: ' + params.skip);
        console.log('direction: ' + params.direction);
        console.log('sort: ' + params.sort);

        this.set('params', params);

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
            skip: parseInt(this.get('params').skip),
            limit: parseInt(this.get('messagePageLimit')),
            sort: sort
        });
    }
});