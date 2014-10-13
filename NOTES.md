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

On the application title bar I want to see `RSS Reader | Plain JS Tutorial` and
have the JS bootstrap file, `app.js` included.

I will store the test specifications for end to end testing in `test/e2e/features`
and their name will end in `.spec.js`. So, in the protractor configuration file
I have updated the specs array with the following:

    specs: ['features/**/*.spec.js']

Now that we are green we can start writing the first test. Let's try to open the
browser and check it's title bar. As specified it should contain
`RSS Reader | Plain JS Tutorial`.

The test for it looks like following:

    // test/e2e/features/titlebar.spec.js
    // Tests for the setting application's title
    describe('Applications Home Page', function () {
      it('should have a meaningful title', function () {
        browser.get("http://localhost:8000");

        expect(browser.getTitle()).toEqual('RSS Reader | Plain JS Tutorial');
      });
    });

As you can see from the code, our browser get's connected to `localhost:8000`,
so we need a server to run and listening on that port. This is quite simple
to do using python's `SimpleHTTPServer`:

    python -m SimpleHTTPServer

will give you a server listening by default on 8000 port.

Now, if I run grunt, it will fail (as expected), but with a strange message,
saying that angular could not be found on the page. This is because of the way
we have written the interaction with the browser in the test above. The browser
should be accessed using the driver, which looks like this:

    // ...
    browser.driver.get("http://localhost:8000");
    // ...
    expect(browser.driver.getTitle()).toEqual('RSS Reader | Plain JS Tutorial');
    // ...

Now our test fails with the expected message that the title doesn't match.

Let's create the index.html file with the desired content:

    <!DOCTYPE html>
    <html>
      <head>
        <title>RSS Reader | Plain JS Tutorial</title>
      </head>

      <body>
      </body>
    </html>

Further, I want to test if the entry point of the JS application, `app.js` is
loaded. But first I refactored a bit the code. The final version is below:

    // test/e2e/features/titlebar.spec.js
    // Tests for the setting application's title
    describe('Applications Home Page', function () {

      // make sure the browser is open before each test
      beforeEach(function () {
        browser.driver.get("http://localhost:8000");
      });

      // requirement: title should be "RSS Reader | Plain JS Tutorial"
      it('should have a meaningful title', function () {
        expect(browser.driver.getTitle()).toEqual('RSS Reader | Plain JS Tutorial');
      });

      // requirement: app.js should be loaded
      it('should load the entry point of the JS application, app.js', function() {
        var scriptElement = browser.driver.findElement(By.tagName('script'));
        var appAttribute = scriptElement.getAttribute('src');

        expect(appAttribute).toEqual('http://localhost:8000/app/app.js');
      });
    });

Now, the test fails with the message "NoSuchElement error", which is expected.
Let's fix it:

    <!DOCTYPE html>
    <html>
      <head>
        <title>RSS Reader | Plain JS Tutorial</title>
      </head>

      <body>
        <script src='app/app.js'></script>
      </body>
    </html>

And finally our first feature is fully tested and implemented.

# Step 2 - Create the Layout of the Main Window

I have finished the previous step with two things I which I left open and I
want to speak about now.

First, the file `app/app.js` does not exist but our tests still pass. This is
because I only checked in the test the fact that the file is referenced in the
`index.html` file, but not if it exists. At the time of writing this I don't
know how to do that, so I leave it for now as it is.

The second thing is related to the first somehow. It's not a commonly seen test
to check that a javascript or css file is included in the main html file of the
project. I did that with the intention to learn and show how this is done. I
won't write tests of this kind for the further included files.

Also, before going on I would like to mention that I took the decision to use
jQuery and Bootstrap in this project. I know that this might break the idea of
building this app using plain JS, but I intended to do it by not using any
framework. jQuery is a basically a DOM manipulation tool and not really a
framework. On the other hand, Bootstrap can bring us a better UI experience, so
I decided to use it in this project.

Now, let's go on and see what I want to implement in this step. At the end of
the step my intention is to have the layout of the main window finished.

The main window will be composed from a big container which will wrap up the
rest of the application's content. In this container I want to have on the left
side a menu consisting of icons for the operations which can be done. On the
rest of the page there will be a list of posts in the current selected RSS feed.

In order to select one feed from the list of which a user subscribed to the
following mechanism will be implemented: when the user clicks over the feeds
icon, from the left a dialog will come in with all the feeds on it.

For this step I only want to have the left menu with icons, the main content
with some dummy data and the mechanism described above to access the feeds.

Also important is to say that I want the content of the page to be dynamically
generated using some templates which will be injected using jQuery at the
desired location in the DOM. The templates will be just simple plain HTML files
with no other data injected in them.

## The Main Container

The main container will be a `div` element with the class `row` attached. Let's
implement this starting with a test:


    // layout: a main container with a left menu and a content area
    describe('Main Page Layout', function () {

      // requirement: container is a div with a row class
      it('should have a div container with a row class', function () {
        var container = browser.driver.findElement(By.id('main-container'));
        var theAttribute = container.getAttribute('class');

        expect(theAttribute).toContain('row');
      });
    });

The code above was added to the `test/e2e/features/homepage.spec.js` file after
the tests for including `app.js` in the index.html. This test will fail with 
`NoSuchElement error`.

Fixing it by addin the following line into the `body` tag of the index.html file:

   <div id='main-container' class='row'></div>

There are several things to mention about the test code: I search the main
container div by `id` since there can be many divs on the page and I need only
the one that is our main container. Second, the expectation checks if the string
'row' is *contained* in the class attribute since there could be many other
classes added to the div.

Now that we are green, let's implement the subcontainers of the main container.
I want this to be done dynamically from JS since it might be changed in the
future. So it's time to write our first JS code.

I want to model the main content of the app as a window which can have elements
on it. These elements could be different type of widgests or even another
window. I could create the main-container from JS as a window, but I wanted it
to be in the index.html file since it will exist for any application.

So, a window will have a content area and elements on it. The content area is
the HTML element itself that hosts the window and the elements are the widgets.
So the class will have a function to add elements on it.

In order to test drive implement this requirements we need karma (these are
unit tests and not e2e tests). So, start by adding a new task to grunt that
will run karma. In the `Gruntfile.js` add the following code:

    // ...
    // npm tasks
    // ...
    grunt.loadNpmTasks('grunt-karma');
    // ...
    // local tasks
    // ...
    grunt.registerTask('unit', ['karma']);
    // ,,,
    grunt.registerTask('test', ['e2e', 'unit']);

The test fails since grunt-karma is not installed;

    npm install grunt-karma --save-dev

After installing grunt-karma a `karma` target should be created:

    karma: {
      unit: {
        options: {
          files: ['test/unit/**/*']
        }
      }
    }

And now create the testing file for our window class at test/unit/window.

There were several things that I had to do in order to make the unit test work
as desired. Check the git "Unit test configuration" check in to see what has
been done.
