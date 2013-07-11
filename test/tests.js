Pg.rootElement = '#ember-testing';
Pg.setupForTesting();
Pg.injectTestHelpers();

Pg.reopen({
  store: 'DS.FixtureAdapter'
});

module("Integration tests", {
  setup: function() {
    Pg.reset();
    Ember.run(Pg, Pg.advanceReadiness);
  }
});

test("something", function(){
  ok(true, "tests should work");
});