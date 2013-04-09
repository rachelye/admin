App.findWithAdapter = function(query, magentaModel, emberModel) {

    var promise = $.Deferred();
    magentaModel.find(App.session, query, function(err, magentaModels) {
        if (err) return promise.reject(err);

        var emberModels = magentaModels.map(function(modelObject) {
            return emberModel.create(modelObject);
        });

        promise.resolve(emberModels);
    });

    return promise;
};