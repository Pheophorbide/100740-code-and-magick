'use strict';

(function() {



  var Gallery = function(gallery) {
    this.gallery = gallery;
    this.ESC = 27;
    this.closeButton = this.gallery.querySelector('.overlay-gallery-close');
    this.previewContainer = this.gallery.querySelector('.overlay-gallery-preview');
    this.arrowLeft = this.gallery.querySelector('.overlay-gallery-control-left');
    this.arrowRight = this.gallery.querySelector('.overlay-gallery-control-right');
    this.currentNumber = this.gallery.querySelector('.preview-number-current');
    this.totalNumber = this.gallery.querySelector('.preview-number-total');
    this.activePicture = 0;
    this.galleryPictures = [];

    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this.savePictures = this.savePictures.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
    this.showGallery = this.showGallery.bind(this);
  };

  Gallery.prototype.showPictures = function(number) {
    var preview = new Image();
    this.previewContainer.appendChild(preview);
    this.gallery.querySelector('img').src = this.galleryPictures[number];
    this.currentNumber.textContent = number + 1;
    this.activePicture = number;
  };

  Gallery.prototype.moveLeft = function() {
    if (this.activePicture !== 0) {
      this.activePicture--;
    } else {
      this.activePicture = this.galleryPictures.length - 1;
    }
    location.hash = 'photo' + this.galleryPictures[this.activePicture];
  };

  Gallery.prototype.moveRight = function() {
    if (this.activePicture !== this.galleryPictures.length - 1) {
      this.activePicture++;
    } else {
      this.activePicture = 0;
    }
    location.hash = 'photo' + this.galleryPictures[this.activePicture];
  };

  Gallery.prototype._onDocumentKeyDown = function() {
    if (event.keyCode === this.ESC) {
      this._onCloseClick();
    }
  };

  Gallery.prototype._onCloseClick = function() {
    this.gallery.classList.add('invisible');
    this.arrowRight.removeEventListener('click', this.moveRight);
    this.arrowLeft.removeEventListener('click', this.moveLeft);
    this.closeButton.removeEventListener('click', this._onCloseClick);
    window.removeEventListener('keydown', this._onDocumentKeyDown);
    location.hash = '';
  };

  Gallery.prototype.savePictures = function(pictures) {
    this.galleryPictures = pictures;
    this.totalNumber.textContent = this.galleryPictures.length;
    return this.galleryPictures;
  };

  Gallery.prototype.onHashChange = function() {
    if (location.hash) {
      var hash = window.location.hash;
      var regExp = hash.match(/#photo\/(\S+)/);
      if (!regExp) {
        return;
      }
      var regExpSrc = '/' + regExp[1];
      var photoIndex = -1;
      this.galleryPictures.forEach(function(pic, index) {
        if (~pic.indexOf(regExpSrc)) {
          photoIndex = index;
        }
      });
      if (photoIndex !== -1) {
        this.showGallery(photoIndex);
      } else {
        this._onCloseClick();
      }
    }
  };

  //Функция Показывает галерею

  Gallery.prototype.showGallery = function(number) {
    this.gallery.classList.remove('invisible');
    this.arrowRight.addEventListener('click', this.moveRight);
    this.arrowLeft.addEventListener('click', this.moveLeft);
    this.closeButton.addEventListener('click', this._onCloseClick);
    window.addEventListener('keydown', this._onDocumentKeyDown);
    this.showPictures(number);
  };

  module.exports = Gallery;

})();
