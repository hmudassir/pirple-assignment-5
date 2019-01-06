var assert = require('assert');

var lib = require('./../app/lib');

var _app = {};

_app.tests = {
    'unit': {}
};

_app.tests.unit['lib._floor should return a number'] = function(done){
    var val = lib._floor(2.23);
    assert.equal(typeof(val), 'number');
    done();
}

_app.tests.unit['lib._floor should return 2'] = function(done){
    var val = lib._floor(2.23);
    assert.equal(val, 2);
    done();
}

_app.tests.unit['lib._floor should return 3'] = function(done){
    var val = lib._floor(2.23);
    assert.equal(val, 3);
    done();
};

_app.tests.unit['lib._ceil should return a number'] = function(done){
    var val = lib._ceil(2.23);
    assert.equal(typeof(val), 'number');
    done();
}

_app.tests.unit['lib._ceil should return 2'] = function(done){
    var val = lib._ceil(2.23);
    assert.equal(val, 2);
    done();
}

_app.tests.unit['lib._ceil should return 3'] = function(done){
    var val = lib._ceil(2.23);
    assert.equal(val, 3);
    done();
};

// Count all the tests
_app.countTests = function(){
    var counter = 0;
    for(var key in _app.tests){
       if(_app.tests.hasOwnProperty(key)){
         var subTests = _app.tests[key];
         for(var testName in subTests){
            if(subTests.hasOwnProperty(testName)){
              counter++;
            }
         }
       }
    }
    return counter;
  };
  
  // Run all the tests, collecting the errors and successes
  _app.runTests = function(){
    var errors = [];
    var successes = 0;
    var limit = _app.countTests();
    var counter = 0;
    for(var key in _app.tests){
       if(_app.tests.hasOwnProperty(key)){
         var subTests = _app.tests[key];
         for(var testName in subTests){
            if(subTests.hasOwnProperty(testName)){
              (function(){
                var tmpTestName = testName;
                var testValue = subTests[testName];
                // Call the test
                try{
                  testValue(function(){
  
                    // If it calls back without throwing, then it succeeded, so log it in green
                    console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                    counter++;
                    successes++;
                    if(counter == limit){
                      _app.produceTestReport(limit,successes,errors);
                    }
                  });
                } catch(e){
                  // If it throws, then it failed, so capture the error thrown and log it in red
                  errors.push({
                    'name' : testName,
                    'error' : e
                  });
                  console.log('\x1b[31m%s\x1b[0m',tmpTestName);
                  counter++;
                  if(counter == limit){
                    _app.produceTestReport(limit,successes,errors);
                  }
                }
              })();
            }
         }
       }
    }
  };
  
  
  // Product a test outcome report
  _app.produceTestReport = function(limit,successes,errors){
    console.log("");
    console.log("--------BEGIN TEST REPORT--------");
    console.log("");
    console.log("Total Tests: ",limit);
    console.log("Pass: ",successes);
    console.log("Fail: ",errors.length);
    console.log("");
  
    // If there are errors, print them in detail
    if(errors.length > 0){
      console.log("--------BEGIN ERROR DETAILS--------");
      console.log("");
      errors.forEach(function(testError){
        console.log('\x1b[31m%s\x1b[0m',testError.name);
        console.log(testError.error);
        console.log("");
      });
      console.log("");
      console.log("--------END ERROR DETAILS--------");
    }
    console.log("");
    console.log("--------END TEST REPORT--------");
    process.exit(0);
  
  };

  // Run the tests
_app.runTests();