TestApp = new function () {
    //name of test framework will be top in here rather 'TestApp'

    testCount = null;
    selectedCount = 0;
    runningCount = 0;
    this.runTest = function () {
        selectedCount = 0;
        // console.log("Run Test"+$("#chk0").val());	
        for (var i = 0; i < testCount; i++) {

            // console.log($("#chk"+i+"").is(':checked'));
            if ($("#chk" + i + "").is(':checked')) {
                ++selectedCount;
                $('#basicInfor').html('Test count is ' + testCount + ' running ' + selectedCount + '/' + testCount);
                TestAppUtil.makeJsonRequest(document.location.pathname + $("#chk" + i + "").val(), null, function (htmlx) {
                      if(htmlx.suites[0].items[0].message == "Passed."){
                    $("#res" + i + "").html('<div class="alert alert-success">' + htmlx.suites[0].items[0].message + '</div>');
                      }else{
                       $("#res" + i + "").html('<div class="alert alert-danger"> Failed.</div>');  
                       $("#err" + i + "").html('<div class="alert alert-danger">'+ htmlx.suites[0].items[0].message + '</div>');  
                       
                      }
                    console.log(htmlx.suites[0].itemCount);
                });
            } else {
                $("#res" + i + "").html('<div  class="alert alert-info">Not Selected</div>');
            }
        }
    },

    this.selectAll = function (call) {

        for (var i = 0; i < testCount; i++) {
            $("#chk" + i + "").prop('checked', call);
        }
    },


    this.loadSuiteList = function () {
        console.log("Loading loadSuiteList");
        TestAppUtil.makeJsonRequest(document.location.pathname, {
                action: 'listsuits'
            },
            function (html) {

                $('#basicInfor').html('Test count is' + html.specsCount);
                var template = '<table class="table table-hover">{{#.}}<tr><td> <input type="checkbox" id="chk{{id}}" value="{{url}}"> </td><td>{{name}}<div id="err{{id}}"></div></td><td><div id="res{{id}}"></div></td> </tr>{{/.}}<table>';
                var htmlx = Mustache.to_html(template, html.specs);
                $('#sampleLoc').html(htmlx);
                testCount = html.specsCount;
            });
    };
};