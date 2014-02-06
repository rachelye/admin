App.UserPasswordController = Ember.Controller.extend({
    actions: {
        changePassword: function() {
            var currentPassword = this.get('currentPassword');
            var newPassword = this.get('newPassword');
            var repeatNewPassword = this.get('repeatNewPassword');
            var email = App.get('user.email');

            if (!currentPassword || currentPassword.length === 0) {
                App.set('flash', "Please enter your current password.");
            } else if (!currentPassword || newPassword.length === 0) {
                App.set('flash', "Please enter a new password.");
            } else if (!repeatNewPassword || newPassword !== repeatNewPassword) {
                App.set('flash', "The new passwords you entered do not match.");
            } else {
                var user = App.get('user');

                user.changePassword(App.session, currentPassword, newPassword, function(err) {
                    if (err) return App.set('flash', err.message || "Failed to change password, please try again.");

                    App.set('session', null);

                    var user = new nitrogen.User({
                        email: email,
                        password: newPassword,
                        nickname: 'current' 
                    });

                    App.service.authenticate(user, App.sessionHandler);
                });
            }
        }
    }
});
