$ ->

  $.fn.datahref = (options) ->
  
    settings = $.extend
      pointer: true,
      target: '_self'
    , options
    
    this.find('*[data-href]').each ->
      inAttributeSettings = {}
      
      if settings.pointer
        $(this).css 'cursor', 'pointer'
        target = settings.target
        
        if ($this).data 'href-settings'
          inAttributeSettings = $(this).data 'href-settings'
          
          if inAttributeSettings.hasOwnProperty 'target'
            target = inAttributeSettings.target
            
          if inAttributeSettings.hasOwnProperty 'pointer'
            $(this).css 'cursor', 'pointer'
            
      $(this).on 'click', ->
        window.open($(this).data 'href', target)
        
    return this