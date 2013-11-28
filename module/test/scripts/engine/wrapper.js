jasmine.Spec.prototype.runs = function(func) {
	var block = new jasmine.Block(this.env, func, this), spec = specifcation,validateSpec=false;
	log.debug('specifcation is found '+spec);
	if (spec == null) {		
		this.addToQueue(block);
		validateSpec = true;
	} else if (this.env.currentSpec.suite.description == spec) {
		this.addToQueue(block);
		validateSpec = true;
	}
/*	if(!validateSpec){
		print({'error':true, 'message': 'Test Spec called \''+specifcation +'\' is unable to find in this URL'});
		return ;
	}*/
	return this;
};



jasmine.Queue.prototype.next_ = function() {
	var self = this;
	var goAgain = true;

	while (goAgain) {
		goAgain = false;

		if (self.index < self.blocks.length
				&& !(this.abort && !this.ensured[self.index])) {
			var calledSynchronously = true;
			var completedSynchronously = false;

			var onComplete = function() {
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

				if (self.env.updateInterval
						&& now - self.env.lastUpdate > self.env.updateInterval) {
					self.env.lastUpdate = now;
					self.next_();
				} else {
					if (jasmine.Queue.LOOP_DONT_RECURSE
							&& completedSynchronously) {

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
 * function execute calling runner to starting testing after identtifiying url and location pattern to be executed
 *
 */
jasmine.Env.prototype.execute = function() {
  if (urlMapper()){
  this.currentRunner_.execute();
  }
};

//for test specification name identifyer
var specifcation = null;

/**
 * function have URl mappering for pattern unlimate folder strure with one file inside with specfication
 * 
 * http://localhost:9763/automobile/test[/{folderName}0-n][/{fileName}0-1][/{ testSpecName }0-1]  * 
 * above URL pattern can be handle 
 * 
 */
urlMapper = function() {
	var uri = request.getRequestURI(), pathMatcher1 = null, pathMatcher2 = null, uriMatcher = new URIMatcher(
			uri);
	log.debug(uri);

	// Provide a pattern to be matched against the URL
	if (uriMatcher.match('/{appname}/{test}/{+path}')) {
		// If pattern matches, elements can be accessed from their keys

		pathMatcher1 = '/' + uriMatcher.elements().test + '/'
				+ uriMatcher.elements().path;
		if (pathMatcher1 != null) {
			pathMatcher2 = pathMatcher1
					.substr(0, pathMatcher1.lastIndexOf("/"));
			if (isValidPath(pathMatcher1, pathMatcher2)) {
				specifcation = pathMatcher1.substr(pathMatcher1
						.lastIndexOf("/") + 1);
			}
		}
		log.debug('path : ' + pathMatcher1 + ',' + pathMatcher2);
		return validatedPatten(pathMatcher1, pathMatcher2);
		log.debug(isExists(pathMatcher1));
		log.debug(isExists(pathMatcher2));

	}

	if (uriMatcher.match('/{appname}/{test}/')) {
		// root pattern for test Dir
		log.debug('getting all file from Require');
		crawl('/' + uriMatcher.elements().test);
		return true;
	}

};

/**
 * function is validate url pattern for requrieiung files 
 * @param pathMatcher1 is path of a pattern of path can exsting 
 * @param pathMatcher2 is path of a pattern of path can exsting for second level
 * @returns boolean 
 */
function validatedPatten(pathMatcher1, pathMatcher2) {
	if (!reqiureFiles(pathMatcher1)) {
		if (!(reqiureFiles(pathMatcher2)) && pathMatcher2 != null
				&& !(isValidPath(pathMatcher1, pathMatcher2))) {
			log.debug("Path not exsting");
			print({
				'error' : true,
				'message' : 'path \'' + pathMatcher1 + '\' is not valid'
			});
			return false;
		}
	}
	return true;
}

/**
 * function will reuire all test spec js files/file in path 
 * @param path can be dir or to file path with out extension 
 * all test spec is defin as .js  
 * @returns
 */
function reqiureFiles(path) {
	log.debug('requiring from '+path);
	isCompleted = false;
	if (isDirectory(path)) {
		isCompleted = true;
		log.debug("is Dir " + path);
		crawl(path);
	} else if (isExists(path + '.js')) {
		isCompleted = true;
		log.debug("is File " + path + '.js');
		require(path + '.js');
	}
	return isCompleted;
};


/**
 * function crawl will require all the file in root location 
 * @param root is path of dir to search for test spec files 
 */
function crawl(root) {
	log.debug('crawling on root called ' + root);
	var specList, dirList, file = new File(root), list = file.listFiles();

	if (list == null)
		return;

	for ( var i = 0; i < list.length; i++) {
		log.debug(i + ' checking files on ' + root);
		var f = list[i];
		if (f.isDirectory()) {

			log.debug("Dir:" + f.getName());
			crawl(root + '/' + f.getName());
		} else {
			log.debug("File:" + f.getName());
			require(root + '/' + f.getName());
		}
	}
};
	


/**
 * function is to checks whether the given path is a directory
 * @param path
 * @returns directory is esxting return true
 */
function isDirectory(path) {
	var file = new File(path);
	return file.isDirectory();
};

/**
 * .
 * @param path
 * @returns  Name of the file without the path
 */
function getName(path) {
	var file = new File(path);
	var name = file.getName();
	return file.getName();
};

/**
 * 
 * @param path
 * @returns checks whether this file actually exists. 
 * Returns true if the file exists.
 */
function isExists(path) {
	var file = new File(path);
	return file.isExists();
};

/**
 * validation check for spec name of test suite
 * @param path1
 * @param path2
 * @returns {Boolean}
 */
function isValidPath(path1,path2) {
	var isValid = false;
	if ((isDirectory(path2) || isExists(path2+'.js')) && !(isDirectory(path1) || isExists(path1+'.js') )) {
		log.debug('Current URL - path is validated for testspec name.');
		isValid = true;
	}
	return isValid;
};

