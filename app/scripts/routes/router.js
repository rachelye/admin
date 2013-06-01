App.Router.map(function() {
    this.resource('agents');
    this.resource('messages');
    this.resource('principals');
    this.resource('principal', { path: 'principal/:principal_id' });
    this.resource('user', function() {
        this.route('create');
        this.route('login');
    });
});