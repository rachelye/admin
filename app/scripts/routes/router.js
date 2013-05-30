App.Router.map(function() {
    this.resource('agents');
    this.resource('messages');
    this.resource('principals', { path: '/principals/:type' });
    this.resource('user', function() {
        this.route('create');
        this.route('login');
    });
});
