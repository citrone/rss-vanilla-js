# RSS Reader Application

I have to admit that my knowledge in plain Javascript is low at the moment of
writing this article. With the desire of knowing and learning much about this
programming language I decided to build an application that is complex enough
to help me become familiar with JS.

The application I want to build is a RSS reader. It should display on it's main
screen a list of feeds the user subscribed to and for the selected feed all
the last posts in that feed.

The application should be built in a BDD/TDD manner wiht emphasis on both, e2e
and unit testing.

# Tools

This chapter describes what are the tools that I want to use while building
this application.

## Grunt

As a task runner I want to user Grunt. This will be responsible with launching
the tests, calling build scripts etc.

## Build

The files should be minified and compacted and the result file should be served
to the server. All theses actions will be done using a set of scripts that will
perform the requested tasks. These scripts will be written for UNIX like systems
and also for Windows.

## NPM

Some of the packages needed can be installed using Node's npm utility. For these
the project will contain a `package.json` file containing all the dependencies
installed with npm.

## Bower

All the client side frameworks and tools used will be installed using bower. In
the same mannner as for the npm, a `bower.json` file will be created handling
the dependencies of the project. Bower can also be configurated to store the
downloaded dependencies in the `vendor` folder, since this is the place I want
to have them.

# Testing

As said before, both end to end (e2e) and unit tests will be performed during
building the project.

## End to End Testing

The tests will be carried out using Protractor.

## Unit Testing

Will be done using Jasmine and Karma. Also Sinon will be used for mocking parts
of the code that are not implemented or not under test.

# Application Folder Structure

The folder structure is the one checked in in the `Initial checkin` of the
project where also the empty version of this file is found.

The `build` folder contains all the scripts needed for building the project.
They are responsible for minifying the project, for creating everything needed
to deploy the project.

The `dist` folder contains the shippable version of the application. Should be
enough to deploy the content of this folder to the web server and the application
has to be up and running.

The `src` folder contains all the source files of the application. Additional
subfolders will be created in it while developing the project as required to
have a good structure for the files that are part of it. Basically the "feature
based" approach will be used in structuring the folders, meaning that in each
folder will be the files belonging to an application feature. As an example, for
the navigation feature, there will be a navigarion folder containing all the
files necessary for it no matter that they will be templates or javascript code.

The `test` folder has the same requirements as described for the `src` folder.

The `vendor` folder contains all the frameworks and tools we are using in our
application and are delivered by other people. One I can see from now that I
will use is jQuery.

# Step 0 - Configure Grunt

## Create the Gruntfile.js

Open a terminal and issue `grunt` at command prompt. An error message should
appear:

    Fatal error: Unable to find local grunt.

This is because we do not have grunt installed. Grunt is installed via `npm` so
issue the command:

    npm install grunt --save-dev

This should install grunt for this project and save it in the `package.json`
file.

Note: grunt-cli should be installed globally on the machine you are using.

After installing local grunt, the error changes to:

    A valid Gruntfile could not be found.

So, we have to create a `Gruntfile.js`:

    touch Gruntfile.js

## Creating a Default Task

Now that we have the Gruntfile, grunt will complain about missin a default task.
We should add one using the following code:

    // Gruntfile.js
    // The configuration file for grunt task runner.
    module.exports = function (grunt) {
      grunt.registerTask('default', []);
    };

As you can see we follow the TDD requirements to implement only the code that
makes our tests pass. Now we are green by issuing `grunt` there are no errors,
but we have an empty default task, so basically we do nothing.

## Start Protractor

I want to create an e2e test task which should run Protractor to load the
index.html file in the browser.

Start with loading the `grunt-protractor-runner` in the Gruntfile, by adding the
following code just above the part that registers the default task:

    grunt.loadNpmTasks('grunt-protractor-runner');

Issuing `grunt` now will fail because we do not have `grunt-protractor-runner`
installed. So, just install it:

    npm install grunt-protractor-runner --save-dev

Now we are green, but we have no test task created, so let's create one. See
the code in the "Configured grunt" check in in git to see how running protractor
was configured. We are still red since we do not have any spec written yet.

# Step 1 - Bootstrap the Application

In this step I want to create the entry point of the application which should
be an `index.html` file.

On the application title bar I want to see `RSS Reader | AngularJS Tutorial` and
have the JS bootstrap file, `app.js` included.

