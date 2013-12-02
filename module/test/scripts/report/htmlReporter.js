jasmine.HTMLReporter = function () {

    var startingTime = (new Date()).getTime(),
        log = new Log();

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
        //	var outJson = JSON.stringify(this.exports);
        var json = this.exports;
        //log.debug(this.exports);
        //   print('<p>' + json.elapsedTime + '</p>');
        var data = {
            'id': 'time',
            'value': 'Elapsed Time: ' + json.elapsedTime
        };
        updateElement(data);
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
            //log.debug(spec.results().items_[i]);
            
            data = {
                'id': this.exports.specsCount - 1,
                'value': this.exports.specsCount  + '. ' + spec.suite.description + ' ---> ' + spec.results().items_[i].message
            };
            updateElement(data);

            updateElement({
                id: 'pass',
                value: 'pass count ' + this.exports.specsPassed + ' /' + this.exports.specsCount + ''
            });
            updateElement({
                id: 'fails',
                value: 'fail count ' + this.exports.specsFailed + ' /' + this.exports.specsCount + ''
            });
        }




    };
    this.reportRunnerStarting = function (runner) {
        log.debug('reportRunnerStarting..........................' + runner.env.versionString());
        //log.debug(runner.toSource());
        var specs = runner.specs() || [],
            specLength = specs.length;

        if (specs.length == 0) {
            return;
        }
        log.debug('specs.lengths   :: ' + specLength);
        log.debug('specs.length   :: ' + specs.toSource());
        addObject({
            name: 'h1',
            value: 'test Frmaework'
        });
        addObject({
            name: 'p',
            value: 'There is ' + specs.length + 'Test to be run'
        });
        addElement({
            id: 'time',
            value: 'There is ' + specs.length + 'Test to be run'
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
                'id': i,
                'value': (i+1) + '. '
            });
            log.debug(i + '-----------specs.length   :: ' + specs[i]);
        }
    };


    updateElement = function (data) {
        addObject({
            name: 'script',
            value: 'document.getElementById("' + data.id + '").innerHTML = "' + data.value + '"'
        });
    };

    addElement = function (data) {
        addObject({
            name: 'div',
            id: data.id,
            value: data.value
        });
    };

    addObject = function (data) {
        if (data.id == null) {
            send('<' + data.name + '>' + data.value + '</' + data.name + '>');
        } else {
            send('<' + data.name + ' id = "' + data.id + '">' + data.value + '</' + data.name + '>');
        }
    };

    send = function (arguments) {
        print(arguments);
    };
    this.loged = function (arguments) {
        log.info(arguments);
    };


};