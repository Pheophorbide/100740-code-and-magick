'use strict';

var gallery = require('./gallery');

(function() {
  var pictures = document.querySelectorAll('.photogallery-image img');
  var galleryContainer = document.querySelector('.photogallery');
  var picturesArr = Array.prototype.slice.call(pictures);
  var picturesArrSrc = picturesArr.map(function(pic) {
    return pic.src.replace(location.origin, '');
  });

  galleryContainer.addEventListener('click', function(event) {
    var activeNumber = picturesArr.indexOf(event.target);
    var currentNumber;
    event.preventDefault();
    if (activeNumber >= 0) {
      currentNumber = activeNumber + 1;
      var hash = '/img/screenshots/' + currentNumber + '.png';
      location.hash = 'photo' + hash;
      gallery.showGallery(activeNumber);
    }
  });

  gallery.savePictures(picturesArrSrc);
  gallery.onHashChange();
  window.addEventListener('hashchange', gallery.onHashChange);


})();
