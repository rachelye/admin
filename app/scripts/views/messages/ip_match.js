App.IpMatchView = Em.View.extend({
    templateName: 'messages/ip_match',

    sendResponse: function(responseType, match) {
        var response = new nitrogen.Message({
            from: App.get('user.id'),
            to: 'system',
            message_type: responseType,
            response_to: match.id,
            body: {
                principal: match.from,
                key: match.body.key
            }
        });

        response.save(App.session);
    },

    claim: function(match) {
        this.sendResponse('claim', match);
    },

    reject: function(match) {
        this.sendResponse('reject', match);
    }
});