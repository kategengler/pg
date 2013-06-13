Pg = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Pg.Store = DS.Store.extend({
  adapter: 'DS.LSAdapter'
});

Pg.Router.map(function() {
  this.resource('gallery', function(){
    this.route('new');
    this.route('show', {path: '/:gallery_id'})
  });
});

Pg.ApplicationRoute = Ember.Route.extend({
   redirect: function(){
     this.transitionTo('gallery.index');
   }
});

Pg.GalleryIndexRoute = Ember.Route.extend({
  model: function(){
    return Pg.Gallery.find();
  }
});

Pg.GalleryNewRoute = Ember.Route.extend({
  model: function(){
    return Pg.Gallery.createRecord();
  }
});

Pg.GalleryNewController = Ember.ObjectController.extend({
  importPhotos: function(){
    var url = this.get('url');
    for(var i=1; i < this.get('numPhotos'); i++){
      var thumbnailSrc = "%@/thumbs/%@.jpg".fmt(url, Pg.Helpers.pad(i, 2));
      var photo = Pg.Photo.createRecord({
        thumbnailSrc: thumbnailSrc,
        originalSrc: "%@/%@.jpg".fmt(url, Pg.Helpers.pad(i, 2)),
        gallery: this.get('content')
      });
      photo.save();
      this.get('photos').pushObject(photo);
    }
  },
  createGallery: function(){
    this.get('content').save();
    this.transitionToRoute("gallery.index");
  }

});

Pg.Gallery = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  photos: DS.hasMany('Pg.Photo'),
  date: DS.attr('date')
});

Pg.Photo = DS.Model.extend({
  thumbnailSrc: DS.attr('string'),
  originalSrc: DS.attr('string'),
  gallery: DS.belongsTo('Pg.Gallery'),
  byline: DS.attr('string'),
  description: DS.attr('string')
});

Pg.Helpers = {
  pad: function(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
};