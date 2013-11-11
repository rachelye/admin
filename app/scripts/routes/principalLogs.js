App.PrincipalLogsRoute = App.MessagePagingRoute.extend({
    messagePageLimit: 50,

    baseUrl: function() {
        var base = "/#/principal/" + this.modelFor('principal').id  + "/logs";
        console.log(base);
        return base;
    }.property(),

    activate: function() {
        setTimeout(function() { $('#principalLogsTab').addClass('active'); }, 0);
    },

    deactivate: function() {
        setTimeout(function() { $('#principalLogsTab').removeClass('active'); }, 0);
    },

    model: function(params) {
        console.log('in logs model');

        params = {
          sort: 'ts',
          skip: 0,
          direction: -1
        };

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
                  $or: [ 
                      { type: 'heartbeat' }, 
                      { type: 'log' } 
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
    } */
});