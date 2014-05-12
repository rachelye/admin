App.Router.map(function() {
    this.resource('agents');
    this.resource('messages', { path: '/messages/skip/:skip/sort/:sort/direction/:direction' });
    this.resource('principals', { path: 'principals/:type' });

    this.resource('principal', { path: 'principal/:id' }, function() {
        this.route('commands');
        this.route('logs'/*, { path: 'logs/skip/:skip/sort/:sort/direction/:direction'}*/);
        this.route('messages'/*, { path: 'messages/skip/:skip/sort/:sort/direction/:direction'}*/);
        this.route('permissions');
    });
});

App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('principals', 'all');
    }
});