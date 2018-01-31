/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('has a url defined that is not empty', function() {
           allFeeds.forEach(function(obj){
             expect(obj.url).toBeDefined();
             expect(obj.url.length).not.toBe(0);
           });
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has a name defined that is not empty', function() {
           allFeeds.forEach(function(obj){
             expect(obj.name).toBeDefined();
             expect(obj.name.length).not.toBe(0);
           });
         });

    });


    /* A test suite named "The menu" */
    describe('The menu', function() {

      beforeEach(function() {
        menu = document.querySelector('.menu-icon-link');
        body = document.body;
      });

      /* A test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
        it('is hidden on page load', function() {
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });

       /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('shows when clicked and hides when clicked again', function() {
          menu.click();
          expect(body.classList.contains('menu-hidden')).toBe(false);
          menu.click();
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });
      });

    /* A test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        var feedEle;
        beforeEach(function(done) {
          feedEle = document.querySelector('.feed');
          loadFeed(0, done);
        });
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         it('should load the initial feed and have an entry', function() {
           var feedChildren = feedEle.children;
           var containsEntry = false;
           for (var i = 0; i < feedChildren.length; i++ ) {
             if (feedChildren[i].classList.contains('entry-link')) {
               containsEntry = true;
               break;
             }
           }
           expect(containsEntry).toBeTruthy();
         });


    });

    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      var oldFeed, newFeed, ofFC, nfFC;

      /* reload the default feed as the previous tests will load the second feed, this makes it easier to test */
      beforeAll(function(done) {
        loadFeed(0);
        /* The querySelect seems to return and HTMLCollection which is love so cannot compare directly */
        oldFeed = document.querySelector('.feed');
        /* Take the first element out of the collection to compare differences */
        ofFC = oldFeed.firstElementChild;
        /* console log for debugging to see what is returned as the MDN doesn't refer the querySelector as returning an HTMLCollection */
//        console.log('oldFeed =' + oldFeed);
//        console.log(ofFC);
        done();
      });
      /* load the first feed for comparison */
      beforeEach(function (done) {
        loadFeed(1,done);
      });
      /* A test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       it('should load a new feed and should have new content', function() {
         newFeed = document.querySelector('.feed');
         nfFC = newFeed.firstElementChild;
//         console.log('newFeed =' +newFeed);
//         console.log(nfFC);
         expect(ofFC).toBeDefined();
         expect(ofFC === nfFC).toBeFalsy();
       });
    });

}());
