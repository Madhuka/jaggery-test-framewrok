//define test suites

var Car = require('motorcar').motorcar;

describe('TestSuite-Bez', function() {

    //config data for helping to test
    var myCar = null, myCarConfig = {
	name : 's520',
	engineSize : 2300,
	gearMode:'automatic'
    };

    //setting and define object to testing
    beforeEach(function() {
	myCar = new Car(myCarConfig);
    });

    //First test for to check was car built fine.
    it('Testing Car name and Engineer size is validate to Drive', function() {
	expect(myCar.name).toEqual('s520');
	expect(myCar.engineSize).toEqual(2300);
	expect(myCar.gearMode).toEqual('automatic');
    });

    // testing car (function) racing by enginee
    it('Checking Engineer capacity for Express way to ride', function() {
	expect(myCar.getEngineSize()).toEqual(2300);
    });

    it('UpgradeEngineSize to testing', function() {
	expect(myCar.upgradeEngineSize()).toBe(3100);

    });
    
    it('Checking gear mode ', function() {
	expect(myCar.getGearMode()).toBe(myCarConfig.gearMode);

    });

});
