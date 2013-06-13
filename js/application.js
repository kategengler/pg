Pg = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Pg.Store = DS.Store.extend({
  adapter: 'DS.LSAdapter'
});

Pg.Router.map(function() {
  this.resource('galleries', { path: '/' }, function(){
    this.route('new')
  });
});

Pg.GalleriesIndexRoute = Ember.Route.extend({
  model: function(){
    return Pg.Gallery.find();
  }
});

Pg.GalleriesNewRoute = Ember.Route.extend({
  model: function(){
    return Pg.Gallery.createRecord()
  }
});

Pg.Gallery = DS.Model.extend({
  title: DS.attr('string'),
//  photos: DS.hasMany('Pg.Photo'),
  date: DS.attr('date')
});

Pg.Gallery.FIXTURES = [
  {id: 1, title: 'Planting Fields', photos: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27], date: new Date()}
];