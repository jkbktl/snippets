(function() {
  $.fn.extend({
    datahref: function(options) {
      var settings;
      settings = $.extend({
        pointer: true,
        target: '_self'
      });
      settings = $.extend(settings, options);
      return this.find('*[data-href]').each(function() {
        var inAttributeSettings, target;
        inAttributeSettings = {};
        if (settings.pointer) {
          $(this).css('cursor', 'pointer');
        }
        target = settings.target;
        if ($(this).data('href-settings')) {
          inAttributeSettings = $(this).data('href-settings');
          if (inAttributeSettings.hasOwnProperty('target')) {
            target = inAttributeSettings.target;
          }
          if (inAttributeSettings.hasOwnProperty('pointer')) {
            $(this).css('cursor', 'pointer');
          }
        }
        return $(this).on('click', function() {
          return window.open($(this).data('href'), target);
        });
      });
    }
  });

}).call(this);
