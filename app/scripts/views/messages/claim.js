App.ClaimView = Em.View.extend({
    templateName: 'messages/claim',

    claim: function() {
        var response = new nitrogen.Message({
            to: 'system',
            type: 'claim',
            body: {
                claim_code: this.get('claimCode')
            },
            expires: 'never'
        });

        response.send(App.session, function(err, messages) {
            if (err) console.log(err);
        });
    }
});