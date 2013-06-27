App.findWithAdapter = function(query, options, nitrogenClass, emberModel) {
    var promise = $.Deferred();
    nitrogenClass.find(App.session, query, options, function(err, nitrogenModels) {
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

App.sendWithDeferred = function(nitrogenModel) {
    var promise = $.Deferred();
    nitrogenModel.send(App.session, function (err, nitrogenModel) {
        if (err) return promise.reject(err);

        promise.resolve(nitrogenModel);
    });

    return promise;
};

