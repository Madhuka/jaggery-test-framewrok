//define test suites
var Car = require('../modules/car.js').Car;

describe('TestSuiteOne-BasicCar', function () {

    //config data for helping to test
    var myCar, pravinCar = null,
        myCarConfig = {
            name: "Vitz",
            engineSize: 1000
        };

    //setting and define object to testing
    beforeEach(function () {
        myCar = new Car(myCarConfig);
    });

    //First test for to check was car built fine.
    it('Testing Car name and Engineer size is validate to Drive', function () {
        expect(myCar.name).toEqual("Vitz");
        expect(myCar.engineSize).toEqual(1000);
    });

    //grouping test for Engine Turning Test
    describe("TurningEngine-BasicCar", function () {

        //checking test platform work fine
        it("Checking testing platform is turned to test", function () {
            expect(1).toEqual(1);
        });

        //testing car (function) racing by enginee
        it("Checking Engineer capacity for Express way to ride", function () {
            expect(myCar.getEngineSize()).toEqual(1000);
        });

    });

    describe("upgradeEngineSize-BasicCar", function () {

        it("Checking testing platform is turned to test", function () {
            expect(1).toBe(1);
        });

        it("upgradeEngineSize to testing", function () {
            expect(myCar.upgradeEngineSize()).toBe(1500);

        });

    });

});