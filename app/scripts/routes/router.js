App.Router.map(function() {
    this.resource('agents');
    this.resource('messages', { path: '/messages/skip/:skip/sort/:sort/direction/:direction' });
    this.resource('principals');
    this.resource('principal', { path: 'principal/:id' });
    this.resource('login');
});

App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      this.transitionTo('principals');
    }
});