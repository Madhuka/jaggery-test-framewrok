TestApp = new function () {
    //name of test framework will be top in here rather 'TestApp'

    testCount = null;
    selectedCount = 0;
    runningCount = 0;
    passCount = 0;
    failCount = 0;


    this.runTest = function () {
        this.countReset();
        // console.log("Run Test"+$("#chk0").val());	
        for (var i = 0; i < testCount; i++) {

            // console.log($("#chk"+i+"").is(':checked'));
            if ($('#chk' + i + '').is(':checked')) {
                ++runningCount;
                $('#basicInfor').html('Test count is ' + testCount + ' running ' + selectedCount + '/' + testCount);



                TestAppUtil.makeJsonRequest(document.location.pathname + $('#chk' + i + '').val(), null, function (htmlx) {
                    if (htmlx.suites[0].items[0].message == "Passed.") {
                        passCount++;
                        $('#err' + i + '').html('');
                        $('#res' + i + '').html('<div class="alert alert-success">' + htmlx.suites[0].items[0].message + '</div>');
                    } else {
                        failCount++;
                        var errMsgList = '';
                        $('#res' + i + '').html('<div class="alert alert-danger"> Failed.</div>');
                        for (var j = 0; l = htmlx.suites[0].itemCount, j < l; j++) {
                            if (htmlx.suites[0].items[j].message != 'Passed.') {
                                errMsgList += htmlx.suites[0].items[j].message + '<br>';

                            }
                        }
                        $('#err' + i + '').html('<div><code>' + errMsgList + '</code></div>');

                    }
                    //console.log(htmlx.suites[0].itemCount);
                    TestApp.displayInfoUpdate();
                });

            } else {
                $('#res' + i + '').html('<div  class="alert alert-info">Not Selected</div>');
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


    this.displayInfoUpdate = function () {
        $('#basicInfor').html(selectedCount + ' selected out of ' + testCount);
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
        console.log('Loading loadSuiteList');
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