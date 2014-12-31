# Mocha + Karma Incremental Boilerplate

This boilerplate projects allows you simply setup unit testing environment for your JavaScript Web project. 
## Why to use this example
Compared to the other Mocha/Karma examples this code adds **2 features which improve and speed up TDD** routines:
- **In Browser Debugging** - Tell Mocha to Load files required for the current 'grep' query only. <br/> By default Mocha will load all the files and filter out tests before running them. <br/> This example shows how to to load required files only any subsequent test execution. <br/> 
Benefits of this approach:
   - When debugging 1/2 files reduces time Mocha takes to start test run. **It can save ~5 seconds per run on suite with 50+ files**
   - **Makes required files easier to be found in browser debugging tools**
- **Incremental test-as-you-save runs with Grunt + Watcher + Karma** <br/>
This example shows how to run tests for an individual module when the module or corresponding test are saved.
Benefits:
  - **Makes test-as-you-save feedback extremely fast**. You need tens of seconds to run all the tests when a single line of code changes. This improvement eliminates this waste of time.
  - Allows to see results for the affected module/test only in the terminal window. 

## How to use
This repository contains the boilerplate project code and configuration only. So it reqiuires some prerequisites to be installed:
- [Nodejs](http://nodejs.org/download/) including npm
- [Grunt](http://gruntjs.com/getting-started) and [Grunt-cli](http://gruntjs.com/getting-started#installing-the-cli)
- [Bower](http://bower.io/#install-bower)

Then set up the boilerplate project:
- Install npm dependencies (Karma, watcher): 
```
cd /mocha-incremental-boilerplate
npm install
```
