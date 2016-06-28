'use strict';

(function() {
  var gallery = document.querySelector('.overlay-gallery');
  var closeButton = gallery.querySelector('.overlay-gallery-close');
  var pictures = document.querySelectorAll('.photogallery-image img');
  var photoContainer = document.querySelector('.photogallery');
  var previewContainer = gallery.querySelector('.overlay-gallery-preview');
  var arrowLeft = gallery.querySelector('.overlay-gallery-control-left');
  var arrowRight = gallery.querySelector('.overlay-gallery-control-right');
  var galleryActivePicture = 0;

  var setGalleryPicture = function(pictureNumber) {
    gallery.querySelector('img').src = pictures[pictureNumber].src;
  };

  var setActivePicture = function(event) {
    event.preventDefault();
    var target = event.target;
    if (target.tagName === 'IMG') {
      for (var i = 0; i < pictures.length; i++) {
        if (pictures[i] === target) {
          galleryActivePicture = i;
        }
      }
    }
    showGallery(galleryActivePicture);
  };

  var moveLeft = function() {
    if (galleryActivePicture > 0) {
      galleryActivePicture--;
    } else {
      galleryActivePicture = pictures.length - 1;
    }
    setGalleryPicture(galleryActivePicture);
  };

  var showGallery = function(pictureNumber) {
    gallery.classList.remove('invisible');
    var preview = new (Image);
    previewContainer.appendChild(preview);
    setGalleryPicture(pictureNumber);
    closeButton.addEventListener('click', hideGallery);
    window.addEventListener('keydown', function(event) {
      if (event.keyCode === 27) {
        hideGallery();
      }
    });
  };

  var hideGallery = function() {
    gallery.classList.add('invisible');
  };

  var moveRight = function() {
    if (galleryActivePicture < pictures.length - 1) {
      galleryActivePicture++;
    } else {
      galleryActivePicture = 0;
    }
    setGalleryPicture(galleryActivePicture);
  };

  photoContainer.addEventListener('click', setActivePicture);

  arrowRight.addEventListener('click', moveRight);

  arrowLeft.addEventListener('click', moveLeft);
})();
