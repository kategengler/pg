## Example Photo Gallery app to demonstrate Ember.js

* Used in presentation at jQuery Conf Portland 2013 ([Slides](http://codeallday.com/jquery-portland-2013-ember-slides))


## Notices for using the app:
* Here is an example URL to use to "import" a Gallery: https://dl.dropboxusercontent.com/u/38141173/galleries/planting_fields, has 27 Photos

* *Uses local storage; there is no backend.* To clear the data, in your browser console, run:
```javascript
  window.localStorage.clear()
``` 
Then reload your browser.


## Development

### Tests
* To run tests, open tests/index.html in your browser. Be sure all javascripts included in the app are included there, and be sure the compiled templates.js is up-to-date.

### Makes use of: 
* [ember.js](https://github.com/emberjs/ember.js)
* [ember-data](https://github.com/emberjs/data/)
* [Ember Local Storage Adapter](https://github.com/rpflorence/ember-localstorage-adapter)
* [Fontello](http://fontello.com/)
* [Zurb Foundation](https://github.com/zurb/foundation)
* [ember-tools](https://github.com/rpflorence/ember-tools)
* [QUnit](http://qunitjs.com/)


### Template Compilation
* Templates are compiled using [ember-tools](https://github.com/rpflorence/ember-tools)
```bash
  ember precompile -d templates/ -f js/templates.js
```

### CSS Changes

* Uses the CSS Framework Zurb Foundation, to generate css from the scss files:
```bash
  sass --watch scss:css
```
