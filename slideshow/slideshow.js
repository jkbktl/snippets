(function() {
  var Slideshow;

  Slideshow = (function() {
    Slideshow.prototype.state = null;

    Slideshow.prototype.autoSpeed = 2000;

    Slideshow.prototype.sliding = false;

    Slideshow.prototype.step = 200;

    function Slideshow(settings) {
      var _this = this;
      if (settings == null) {
        settings = {};
      }
      this.root = settings.root || $('.slideshow-wrapper');
      this.item = settings.item || $('.slideshow-wrapper .slideshow-item');
      this.prev = settings.prev || $('<a class="prev" href="#" />');
      this.next = settings.next || $('<a class="next" href="#" />');
      this.lift = settings.lift || ($('.slideshow-wrapper .slideshow-lift'));
      this.paging = settings.paging || ($('<div class="paging" />')).appendTo(this.root);
      (this.prev.appendTo(this.root)).click(function(e) {
        e.preventDefault();
        return _this.slideMe('prev');
      });
      (this.next.appendTo(this.root)).click(function(e) {
        e.preventDefault();
        return _this.slideMe('next');
      });
    }

    Slideshow.prototype.slideMe = function(dir) {
      var first, last,
        _this = this;
      if (this.sliding === true) {
        return;
      }
      this.unsetAutomat();
      last = this.item.filter(':last-child');
      first = this.item.filter(':first-child');
      this.sliding = true;
      switch (dir) {
        case "prev":
          last.prependTo(this.lift);
          this.lift.css({
            'left': this.step * -1
          });
          return this.lift.animate({
            left: 0
          }, 300, function() {
            _this.sliding = false;
            return _this.setAutomat();
          });
        case "next":
          return this.lift.animate({
            left: this.step * -1
          }, 300, function() {
            first.appendTo(_this.lift);
            _this.lift.css({
              'left': 0
            });
            _this.sliding = false;
            return _this.setAutomat();
          });
      }
    };

    Slideshow.prototype.destroy = function() {
      this.root.hide;
      return this.unsetAutomat;
    };

    Slideshow.prototype.setAutomat = function() {
      var _this = this;
      return this.automat = setTimeout(function() {
        return _this.slideMe('next');
      }, this.autoSpeed);
    };

    Slideshow.prototype.unsetAutomat = function() {
      return clearTimeout(this.automat);
    };

    return Slideshow;

  })();

  $('document').ready(function() {
    var doSlideshow;
    return doSlideshow = new Slideshow();
  });

}).call(this);
