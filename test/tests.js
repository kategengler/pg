Pg.rootElement = '#ember-testing';
Pg.setupForTesting();
Pg.injectTestHelpers();

function importGallery(options) {
  var defaults = {title: 'Planting Fields',
                  url: 'https://dl.dropboxusercontent.com/u/38141173/galleries/planting_fields',
                  numPhotos: '3'};
  var opts = $.extend({}, defaults, options);
  return visit('/galleries/new')
    .fillIn('.js-title-input', opts.title)
    .fillIn('.js-url-input', opts.url)
    .fillIn('.js-num-photos-input', opts.numPhotos)
    .click("button:contains('Import Photos')");
}

module("Integration tests", {
  setup: function() {
    window.localStorage.clear();
    Pg.reset();
    Ember.run(Pg, Pg.advanceReadiness);
  }
});

test("Adding a gallery should have page subheading", function() {
  visit('/')
  .click("a:contains('Add a gallery')")
  .then(function(){
    ok(find(":contains('Add a gallery!')").length, "Should have page subheading");
  });
});

test("Importing a gallery should show spinner on Import button", function(){
  importGallery({numPhotos: 2})
    .then(function(){
      click("button:contains('Import Photos')");
      ok(find('.icon-spin5.animate-spin').length, "The button should spin when clicked");
      return wait();
    })
    .then(function(){
      ok(find("button:contains('Import Photos')").length, "The button should revert to Import Photos when done");
    });
});

test("Importing a gallery should display photos", function(){
   importGallery()
     .then(function(){
        equal(find('img').length, 3, "3 Photos should display")
     });
});

test("Can delete photo from imported photos", function(){
   importGallery({numPhotos: 3})
    .click("a.icon-cancel:first")
    .then(function(){
      equal(find('img').length, 2, "2 Photos should display, 1 having been removed");
      return wait();
    })
    .click("button:contains('Create Gallery')")
    .click("a:contains('Planting Fields')")
    .then(function(){
      equal(find('a img.th').length, 2, "Only 2 photos should have saved");
    });
});

test("Creating a gallery should create it and display the galleries", function(){
  var galleryTitle = "Gallery title in test";
  importGallery({title: galleryTitle})
    .click("button:contains('Create Gallery')")
    .then(function(){
      ok(find("a:contains('"+galleryTitle+"')").length, "Should have link to gallery with thumbnail");
    });
});

test("Creating a gallery should create it and be correct", function(){
  var galleryTitle = "Gallery title in test for other values";
  importGallery({title: galleryTitle, numPhotos: 5})
    .click("button:contains('Create Gallery')")
    .click("a:contains('"+galleryTitle+"')")
    .then(function(){
      equal(find('a img.th').length, 5, "The number of imported photos should display");
    });
});

