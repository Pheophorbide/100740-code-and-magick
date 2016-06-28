'use strict';

(function() {
  var galleryContainer = document.querySelector('.overlay-gallery');
  var closeButton = gallaryContainer.querySelector('.overlay-gallery-close');
  var galleryPictures = [];

  var showGallery = function(pictures){
    galleryPictures = pictures;
    galleryContainer.classList.remove('invisible');
  };

  var hideGallery = function(pictures){
    galleryContainer.classList.add('invisible');
  };

})();
