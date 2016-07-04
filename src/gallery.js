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

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    var self = this;
    this.showPictures = function(number, string) {
      var preview = new Image();
      previewContainer.appendChild(preview);
      if (string !== 0) {
        this.element.querySelector('img').src = location.origin + '/' + string;
      }
      currentNumber.textContent = number;
      activePicture = number;
    };
    this.moveLeft = function() {
      if (activePicture === 1) {
        activePicture = self.galleryPictures.length;
      } else {
        activePicture--;
      }
      location.hash = 'photo' + '/img/screenshots/' + activePicture + '.png';
    };

    this.moveRight = function() {
      if (activePicture === self.galleryPictures.length) {
        activePicture = 1;
      } else {
        activePicture++;
      }
      location.hash = 'photo' + '/img/screenshots/' + activePicture + '.png';
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
      window.removeEventListener('hashchange', self._onHashChange);
      location.hash = '';
    };

    this.savePictures = function(pictures) {
      self.galleryPictures = pictures;
      totalNumber.textContent = self.galleryPictures.length;
    };

    this._onHashChange = function() {
      self._restoreFromHash();
    };
    this._restoreFromHash = function() {
      if (location.hash) {
        var hash = location.hash.match(/#photo\/(\S+)/);
        if (hash !== null) {
          self.showGallery(activePicture, hash[1]);
        } else {
          self._onCloseClick();
        }
        console.log(activePicture);
      }
    };

    this.showGallery = function(number, string) {
      gallery.classList.remove('invisible');
      arrowRight.addEventListener('click', self.moveRight);
      arrowLeft.addEventListener('click', self.moveLeft);
      closeButton.addEventListener('click', self._onCloseClick);
      window.addEventListener('keydown', self._onDocumentKeyDown);
      self.showPictures(number, string);
      window.addEventListener('hashchange', self._onHashChange);
    };
  };

  module.exports = new Gallery();

})();

