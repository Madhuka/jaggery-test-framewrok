//define test suites
var Car = require('../../../modules/car.js').Car;


describe('Nisan-RaceCar', function () {

    //config data for helping to test
    var myCar, myCarConfig = {
            name: "SkyLine",
            engineSize: 1800
        };

    beforeEach(function () {
	//setting and define object to testing
        myCar = new Car(myCarConfig);

    });

    //First test for to check was car built fine.
    it('Testing Car name and Engineer size is validate to Drive', function () {
        expect(myCar.name).toEqual("SkyLine");
        expect(myCar.engineSize).toEqual(1800);
    });



    //testing car (function) racing by enginee
    it("Checking Engineer capacity for Express way to ride", function () {
        expect(myCar.getEngineSize()).toEqual(1800);
    });



    it("upgradeEngineSize to testing", function () {
        expect(myCar.upgradeEngineSize()).toBe(2300);

    });



});