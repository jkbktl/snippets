$.fn.extend
  datahref: (options) ->
    settings = $.extend
      pointer: true
      target: '_self'
    
    settings = $.extend settings, options

    return @find('*[data-href]').each ->
      inAttributeSettings = {}

      $(this).css 'cursor', 'pointer' if settings.pointer

      target = settings.target
            
      if $(this).data 'href-settings'
        inAttributeSettings = $(this).data 'href-settings' 
        target = inAttributeSettings.target if inAttributeSettings.hasOwnProperty 'target'
        $(this).css 'cursor', 'pointer' if inAttributeSettings.hasOwnProperty 'pointer'

      $(this).on 'click', ->
        window.open($(this).data('href'), target)