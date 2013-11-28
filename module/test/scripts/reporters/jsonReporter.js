jasmine.JSONReporter = function() {

	var startingTime = (new Date()).getTime();
	var spec = request.getParameter("spec");
	
	/*
	*exports is a return result report json structure 
	*
	*/		
	this.exports = {
		elapsedTime : null,
		specsCount : 0,
		specsPassed : 0,
		specsFailed : 0,
		suites : []
	},

	/*
	*function reportRunnerResults is responsible for passing results out
	*
	*/	
	this.reportRunnerResults = function() {
		this.exports.elapsedTime = parseInt((new Date()).getTime()
				- startingTime, 10)
				+ "ms";
		var outJson = JSON.stringify(this.exports);		
		print(outJson);
		if (this.exports.specsCount - this.exports.specsPassed !== 0) {
			this.log('Exiting with errors');
		} else {
			this.log('Exiting with ' + this.exports.specsCount
					+ ' passed specs ');
		}

	},

	/*
	*function reportSpecResults is responsible for building message to be report with parent message and items per test Spec
	*@param spec {Spec} it is test spec for report
	*/
	this.reportSpecResults = function(spec) {
		
		spec.suite.description
		this.exports.specsCount += 1;

		if (spec.results().passed()) {
			this.exports.specsPassed++;
		} else {
			this.exports.specsFailed++;
		}		
		var l = spec.results().items_.length;
		var items = new Array();
		for ( var i = 0; i < l; i++) {			
			items[i] = {
				type : spec.results().items_[i].type,
				message : spec.results().items_[i].message
			};
		}
		
		this.exports.suites.push({
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
		var log = new Log();
		log.debug('testing json....');
	};
};

	/*
	*function is hmadling adding block to jasmine queue
	*@param func {Function} it testing function block inside test spec
	*/
	jasmine.Spec.prototype.runs = function (func) {
		var block = new jasmine.Block(this.env, func, this),
		spec = request.getParameter("spec");
		if(spec == null){
			this.addToQueue(block);
		}else if(this.env.currentSpec.suite.description == spec){
			this.addToQueue(block);
		}
		return this;
};