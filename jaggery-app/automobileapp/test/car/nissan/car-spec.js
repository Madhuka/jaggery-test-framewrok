//define test suites
var Car = require('../../../modules/car.js').Car;

//configration data for helping to test
var myCar, myCarConfig = {
        name: 'TIDA',
        engineSize: 1300
    };

//TestSuite
describe('TestSuite-NisanCar', function () {


    //setting and define object to testing
    beforeEach(function () {
        myCar = new Car(myCarConfig);
    });

    //First test for to check was car built fine.
    it('Testing Car name and Engineer size is validate to Drive', function () {
        expect(myCar.name).toEqual('TIDA');
        expect(myCar.engineSize).toEqual(1300);
    });

    //testing car (function) racing by enginee
    it('Checking Engineer capacity for Express way to ride', function () {
        expect(myCar.getEngineSize()).toEqual(1300);
    });

    //Engine Upgrade Test
    it('upgradeEngineSize to testing', function () {
        expect(myCar.upgradeEngineSize()).toBe(1800);

    });

});
