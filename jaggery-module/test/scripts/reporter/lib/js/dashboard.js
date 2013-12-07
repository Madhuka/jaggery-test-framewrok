TestApp = new function () {
    //name of test framework will be top in here rather 'TestApp'

    testCount = null;
    selectedCount = 0;
    runningCount = 0;
    passCount = 0;
    failCount = 0;

    this.runTest = function () {
        this.countReset();
        for (var i = 0; i < testCount; i++) {
            testID = i;
            $('#err' + testID + '').html('');

            if ($('#chk' + testID + '').is(':checked')) {
                ++runningCount;
                this.makeCallToTest(testID);
            } else {
                $('#res' + testID + '').html('<div  class="alert alert-info">Not Selected</div>');
            }
        }
        this.displaySummaryReport();
    },

    this.selectAll = function (call) {
        var i = 0;
        for (; i < testCount; i++) {
            $('#chk' + i + '').prop('checked', call);
        }
        if (call) {
            selectedCount = i;
        } else {
            selectedCount = 0;

        }
        this.displayInfoUpdate();
    },

    this.handleClick = function (checkBox) {
        if (checkBox.checked) {
            selectedCount++;
        } else {
            selectedCount--;
        }
        this.displayInfoUpdate();
    },

    this.makeCallToTest = function (testID) {
        $('#basicInfor').html('Test count is ' + testCount + ' running ' + selectedCount + '/' + testCount);


        TestAppUtil.makeJsonRequest(document.location.pathname + $('#chk' + testID + '').val(), null, function (html) {
            if (!html.error) {
                if (html.suites[0].items[0].message == "Passed.") {
                    TestApp.testPass(testID,html);
                } else {
                    TestApp.testFail(testID,html);
                }
                //console.log(htmlx.suites[0].itemCount);
                TestApp.displayInfoUpdate();
            } else {

                TestApp.testCallError(testID,html);
            }
        });


    },


    this.displayInfoUpdate = function () {
        $('#basicInfor').html(selectedCount + ' selected out of ' + testCount);
    },

    this.testPass = function (testID,data) {
        passCount++;
        $('#err' + testID + '').html('');
        $('#res' + testID + '').html('<div class="alert alert-success">' + data.suites[0].items[0].message + '</div>');
    },

    this.testFail = function (testID,data) {
        failCount++;
        var errMsgList = '';
        $('#res' + testID + '').html('<div class="alert alert-danger"> Failed.</div>');
        for (var j = 0; l = data.suites[0].itemCount, j < l; j++) {
            if (data.suites[0].items[j].message != 'Passed.') {
                errMsgList += data.suites[0].items[j].message + '<br>';

            }
        }
        $('#err' + testID + '').html('<div><code>' + errMsgList + '</code></div>');
    },


    this.testCallError = function (testID,data) {
        $('#res' + testID + '').html('<div class="alert alert-danger">Fail to Call the Test</div>');
        $('#err' + testID + '').html('<div><code>' + data.message + '</code></div>');
    },


    this.displaySummaryReport = function () {
        $('#summaryReport').html(
            '<p>Pass Count out of Run count: ' + passCount + '/' + runningCount + '<br>Fail Count out of Run count: ' + failCount + '/' + runningCount + '<br>Run Count out of Selected Test: ' + runningCount + '/' + selectedCount + '</p>');
    },

    this.displayErrorMessage = function (message) {
        $('#summaryReport').html('<p>Error!</p>');
        $('#controllers').html('');
        $('#sampleLoc').html('<div class="alert alert-danger">Error! ' + message + '</div>');
    },

    this.countReset = function () {
        runningCount = 0;
        passCount = 0;
        failCount = 0;
    },

    this.loadSuiteList = function () {
        //in here we will get warning on (that to be fixed jquery http://bugs.jquery.com/ticket/14320)
        //console.log('Loading loadSuiteList');
        TestAppUtil.makeJsonRequest(document.location.pathname, {
                action: 'listsuits'
            },
            function (html) {
                if (!html.error) {
                    $('#basicInfor').html('Test count is' + html.specsCount);
                    var template = '<table class="table table-hover">{{#.}}<tr><td><label> <input type="checkbox" id="chk{{id}}" value="{{url}}" onclick="TestApp.handleClick(this)" checked>  {{fullname}}<div id="err{{id}}"></div> <label> </td><td></td><td><div id="res{{id}}"></div></td> </tr>{{/.}}<table>';
                    var htmlx = Mustache.to_html(template, html.specs);
                    $('#sampleLoc').html(htmlx);
                    testCount = html.specsCount;
                } else {
                    TestApp.displayErrorMessage(html.message);

                }

            });
        selectedCount = testCount;
        this.displayInfoUpdate();
    };


};