App.modelCache = {};

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

App.findByIdWithAdapter = function(id, nitrogenClass, emberModel, cacheLifetimeSeconds) {
    var promise = $.Deferred();

    if (!cacheLifetimeSeconds)
        cacheLifetimeSeconds = 60;

    var model;

    if (App.modelCache[id]) {
        var entry = App.modelCache[id];
        if (entry.expiration > Date.now()) {
            model = entry.model;
            setTimeout(function() {
                promise.resolve(model);
            }, 0);
        }
    }

    if (!model) {
        nitrogenClass.findById(App.session, id, function(err, nitrogenModel) {
            if (err) return promise.reject(err);

            var model = emberModel.create(nitrogenModel);

            App.modelCache[id] = {
                expiration: Date.now() + cacheLifetimeSeconds * 1000,
                model: model
            };

            promise.resolve(model);
        });
    }

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

