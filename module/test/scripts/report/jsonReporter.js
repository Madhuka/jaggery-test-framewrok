jasmine.JSONReporter = function () {

    var startingTime = (new Date()).getTime(),
        log = new Log('jsonReporter');
    this.exports = {
        elapsedTime: null,
        specsCount: 0,
        specsPassed: 0,
        specsFailed: 0,
        suites: []
    },

    /*
     * reportRunnerResults will called finally for to get results
     */
    this.reportRunnerResults = function () {
        this.exports.elapsedTime = parseInt((new Date()).getTime() - startingTime, 10) + "ms";
        var outJson = JSON.stringify(this.exports);
        log.debug(outJson);
        print(outJson);
        if (this.exports.specsCount - this.exports.specsPassed !== 0) {
            this.loged('Exiting with errors');
        } else {
            this.loged('Exiting with ' + this.exports.specsCount + ' passed specs ');
        }

    },

    /**
     * function is result building for each spec
     * @param spec is testSpec
     */
    this.reportSpecResults = function (spec) {

        this.exports.specsCount += 1;

        if (spec.results().passed()) {
            this.exports.specsPassed++;
        } else {
            this.exports.specsFailed++;
        }

        var l = spec.results().items_.length;
        var items = new Array();
        for (var i = 0; i < l; i++) {
            log.debug(spec.results().items_[i]);
            items[i] = {
                type: spec.results().items_[i].type,
                message: spec.results().items_[i].message
            };
        }
        // log.info(spec.results());
        // log.info(spec.suite.toSource());
        this.exports.suites.push({
            suite: spec.suite.description,
            spec: spec.description,
            passed: spec.results().passed(),
            itemCount: spec.results().totalCount,
            passedCount: spec.results().passedCount,
            failedCount: spec.results().failedCount,
            skipped: spec.results().skipped,
            items: items

        });
    };

    /**
     * Will be used to logged in finally
     * @param arguments String message to passing for log
     */
    this.loged = function (arguments) {
        log.info(arguments);
    };
};