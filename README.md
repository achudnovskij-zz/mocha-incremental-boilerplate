# Mocha + Karma Incremental Boilerplate

This boilerplate projects allows you simply setup unit testing environment for your JavaScript Web project. 
## Why to use this example
Compared to the other Mocha/Karma examples this code adds **2 features which improve and speed up TDD** routines:
- **In Browser Debugging** - Tell Mocha to Load files required for the current 'grep' query only. <br/> By default Mocha will load all the files and filter out tests before running them. <br/> This example shows how to to load required files only any subsequent test execution. <br/> 
Benefits of this approach:
   - When debugging 1/2 files reduces time Mocha takes to start test run. **It can save ~5 seconds per run on suite with 50+ files**
   - **Makes required files easier to be found in browser debugging tools**<br/><br/>
- **Incremental test-as-you-save runs with Grunt + Watcher + Karma** <br/>
This example shows how to run tests for an individual module when the module or corresponding test are saved.
Benefits:
  - **Makes test-as-you-save feedback extremely fast**. You need tens of seconds to run all the tests when a single line of code changes. This improvement eliminates this waste of time.
  - Allows to see results for the affected module/test only in the terminal window. 

## How to use

### Project prerequisite
- Functional code and tests implemented as [AMD modules](http://requirejs.org/docs/whyamd.html). This project uses [requirejs](http://requirejs.org/). Project can be adopted for alternative AMD loaders.
- [Mocha](http://mochajs.org/) as Test Suite library. [Jasmine](http://jasmine.github.io/) can work similar way but it more complicated to set up with requirejs.
- Use [Karma](http://karma-runner.github.io/0.12/index.html) runner to run tests as a part of CI build. As of now Mocha has [solutions to run in PhantomJS](https://github.com/metaskills/mocha-phantomjs) without Karma. I didn't try that option.
- Use [Grunt](http://gruntjs.com/) as build system. There is no significant difference in how tests are run in [Gulp](http://gulpjs.com/). So the project can be adopted for Gulp as well.

### Install prerequisites

- [Nodejs](http://nodejs.org/download/) including npm
- [Grunt](http://gruntjs.com/getting-started) and [Grunt-cli](http://gruntjs.com/getting-started#installing-the-cli)
- [Bower](http://bower.io/#install-bower)

### Pull project dependencies
- Install npm dependencies (Karma, watcher): 
```
cd /mocha-incremental-boilerplate
npm install
```
- Install bower dependencies (Karma, watcher): 
```
cd /mocha-incremental-boilerplate
bower install
```

### Run tests in browser
1. Set up you local HTTP server to server `/mocha-incremental-boilerplate`. For example from `http://localhost:88`
2. Open test suites file: `http://localhost:88/spec/spec-runner.html` <br/>
By default all suites are loaded.
3. Select one of tests/files. Browser will show `http://localhost:88/spec/spec-runner.html?grep=<test suite name>` <br/>
At this moment all suites are still loaded, even though you need to run one suite only.
4. Each subsequent refresh, requires suite/dependency files will be loaded only. <br/>
So you'll need less time to test a minor change or run the debugger to the required breakpoint.

#### How it works?
Project contains  `mocha-modules-cache.js` file which does the following:
1. When tests are run - keep track of the module names which contained the tests which were actually run.
2. On next test run - check if it has cache on module names for the current 'grep' query. 
   - If the cache is in place - use it to load the rewquired files only.
   - Otherwise - go to step 1. and collect the cache.

### Incrementally run tests in Grunt
1. Ensure grunt and node_modules are installed
2. Start grunt watch task 
```
cd /mocha-incremental-boilerplate
grunt karma:incremental
```
3. Wait for watch:karma_warmup task to be completed.
4. Edit one of functional or test files (knapsack or quicksort algorithms) 
5. Tests for the single edited file should be run in the terminal

#### How it works?
1. This approach requires certain conventions to work
    - Tests are truly `unit` level tests: Test module `functionCode-test.js` should test `functionCode.js` module only. If the test file implicitly test other modules, changes in those will not lead to test to be executed.
    - Spec suite and functional modules have mirror folder structure. relative path to `functionCode.js` under `/src` folder should be exactly the same as `functionCode-tests.js` under `/spec/suites`
2. When `grunt:watch` is run it immidiatelly starts `karma` with your browser (phantomjs by default)
3. When any functional or test file is changed watcher does 2 things:
    - Writes the name of the changed file to a temporary module
    - Sends karma a command to rerun the tests
4. When karma reruns the suite-runner.js, the latter uses temporary file to define which test modules to actually load. So the changed module is loaded only.



