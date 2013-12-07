//define test suites
var Car = require('../../../modules/car.js').Car;


describe('TestSuite-Nisan-RaceCar', function () {

    //config data for helping to test
    var myCar, myCarConfig = {
            name: 'R390_GT1',
            engineSize: 3500
        };

    beforeEach(function () {
	//setting and define object to testing
        myCar = new Car(myCarConfig);

    });

    //First test for to check was car built fine.
    it('Testing Car name and Engineer size is validate to Drive', function () {
        expect(myCar.name).toEqual('R390_GT1');
        expect(myCar.engineSize).toEqual(3500);
    });



    //testing car (function) racing by enginee
    it('Checking Engineer capacity for Express way to ride', function () {
        expect(myCar.getEngineSize()).toEqual(3500);
    });



    it('upgradeEngineSize to testing', function () {
        expect(myCar.upgradeEngineSize()).toBe(4000);

    });



});