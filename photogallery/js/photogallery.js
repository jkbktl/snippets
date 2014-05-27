(function() {
  var Photogallery;

  Photogallery = (function() {
    function Photogallery() {
      this.showGallery();
      this.closeButton();
      this.nextButton();
      this.prevButton();
      this.windowResize();
      $(document).on('keyup.keyboard', $.proxy(this._keyboardAction, this));
    }

    Photogallery.prototype.showGallery = function() {
      return $('#photogalleryWrapper').on('click', '.photoLink', function(e) {
        var showImage;
        e.preventDefault();
        showImage = $(this).addClass('currentImage').attr('href');
        $("<div class='overlay'>        <a href='#' class='overlay-close'></a>        <a href='#' class='overlay-prev'></a>        <a href='#' class='overlay-next'></a>        <img id='mainImage' src='" + showImage + "' /></div>").appendTo('body');
        return Photogallery.prototype._imageResize();
      });
    };

    Photogallery.prototype.closeButton = function() {
      var _this = this;
      return $('body').on('click', '.overlay-close', function(e) {
        e.preventDefault();
        return _this._closeGallery();
      });
    };

    Photogallery.prototype.nextButton = function() {
      var _this = this;
      return $('body').on('click', '.overlay-next', function(e) {
        e.preventDefault();
        return _this._nextImage();
      });
    };

    Photogallery.prototype.prevButton = function() {
      var _this = this;
      return $('body').on('click', '.overlay-prev', function(e) {
        e.preventDefault();
        return _this._prevImage();
      });
    };

    Photogallery.prototype.windowResize = function() {
      var _this = this;
      return $(window).resize(function() {
        return _this._imageResize();
      });
    };

    Photogallery.prototype._imageResize = function() {
      var maxHeight;
      maxHeight = $(window).height();
      return $('#mainImage').css('height', maxHeight);
    };

    Photogallery.prototype._closeGallery = function() {
      return $('.overlay').fadeOut('fast', function() {
        $('.currentImage').removeClass('currentImage');
        return $(this).remove();
      });
    };

    Photogallery.prototype._nextImage = function() {
      var nextImage;
      nextImage = $('.currentImage').removeClass('currentImage').next().addClass('currentImage');
      if (nextImage === false) {
        nextImage = $('.currentImage').siblings().last();
      }
      console.log(nextImage);
      return $('#mainImage').attr('src', nextImage.attr('href'));
    };

    Photogallery.prototype._prevImage = function() {
      var prevImage;
      prevImage = $('.currentImage').removeClass('currentImage').prev().addClass('currentImage');
      if (prevImage === false) {
        prevImage = $('.currentImage').siblings().last();
      }
      console.log(prevImage);
      return $('#mainImage').attr('src', prevImage.attr('href'));
    };

    Photogallery.prototype._keyboardAction = function(event) {
      var KEYCODE_ESC, KEYCODE_LEFTARROW, KEYCODE_RIGHTARROW, key, keycode;
      KEYCODE_ESC = 27;
      KEYCODE_LEFTARROW = 37;
      KEYCODE_RIGHTARROW = 39;
      keycode = event.keyCode;
      key = String.fromCharCode(keycode).toLowerCase();
      if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
        return this._closeGallery();
      } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
        return this._prevImage();
      } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
        return this._nextImage();
      }
    };

    return Photogallery;

  })();

  $(function() {
    var photogallery;
    return photogallery = new Photogallery();
  });

}).call(this);
