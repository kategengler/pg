Pg.rootElement = '#ember-testing';
Pg.setupForTesting();
Pg.injectTestHelpers();

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
  visit('/galleries/new')
    .fillIn('.js-title-input', 'Planting Fields')
    .fillIn('.js-url-input', 'https://dl.dropboxusercontent.com/u/38141173/galleries/planting_fields')
    .fillIn('.js-num-photos-input', '2')
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
   visit('/galleries/new')
     .fillIn('.js-title-input', 'Planting Fields')
     .fillIn('.js-url-input', 'https://dl.dropboxusercontent.com/u/38141173/galleries/planting_fields')
     .fillIn('.js-num-photos-input', '3')
     .click("button:contains('Import Photos')")
     .then(function(){
        equal(find('img').length, 3, "3 Photos should display")
     });
});