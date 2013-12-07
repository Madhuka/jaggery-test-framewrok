//define test suites

var Car = require('../../modules/car.js').Car;

describe('TestSuiteOne-Car', function() {

    //config data for helping to test
    var myCar, myCarConfig = {
	name : 'Ford',
	engineSize : 1500
    };

    //setting and define object to testing
    beforeEach(function() {
	myCar = new Car(myCarConfig);
    });

    //First test for to check was car built fine.
    it('Testing Car name and Engineer size is validate to Drive', function() {
	expect(myCar.name).toEqual('Ford');
	expect(myCar.engineSize).toEqual(1500);
    });

    //testing car (function) racing by enginee
    it('Checking Engineer capacity for Express way to ride', function() {
	expect(myCar.getEngineSize()).toEqual(1500);
    });

    it('upgradeEngineSize to testing', function() {
	expect(myCar.upgradeEngineSize()).toBe(2000);

    });

});
