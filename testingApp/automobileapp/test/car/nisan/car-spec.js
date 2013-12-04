//define test suites

var Car = require('../../../modules/car.js').Car;


var myCar, myCarConfig = {
        name : "TIDA",
        engineSize : 1300
    };

describe('TestSuiteTwo-Nisan', function() {

    //config data for helping to test


    //setting and define object to testing
    beforeEach(function() {
        myCar = new Car(myCarConfig);
    });

    //First test for to check was car built fine.
    it('Testing Car name and Engineer size is validate to Drive', function() {
        expect(myCar.name).toEqual("TIDA");
        expect(myCar.engineSize).toEqual(1300);
    });

});

//grouping test for Engine Turning Test
describe("TurningEngineForNisanCar", function() {

	
	//setting and define object to testing
    beforeEach(function() {
        myCar = new Car(myCarConfig);
    });
    
    //checking test platform work fine
    it("Checking testing platform is turned to test", function() {
        expect(1).toEqual(1);
    });

    //testing car (function) racing by enginee
    it("Checking Engineer capacity for Express way to ride", function() {
        expect(myCar.getEngineSize()).toEqual(1300);
    });

});

describe("upgradeEngineSizeOfNisancar", function() {

	
	//setting and define object to testing
    beforeEach(function() {
        myCar = new Car(myCarConfig);
    });
    
    it("Checking testing platform is turned to test", function() {
        expect(1).toBe(1);
    });

    it("upgradeEngineSize to testing", function() {
        expect(myCar.upgradeEngineSize()).toBe(1800);

    });

});
