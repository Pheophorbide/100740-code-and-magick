'use strict';

var gallery = require('./gallery');

(function() {
  var pictures = document.querySelectorAll('.photogallery-image img');
  var galleryContainer = document.querySelector('.photogallery');
  var picturesArr = Array.prototype.slice.call(pictures, function(pic) {
    return pic.src;
  });


  galleryContainer.addEventListener('click', function(event) {
    var activeNumber = picturesArr.indexOf(event.target);
    if (activeNumber >= 0) {
      event.preventDefault();
      gallery.showGallery(activeNumber);
    }
  });

  gallery.savePictures(picturesArr);

})();
