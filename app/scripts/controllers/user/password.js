App.UserPasswordController = Ember.Controller.extend({
    actions: {
        changePassword: function() {
            var currentPassword = this.get('currentPassword');
            var newPassword = this.get('newPassword');
            var repeatNewPassword = this.get('repeatNewPassword');

            if (!currentPassword || currentPassword.length === 0) {
                App.set('flash', "Please enter your current password.");
            } else if (!currentPassword || newPassword.length === 0) {
                App.set('flash', "Please enter a new password.");
            } else if (!repeatNewPassword || newPassword !== repeatNewPassword) {
                App.set('flash', "The new passwords you entered do not match.");
            } else {
                App.user.changePassword(App.session, currentPassword, newPassword, function(err, session, user) {
                    if (err) return App.set('flash', err.message || "Failed to change password, please try again.");

                    App.sessionHandler(err, session, user);
                });
            }
        }
    }
});
