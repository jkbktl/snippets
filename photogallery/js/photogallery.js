(function() {
  var Photogallery;

  Photogallery = (function() {
    function Photogallery() {
      this.showGallery();
      this.closeButton();
      this.nextButton();
      this.prevButton();
      this.windowResize();
    }

    Photogallery.prototype.showGallery = function() {
      return $('#photogalleryWrapper').on('click', '.photoLink', function(e) {
        var showImage;
        e.preventDefault();
        showImage = $(this).addClass('currentImage').attr('href');
        console.log("Testovací test " + showImage + " add hoc test");
        return $("<div class='overlay'>        <a href='#' class='overlay-close'></a>        <a href='#' class='overlay-prev'></a>        <a href='#' class='overlay-next'></a>        <img id='mainImage' src='" + showImage + "' /></div>").appendTo('body');
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

    return Photogallery;

  })();

  $(function() {
    var photogallery;
    return photogallery = new Photogallery();
  });

}).call(this);
