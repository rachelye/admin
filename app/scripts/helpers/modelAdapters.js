App.findWithAdapter = function(query, nitrogenClass, emberModel) {
    var promise = $.Deferred();
    nitrogenClass.find(App.session, query, function(err, nitrogenModels) {
        if (err) return promise.reject(err);

        var emberModels = nitrogenModels.map(function(nitrogenModel) {
            return emberModel.create(nitrogenModel);
        });

        promise.resolve(emberModels);
    });

    return promise;
};

App.findByIdWithAdapter = function(id, nitrogenClass, emberModel) {
    var promise = $.Deferred();
    nitrogenClass.findById(App.session, id, function(err, nitrogenModel) {
        if (err) return promise.reject(err);

        promise.resolve(emberModel.create(nitrogenModel));
    });

    return promise;
};

App.saveWithDeferred = function(nitrogenModel) {
    var promise = $.Deferred();
    nitrogenModel.save(App.session, function (err, nitrogenModel) {
        if (err) return promise.reject(err);

        promise.resolve(nitrogenModel);
    });

    return promise;
};