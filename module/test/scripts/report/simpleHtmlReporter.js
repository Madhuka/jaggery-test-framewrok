jasmine.simpleHTMLReporter = function () {

    var startingTime = (new Date()).getTime(),
        log = new Log();

    var exports = {
        elapsedTime: null,
        specsCount: 0,
        specsPassed: 0,
        specsFailed: 0,
        suites: []
    };

    /*
     * reportRunnerResults will called finally for to get results
     */
    var reportRunnerResults = function () {
        exports.elapsedTime = parseInt((new Date()).getTime() - startingTime, 10) + "ms";
        //	var outJson = JSON.stringify(this.exports);
        var json = exports;
        //log.debug(this.exports);
        //   print('<p>' + json.elapsedTime + '</p>');
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
       // var items = new Array();
        for (var i = 0; i < l; i++) {
            //log.debug(spec.results().items_[i]);
            
           /* data = {
                'id': exports.specsCount - 1,
                'value': exports.specsCount  + '. ' + spec.suite.description + ' ---> ' + spec.results().items_[i].message +spec.getFullName()
            };*/
            data = {
                    'id': exports.specsCount - 1,
                    'value': exports.specsCount  + '. ' + spec.suite.description + ' ---> ' + spec.results().items_[i].message +':: in ::'+encodeURIComponent(spec.getFullName())
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
    var reportRunnerStarting = function (runner) {
        log.debug('reportRunnerStarting..............xxxx............' + runner.env.versionString());
        
        var suites = runner.suites();
        log.info('suites.length-------'+suites.length);
        for (var i = 0; i < suites.length; i++) {
          var suite = suites[i];
          log.info(i+'xxxxxxxxxxxx '+suite.id+'::'+suite.description);
         
        //  //var suiteDiv = this.createDom('div', { className: 'suite' },
           //   this.createDom('a', { className: 'run_spec', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, "run"),
           //   this.createDom('a', { className: 'description', href: '?spec=' + encodeURIComponent(encodeURIComponent) }, suite.description));
        //  this.suiteDivs[suite.id] = suiteDiv;
       //   var parentDiv = this.outerDiv;
          if (suite.parentSuite) {
              log.info('xxxxxxxxxxxx ::'+suite.parentSuite.id);
          //  parentDiv = this.suiteDivs[suite.parentSuite.id];
          }
         // parentDiv.appendChild(suiteDiv);
        }
        
        
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
            value: 'Jaggery Cola Test Frmaework'
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
                'id': specs[i].id,
                'value': (specs[i].id+1) + '. '+specs[i].getFullName()
            });
            log.info(i + '-----------specs.length   :: ' + specs[i].env.currentRunner_.queue.blocks.length);
            log.info(specs[i].getFullName());
            log.info(specs[i].parentSuite);
        }
    };


    var updateElement = function (data) {
        addObject({
            name: 'script',
            value: 'document.getElementById("' + data.id + '").innerHTML = "' + data.value + '"'
        });
    };

    var addElement = function (data) {
        addObject({
            name: 'div',
            id: data.id,
            value: data.value
        });
    };

    var addObject = function (data) {
        if (data.id == null) {
            send('<' + data.name + '>' + data.value + '</' + data.name + '>');
        } else {
            send('<' + data.name + ' id = "' + data.id + '">' + data.value + '</' + data.name + '>');
        }
    };

    var send = function (arguments) {
        print(arguments);
    };
    var loged = function (arguments) {
        log.info(arguments);
    };
    return {
	reportSpecResults : reportSpecResults,
	reportRunnerResults : reportRunnerResults,
	reportRunnerStarting : reportRunnerStarting
    };

};