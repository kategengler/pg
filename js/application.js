Pg = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Pg.Store = DS.Store.extend({
  adapter: 'DS.LSAdapter'
});

Pg.Router.map(function() {
  this.route('index', {path: '/'});
  this.resource('galleries', function(){
    this.route('new');
    this.route('show', {path: '/:gallery_id'})
  });
  this.resource('photo', {path: '/photos/:photo_id'});
});

Pg.IndexRoute = Ember.Route.extend({
   redirect: function(){
     this.transitionTo('galleries.index');
   }
});

Pg.GalleriesIndexRoute = Ember.Route.extend({
  model: function(){
    return Pg.Gallery.find();
  }
});

Pg.GalleriesNewRoute = Ember.Route.extend({
  model: function(){
    return Pg.Gallery.createRecord();
  }
});

Pg.PhotoController = Ember.ObjectController.extend({
  edit: function(){
    this.set('isEditing', true);
  },
  doneEditing: function(){
    this.get('model').save();
    this.set('isEditing', false);
  },
  delete: function(){
    var photo = this.get('model');
    photo.deleteRecord();
    this.store.commit();
  }
});

Pg.GalleriesNewController = Ember.ObjectController.extend({
  importPhotos: function(){
    var url, i, imageName, photo;

    this.set('importingPhotos', true);
    url = this.get('url');

    // This is a sad hack for demo purposes:
    // This imports photos based on knowing their naming scheme
    // and the number of photos. In a system with a real backend,
    // you'd upload photos then use their URLs.

    for (i = 1; i <= this.get('numPhotos'); i++) {
      imageName = Pg.Helpers.pad(i, 2);

      photo = Pg.Photo.createRecord({
        thumbnailSrc: "%@/thumbs/%@.jpg".fmt(url, imageName),
        originalSrc: "%@/%@.jpg".fmt(url, imageName),
        gallery: this.get('content'),
        description: this.get('defaultDescription'),
        byline: this.get('defaultByline')
      });
      photo.save();
      this.get('photos').pushObject(photo);
    }

    // Timer to simulate delay from server requests
    Ember.run.later(this, function(){
      this.set('importingPhotos', false)
    }, 500);
  },
  createGallery: function(){
    this.get('model').save();
    this.transitionToRoute("galleries.index");
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