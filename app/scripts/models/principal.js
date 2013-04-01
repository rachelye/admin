App.Principal = DS.Model.extend({
    principal_type: DS.attr('string'),

    last_ip: DS.attr('string'),
    last_connection: DS.attr('date'),

    // for user principal type
    email: DS.attr('string')
});
