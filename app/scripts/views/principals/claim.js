App.ClaimView = Em.View.extend({
    templateName: 'principals/claim',

    actions: {
        claim: function() {
            var response = new nitrogen.Message({
                to: 'service',
                type: 'claim',
                body: {
                    claim_code: this.get('claimCode').toUpperCase()
                },
                expires: 'never'
            });

            response.send(App.session, function(err) {
                if (err) App.set('flash', err.message);

                window.location.reload();
            });
        }
    }

});