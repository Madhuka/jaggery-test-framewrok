var cola = (function () {

    // for test specification name identification
    var specifcation = null,
        action = null;

    //test spec extension
    var TEST_FILE_EXTENSIOIN = '.js',
        LIST_ACTION = {
            listSuits: 'listsuits',
            listSpecs: 'listspecs'
        };

    jasmine.Spec.prototype.runs = function (func) {
        var block = new jasmine.Block(this.env, func, this),
            spec = specifcation;
        action = request.getParameter("action");
        log.info('specifcation is found ' + spec);
        // replace to id for this.env.currentSpec.suite.description

        //checking 'listSpecs' is called then do not added all in to execution list for to skip it.
        if (spec == null && action != LIST_ACTION.listSuits && action != LIST_ACTION.listSpecs) {
            this.addToQueue(block);
            //  } else if (this.env.currentSpec.suite.queue.env.currentSpec.id == spec) { 1.1V //checking for ID 
        } else if (this.env.currentSpec.suite.queue.env.currentSpec.getFullName() == spec) {
            this.addToQueue(block);

        }

        return this;
    };

    jasmine.Queue.prototype.next_ = function () {
        var self = this;
        var goAgain = true;

        while (goAgain) {
            goAgain = false;

            if (self.index < self.blocks.length && !(this.abort && !this.ensured[self.index])) {
                var calledSynchronously = true;
                var completedSynchronously = false;

                var onComplete = function () {
                    if (jasmine.Queue.LOOP_DONT_RECURSE && calledSynchronously) {
                        completedSynchronously = true;
                        return;
                    }

                    if (self.blocks[self.index].abort) {
                        self.abort = true;
                    }

                    self.offset = 0;
                    self.index++;

                    var now = new Date().getTime();

                    if (self.env.lastUpdate == 0) {

                        self.env.lastUpdate = now;
                    }

                    if (self.env.updateInterval && now - self.env.lastUpdate > self.env.updateInterval) {
                        self.env.lastUpdate = now;
                        self.next_();
                    } else {
                        if (jasmine.Queue.LOOP_DONT_RECURSE && completedSynchronously) {

                            goAgain = true;
                        } else {
                            self.next_();
                        }
                    }
                };
                self.blocks[self.index].execute(onComplete);

                calledSynchronously = false;
                if (completedSynchronously) {
                    onComplete();
                }

            } else {
                self.running = false;
                if (self.onComplete) {
                    self.onComplete();
                }
            }
        }
    };

    /*
     * function execute calling runner to starting testing after identification
     * url and location pattern to be executed
     *
     */
    jasmine.Env.prototype.execute = function () {
        if (urlMapper()) {
            this.currentRunner_.execute();
        }
    };

    /**
     * run is main function that will be called from app test level
     * this funtion will register the reporter for ENV in jasmine
     *
     */
    var run = function () {
        log.info(request.getContentType() + 'Called the run for colaaaaaaaaaaa-------' + request.getHeader("User-Agent"));
        var jasmineEnv = jasmine.getEnv(),
            renderingFormat = request.getParameter('format');
        // line can be uncommented for User-Agent/Accept to get type
        // renderingFormat request.getHeader("Accept"); // for to check text/html
        //request.getContentType() for application/json --> JSON
        //application/http -->
        //text/html --> simpleHTMLReporter
        if (renderingFormat == 'simplehtml') {
            var simpleHtmlReporterx = new jasmine.simpleHTMLReporter();
            jasmineEnv.addReporter(simpleHtmlReporterx);
        } else if (request.getContentType() == 'application/json') {
            // }else if (renderingFormat == 'json'){
            var jsonReporter = new jasmine.JSONReporter();
            jasmineEnv.addReporter(jsonReporter);
        } else if (renderingFormat == 'html') {
            //file name will variable of String in top - TO-DO
            loadJSToFront('scripts/reporter/lib/dasboard.html');
        }
        jasmineEnv.execute();
    };

    /**
     * function have URl mapping for pattern (n *m , 0<n,m<N) folder structure with one
     * file inside with specification
     *
     * http://localhost:9763/automobile/test[/{folderName}0-n][/{fileName}0-1][/{
     * testSpecName }0-1] * above URL pattern can be handle
     *
     */
    var urlMapper = function () {
        var uri = request.getRequestURI(),
            pathMatcher1 = null,
            pathMatcher2 = null,
            uriMatcher = new URIMatcher(
                uri);
        log.info(uri);

        // Provide a pattern to be matched against the URL
        if (uriMatcher.match('/{appname}/{test}/{+path}')) {
            // If pattern matches, elements can be accessed from their keys
            log.info('uriMatcher.elements().path :: ' + uriMatcher.elements().path);
            var indexU = uriMatcher.elements().path.indexOf('utilities');
            if (indexU != -1) {
                log.info('css or js file request for page.' + uriMatcher.elements().path.substr(indexU + 9));
                loadJSToFront('scripts/reporter/lib/' + uriMatcher.elements().path.substr(indexU + 9));
                return false;
            } else {
                pathMatcher1 = '/' + uriMatcher.elements().test + '/' + uriMatcher.elements().path;
                if (pathMatcher1 != null) {
                    pathMatcher2 = pathMatcher1.substr(0, pathMatcher1
                        .lastIndexOf("/"));
                    if (isValidPath(pathMatcher1, pathMatcher2)) {
                        specifcation = pathMatcher1.substr(pathMatcher1
                            .lastIndexOf("/") + 1);
                    }
                }
                log.info('path : ' + pathMatcher1 + ',' + pathMatcher2);
                return validatedPatten(pathMatcher1, pathMatcher2) && !errorFound;
                log.info(isExists(pathMatcher1));
                log.info(isExists(pathMatcher2));
            }
        }

        if (uriMatcher.match('/{appname}/{test}/')) {
            // root pattern for test Directory
            log.info('getting all file from Require');
            crawl('/' + uriMatcher.elements().test);
            return !errorFound;
        }

    };

    /**
     * function is validate URL pattern for requiring files
     *
     * @param pathMatcher1
     *            is path of a pattern of path can existing
     * @param pathMatcher2
     *            is path of a pattern of path can existing for second level
     * @returns boolean
     */
    var validatedPatten = function (pathMatcher1, pathMatcher2) {
        if (!reqiureFiles(pathMatcher1)) {
            if (!(reqiureFiles(pathMatcher2)) && pathMatcher2 != null && !(isValidPath(pathMatcher1, pathMatcher2))) {
                log.info("Path not exsting");
                print({
                    'error': true,
                    'message': 'path \'' + pathMatcher1 + '\' is not valid'
                });
                return false;
            }
        }
        return true;
    };


    /**
     * function will require all test specification js files/file in path
     *
     * @param path
     *            can be directory or to file path with out extension all test specification is
     *            define as *.js
     * @returns
     */
    var reqiureFiles = function (path) {
        log.info('requiring from ' + path);
        isCompleted = false;
        if (isDirectory(path)) {
            isCompleted = true;
            log.info("is Dir " + path);
            crawl(path);
        } else if (isExists(path + TEST_FILE_EXTENSIOIN)) {
            isCompleted = true;
            log.info("is File " + path + TEST_FILE_EXTENSIOIN);
            require(path + TEST_FILE_EXTENSIOIN);
        }
        return isCompleted;
    };

    /**
     * function crawl will require all the file in root location
     *
     * @param root
     *            is path of directory to search for test specification files
     */
    var errorFound = false;
    var crawl = function (root) {
        log.info('crawling on root called ' + root);
        var file = new File(root),
            list = file.listFiles();
        //stop crawlling if error found
        if (list == null || errorFound)
            return;
        try {
            for (var i = 0; i < list.length && !errorFound; i++) {
                log.info(i + ' checking files on ' + root);
                var f = list[i];

                if (f.isDirectory()) {

                    log.info("Dir:" + f.getName());
                    crawl(root + '/' + f.getName());
                } else {
                    log.info("File:" + f.getName());
                    require(root + '/' + f.getName());
                }

            }
        } catch (error) {
            errorFound = true;
            log.info('error ocuring on ' + error);
            var errorMessage = error.message.substring(error.message.indexOf('Requested resource'));
            print({
                'error': true,
                'message': errorMessage
            });

            return;
        }

    };

    /**
     *
     * @param path of the file inside jaggery module
     * @returns file will be return for front end
     */
    var loadJSToFront = function (filePath) {
        var file = new File(absolute(filePath));
        print(file.getStream());
    };

    var absolute = function (path) {
        var process = require('process');
        var parent = 'file:///' + (process.getProperty('jaggery.home') || process.getProperty('carbon.home')).replace(/[\\]/g, '/').replace(/^[\/]/g, '');
        return parent + '/modules/test/' + path;
    };

    /**
     * checking client request call 'listsuits'
     */
    var toListSuites = function () {
        log.info('toListSuites - ' + LIST_ACTION.listSuits);
        if (action == LIST_ACTION.listSuits) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * checking client request call 'listspecs'
     */
    var toListSpecs = function () {
        log.info('toListSpecs - ' + LIST_ACTION.listSpecs);
        if (action == LIST_ACTION.listSpecs) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * checking client request call 'test Specifcation' in url
     */
    var getSpecifcation = function () {
        return specifcation;
    };


    /**
     * function is to checks whether the given path is a directory
     *
     * @param path
     * @returns directory is existing return true
     */
    var isDirectory = function (path) {
        var file = new File(path);
        return file.isDirectory();
    };


    /**
     * file give the name of the file
     * @param path
     * @returns Name of the file without the path
     */
    var getName = function (path) {
        var file = new File(path);
        return file.getName();
    };

    /**
     *
     * @param path
     * @returns checks whether this file actually exists. Returns true if the
     *          file exists.
     */
    var isExists = function (path) {
        var file = new File(path);
        return file.isExists();
    };

    /**
     * validation check for specification name of test suite
     *
     * @param path1
     * @param path2
     * @returns {Boolean}
     */
    var isValidPath = function (path1, path2) {
        var isValid = false;
        if ((isDirectory(path2) || isExists(path2 + TEST_FILE_EXTENSIOIN)) && !(isDirectory(path1) || isExists(path1 + TEST_FILE_EXTENSIOIN))) {
            log.info('Current URL - path is validated for testspec name.');
            isValid = true;
        }
        return isValid;
    };

    return {
        run: run,
        loadJSToFront: loadJSToFront,
        toListSuites: toListSuites,
        toListSpecs: toListSpecs,
        getSpecifcation: getSpecifcation
    };

}());