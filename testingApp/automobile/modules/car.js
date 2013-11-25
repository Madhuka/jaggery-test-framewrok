function Car(config) {
    this.name = config.name;
    this.engineSize = config.engineSize;
}
Car.prototype.getEngineSize = function() {
    return this.engineSize;
};

Car.prototype.upgradeEngineSize = function() {
    return this.engineSize+500;
};

