function Car(config) {
    this.name = config.name;
    this.engineSize = config.engineSize;
	
	this.getEngineSize = function() {
		return this.engineSize;
	};
	
	this.upgradeEngineSize = function() {
		return this.engineSize+500;
	};
}


