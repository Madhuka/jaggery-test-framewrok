//define test suites

var Car = require('../../../jaggeryCar.jag').Car;

describe('TestSuite-KIA', function() {

    //config data for helping to test
    var myCar = null, myCarConfig = {
	name : "rio",
	engineSize : 1300,
	gearMode:'automatic'
    };

    //setting and define object to testing
    beforeEach(function() {
	myCar = new Car(myCarConfig);
    });

    //First test for to check was car built fine.
    it('Testing Car name and Engineer size is validate to Drive', function() {
	expect(myCar.name).toEqual("rio");
	expect(myCar.engineSize).toEqual(1300);
    });

    // testing car (function) racing by enginee
    it("Checking Engineer capacity for Express way to ride", function() {
	expect(myCar.getEngineSize()).toEqual(1300);
    });

    it("UpgradeEngineSize to testing", function() {
	expect(myCar.upgradeEngineSize()).toBe(1800);

    });
    
    it("Checking gear mode ", function() {
	expect(myCar.getGearMode()).toBe(myCarConfig.gearMode);

    });

});
