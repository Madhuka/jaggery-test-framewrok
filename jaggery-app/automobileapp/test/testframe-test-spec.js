//define test suites - to test framework 
describe('TestSuite-JaggeryTestFramework', function () {

    it('is defined', function () {
        var name = 'Andrew';
        expect(name).toBeDefined();
    })
    it('is not defined', function () {
        var name;
        expect(name).toBeUndefined();
    });

    //toBeTruthy / toBeFalsy If something should be true or false

    it('is true', function () {
        expect(true).toBeTruthy();
    });
    it('is false', function () {
        expect(false).toBeFalsy();
    });

    //toBeLessThan / toBeGreaterThan, For all you number can be tested

    it('is less than 10', function () {
        expect(5).toBeLessThan(10);
    });
    it('is greater than 10', function () {
        expect(20).toBeGreaterThan(10);
    });

    //toMatch - Have some output text that should match a regular expression

    it('outputs the right text', function () {
        var cart = ['apples', 'oranges', 'pears'];
        expect(cart.length).toMatch(/\d*/);
        expect('madhuka').toMatch(/mad\?*/);
        expect('$12.22').toMatch(/\$\d*.\d\d/);
    });

    // toContain - This one is pretty useful. It checks to see if an array or string contains an item or substring.

    it('should contain oranges', function () {
        expect(['apples', 'oranges', 'pears']).toContain('oranges');
    });

    it('Checking equivalent', function () {
        //var x = 12, y=12;
        var x = {
            name: 'madhuka',
            age: 25
        }, y = {
                age: 25,
                name: 'madhuka'
            };
        expect(x).toEqual(y);
    });

    //checking for same object

    it('Checking same Object', function () {
        var x = {
            name: 'madhuka',
            age: 25
        }, y = {
                name: 'madhuka',
                age: 25
            };
        expect(x).toBe(x);
    });

    //null check
    it('Checking null', function () {
        expect(null).toBeNull();
    });

    //passes if function fn throws exception e when executed
    it('Checking function and exception', function () {
        var testFn = function () {
            // code gerate error
            throw new Error('unrecognized from-unit');
        };
        expect(testFn).toThrow(new Error('unrecognized from-unit'));

    });

});