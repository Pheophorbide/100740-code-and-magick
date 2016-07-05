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
  var activePicture = 0;
  var galleryPictures = [];


  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    var self = this;
    this.showPictures = function(number) {
      var preview = new Image();
      previewContainer.appendChild(preview);
      this.element.querySelector('img').src = galleryPictures[number];
      currentNumber.textContent = number + 1;
      activePicture = number;
    };

    this.moveLeft = function() {
      if (activePicture !== 0) {
        activePicture--;
      } else {
        activePicture = galleryPictures.length - 1;
      }
      location.hash = 'photo' + galleryPictures[activePicture];
    };

    this.moveRight = function() {
      if (activePicture !== galleryPictures.length - 1) {
        activePicture++;
      } else {
        activePicture = 0;
      }
      location.hash = 'photo' + galleryPictures[activePicture];
    };

    this. _onDocumentKeyDown = function() {
      if (event.keyCode === ESC) {
        self._onCloseClick();
      }
    };

    this._onCloseClick = function() {
      self.element.classList.add('invisible');
      arrowRight.removeEventListener('click', self.moveRight);
      arrowLeft.removeEventListener('click', self.moveLeft);
      closeButton.removeEventListener('click', self._onCloseClick);
      window.removeEventListener('keydown', self._onDocumentKeyDown);
      location.hash = '';
    };

    this.savePictures = function(pictures) {
      galleryPictures = pictures;
      totalNumber.textContent = galleryPictures.length;
      return galleryPictures;
    };

    this.onHashChange = function() {
      if (location.hash) {
        var hash = window.location.hash;
        var regExp = hash.match(/#photo\/(\S+)/);
        if (!regExp) {
          return;
        }
        var regExpSrc = '/' + regExp[1];
        var photoIndex = galleryPictures.indexOf(regExpSrc);
        if (photoIndex !== -1) {
          self.showGallery(photoIndex);
        } else {
          self._onCloseClick();
        }
      }
    };

    //Функция Показывает галерею

    this.showGallery = function(number) {
      this.element.classList.remove('invisible');
      arrowRight.addEventListener('click', self.moveRight);
      arrowLeft.addEventListener('click', self.moveLeft);
      closeButton.addEventListener('click', self._onCloseClick);
      window.addEventListener('keydown', self._onDocumentKeyDown);
      self.showPictures(number);
    };
  };

  module.exports = new Gallery();

})();
