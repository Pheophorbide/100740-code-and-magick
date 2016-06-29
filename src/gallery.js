'use strict';

(function() {
  var ESC = 27;
  var gallery = document.querySelector('.overlay-gallery');
  var closeButton = gallery.querySelector('.overlay-gallery-close');
  var previewContainer = gallery.querySelector('.overlay-gallery-preview');
  var arrowLeft = gallery.querySelector('.overlay-gallery-control-left');
  var arrowRight = gallery.querySelector('.overlay-gallery-control-right');
  var currentNumber = gallery.querySelector('.preview-number-current');
  var totalNumber = gallery.querySelector('.preview-number-total');
  var galleryPictures = [];
  var activePicture = 0;

  var showPictures = function(number) {
    var preview = new Image();
    previewContainer.appendChild(preview);
    gallery.querySelector('img').src = galleryPictures[number].src;
    currentNumber.textContent = number + 1;
    activePicture = number;
  };
  var moveLeft = function() {
    if (activePicture !== 0) {
      activePicture--;
    } else {
      activePicture = galleryPictures.length - 1;
    }
    showPictures(activePicture);
  };

  var moveRight = function() {
    if (activePicture !== galleryPictures.length - 1) {
      activePicture++;
    } else {
      activePicture = 0;
    }
    showPictures(activePicture);
  };

  var _onDocumentKeyDown = function() {
    if (event.keyCode === ESC) {
      _onCloseClick();
    }
  };

  var _onCloseClick = function() {
    gallery.classList.add('invisible');
    arrowRight.removeEventListener('click', moveRight);
    arrowLeft.removeEventListener('click', moveLeft);
    closeButton.removeEventListener('click', _onCloseClick);
    window.removeEventListener('keydown', _onDocumentKeyDown);
  };


  module.exports = {
    //Функция сохраняет массив фотографий

    savePictures: function(pictures) {
      galleryPictures = pictures;
      totalNumber.textContent = galleryPictures.length;
    },

    //Функция Показывает галерею

    showGallery: function(number) {
      gallery.classList.remove('invisible');
      arrowRight.addEventListener('click', moveRight);
      arrowLeft.addEventListener('click', moveLeft);
      closeButton.addEventListener('click', _onCloseClick);
      window.addEventListener('keydown', _onDocumentKeyDown);
      showPictures(number);
    }
  };
})();

