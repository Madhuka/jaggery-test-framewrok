function Car(config) {
    this.name = config.name;
    this.engineSize = config.engineSize;

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
        return this.engineSize + 500;
    };
}

