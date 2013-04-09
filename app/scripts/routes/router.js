App.Router.map(function() {
    this.resource('messages');
    this.resource('principals');
    this.resource('user', function() {
        this.route('create');
        this.route('login');
    });

});
