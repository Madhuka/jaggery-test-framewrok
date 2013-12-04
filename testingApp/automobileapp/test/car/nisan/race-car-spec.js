//define test suites

var Car = require('../../../modules/car.js').Car;

//setting and define object to testing


describe('TestSuiteFor-Nisan-Race', function() {

    //config data for helping to test
    var myCar, myCarConfig = {
        name : "SkyLine",
        engineSize : 1800
    };

    beforeEach(function() {
        myCar = new Car(myCarConfig);

    });

    //First test for to check was car built fine.
    it('Testing Car name and Engineer size is validate to Drive', function() {
        expect(myCar.name).toEqual("SkyLine");
        expect(myCar.engineSize).toEqual(1800);
    });

    //grouping test for Engine Turning Test
    describe("TurningEngineForNisan-RaceCar", function() {

        //checking test platform work fine
        it("Checking testing platform is turned to test", function() {
            expect(1).toEqual(1);
        });

        //testing car (function) racing by enginee
        it("Checking Engineer capacity for Express way to ride", function() {
            expect(myCar.getEngineSize()).toEqual(1800);
        });

    });

    describe("upgradeEngineSizeOfNisan-Racecar", function() {

        it("Checking testing platform is turned to test", function() {
            expect(1).toBe(1);
        });

        it("upgradeEngineSize to testing", function() {
            expect(myCar.upgradeEngineSize()).toBe(2300);

        });

    });

});

