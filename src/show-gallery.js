'use strict';

var Gallery = require('./gallery');

(function() {
  var pictures = document.querySelectorAll('.photogallery-image img');
  var galleryContainer = document.querySelector('.photogallery');
  var picturesArr = Array.prototype.slice.call(pictures);
  var galleryOverlayContainer = document.querySelector('.overlay-gallery');
  var galleryElement = new Gallery(galleryOverlayContainer);
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
      galleryElement.showGallery(activeNumber);
    }
    return false;
  });

  galleryElement.savePictures(picturesArrSrc);
  galleryElement.onHashChange();
  window.addEventListener('hashchange', galleryElement.onHashChange);
})();
