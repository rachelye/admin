App.MessagesRoute = Ember.Route.extend({

  model: function() {
    console.log("in messages route");
    return App.Message.find();
  }

});
