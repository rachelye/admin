App.Router.map(function() {
    this.resource('agents');
    this.resource('messages');
    this.resource('principals', function() {
        this.route('principal', { path: '/:id'} )
    });
    this.resource('user', function() {
        this.route('create');
        this.route('login');
    });
});