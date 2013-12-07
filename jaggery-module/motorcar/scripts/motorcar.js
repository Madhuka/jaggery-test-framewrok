function motorcar (config) {
    this.name = config.name;
    this.engineSize = config.engineSize;
    this.gearMode = config.gearMode;

    /**
     * will return the engine size of the car
     * @returns engine size number
     */
    this.getEngineSize = function() {
        return this.engineSize;
    };

    /**
     * upgradeEngineSize will upgrade engine of the from 500
     * @returns upgraded engine size
     */
    this.upgradeEngineSize = function() {
        return this.engineSize + 800;
    };
    /**
     * upgradeEngineSize will upgrade engine of the from 500
     * @returns upgraded engine size
     */
    this.getGearMode = function() {
    	return this.gearMode;
    };
    
}