jasmine.simpleHTMLReporter = function () {

    var startingTime = (new Date()).getTime(),
        log = new Log('simpleHTMLReporter');

    var exports = {
        elapsedTime: null,
        specsCount: 0,
        specsPassed: 0,
        specsFailed: 0,
        suites: []
    };

    /**
     * reportRunnerResults will called finally for to get results
     */
    var reportRunnerResults = function () {
        exports.elapsedTime = parseInt((new Date()).getTime() - startingTime, 10) + "ms";

        var json = exports;

        var data = {
            'id': 'time',
            'value': 'Elapsed Time: ' + json.elapsedTime
        };
        updateElement(data);
        if (exports.specsCount - exports.specsPassed !== 0) {
            loged('Exiting with errors');
        } else {
            loged('Exiting with ' + exports.specsCount + ' passed specs ');
        }

    };

    /**
     * function is result building for each spec
     * @param spec is testSpec
     */
    var reportSpecResults = function (spec) {

        exports.specsCount += 1;

        if (spec.results().passed()) {
            exports.specsPassed++;
        } else {
            exports.specsFailed++;
        }

        var l = spec.results().items_.length;

        for (var i = 0; i < l; i++) {
            //log.debug(spec.results().items_[i]);

            data = {
                'id': exports.specsCount - 1,
                'value': exports.specsCount + '. ' + spec.suite.description + ' (' + spec.getFullName() + ')' + ' ---> ' + spec.results().items_[i].message
            };
            updateElement(data);

            updateElement({
                id: 'pass',
                value: 'pass count ' + exports.specsPassed + ' /' + exports.specsCount + ''
            });
            updateElement({
                id: 'fails',
                value: 'fail count ' + exports.specsFailed + ' /' + exports.specsCount + ''
            });
        }




    };
    
    /**
     *     
     * jasmine API for reporting
     * will be called report initialization
     * @param jasmine runner
     */
    var reportRunnerStarting = function (runner) {
        log.debug('reportRunnerStarting..............xxxx............' + runner.env.versionString());

        var suites = runner.suites();
        log.debug('suites.length-------' + suites.length);
        for (var i = 0; i < suites.length; i++) {
            var suite = suites[i];
            log.debug(i + '. suite id - ' + suite.id + ':: description - ' + suite.description);

            if (suite.parentSuite) {
                log.debug('parentSuite ID ::' + suite.parentSuite.id);
            }
        }


        var specs = runner.specs() || [],
            specLength = specs.length;

        if (specs.length == 0) {
            return;
        }
        log.debug('specs.lengths   :: ' + specLength);
        log.debug('specs.length   :: ' + specs.toSource());
        addObject({
            name: 'h1',
            value: 'Jaggery Cola Test Frmaework'
        });
        addObject({
            name: 'p',
            value: 'There is ' + specs.length + 'Test to be run'
        });
        addElement({
            id: 'time',
            value: 'time'
        });
        addElement({
            id: 'pass',
            value: 'pass count 0 /' + specs.length + ''
        });
        addElement({
            id: 'fails',
            value: 'fail count 0 /' + specs.length + ''
        });

        for (var i = 0; i < specLength; i++) {

            addElement({
                'id': specs[i].id,
                'value': (specs[i].id + 1) + '. ' + specs[i].getFullName()
            });
            log.debug(i + '-----------specs.length   :: ' + specs[i].env.currentRunner_.queue.blocks.length);
            log.debug(specs[i].getFullName());
            log.debug(specs[i].parentSuite);
        }
    };


    /**
     * Will give update Elements
     * (Since this was create there for issue passing lib files from module)
     * @param data for element 
     */
    var updateElement = function (data) {
        addObject({
            name: 'script',
            value: 'document.getElementById("' + data.id + '").innerHTML = "' + data.value + '"'
        });
    };

    /**
     * adding Element DOM with data
     * @param data for element
     */
    var addElement = function (data) {
        addObject({
            name: 'div',
            id: data.id,
            value: data.value
        });
    };

    /**
     * adding Object to DOM
     * @param data for Object 
     */
    var addObject = function (data) {
        if (data.id == null) {
            send('<' + data.name + '>' + data.value + '</' + data.name + '>');
        } else {
            send('<' + data.name + ' id = "' + data.id + '">' + data.value + '</' + data.name + '>');
        }
    };

    /**
     * passing to front end 
     * @param arguments will be element
     */
    var send = function (arguments) {
        print(arguments);
    };
    
    /**
     * Logging data to console
     * @param arguments to console
     */
    var loged = function (arguments) {
        log.info(arguments);
    };
    return {
        reportSpecResults: reportSpecResults,
        reportRunnerResults: reportRunnerResults,
        reportRunnerStarting: reportRunnerStarting
    };

};