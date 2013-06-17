Example Photo Gallery app to demonstrate Ember

- Uses local storage; there is no backend. To clear the data, in your browser console, run:
```javascript
  window.localStorage.clear()
```
Then reload your browser.

Example Url to use for a Gallery:

https://dl.dropboxusercontent.com/u/38141173/galleries/planting_fields

Has 27 Photos

Uses:
* Ember
* Ember Data
* Handlebars
* jQuery
* Ember Localstorage Adapter
* Fontello
* Zurb Foundation


* Templates are compiled using ember-tools
```bash
  ember precompile -d templates/ -f js/templates.js
```

* Uses the CSS Framework Foundation Zurb
```bash
  sass --watch scss:css
```