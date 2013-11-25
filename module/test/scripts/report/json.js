jasmine.JSONReporter = function() {

	var startingTime = (new Date()).getTime();
	var spec = request.getParameter("spec");
	this.exportsx = {
		elapsedTime : null,
		specsCount : 0,
		specsPassed : 0,
		specsFailed : 0,
		suites : []
	},

	this.reportRunnerResults = function() {
		this.exportsx.elapsedTime = parseInt((new Date()).getTime()
				- startingTime, 10)
				+ "ms";
		//log.info(this);
		var outJson = JSON.stringify(this.exportsx);
		log.info(outJson);
		print(outJson);
		log.info('testing OUt put');
		if (this.exportsx.specsCount - this.exportsx.specsPassed !== 0) {
			this.log('Exiting with errors');
		} else {
			this.log('Exiting with ' + this.exportsx.specsCount
					+ ' passed specs ');
		}

	},

	this.reportSpecResults = function(spec) {
		
		spec.suite.description
		log.info('reportSpecResults..........');
		this.exportsx.specsCount += 1;

		if (spec.results().passed()) {
			this.exportsx.specsPassed++;
		} else {
			this.exportsx.specsFailed++;
		}
		log.info('xxxxxxxxxxxx JSON Reporter xxxxxxxxxxxxxxxxxxxxxxx');

		var l = spec.results().items_.length;
		var items = new Array();
		for ( var i = 0; i < l; i++) {
			log.info(spec.results().items_[i]);
			items[i] = {
				type : spec.results().items_[i].type,
				message : spec.results().items_[i].message
			};
		}
		log.info(spec.results());
		log.info('spec.suite.parentSuitexxxxxxxxxxxxxxx...');
		log.info(spec.suite.toSource());
		this.exportsx.suites.push({
			suite : spec.suite.description,
			spec : spec.description,
			passed : spec.results().passed(),
			itemCount : spec.results().totalCount,
			passedCount : spec.results().passedCount,
			failedCount : spec.results().failedCount,
			skipped : spec.results().skipped,
			items : items

		});
	};

	this.log = function() {
		log.info('testing json....');
		log.info(arguments);
	};
};

jasmine.Spec.prototype.runs = function (func) {
	log.info('Over riding -- jasmine.Spec.prototype.runs with addedin block to queue');
	//log.info(suite.description == "#Test Suite One");
  var block = new jasmine.Block(this.env, func, this),
  spec = request.getParameter("spec");
  log.info(spec);
  log.info(this.env.toSource());
  if(spec == null){
	  this.addToQueue(block);
  }else if(this.env.currentSpec.suite.description == spec){
  this.addToQueue(block);
  }
  return this;
};