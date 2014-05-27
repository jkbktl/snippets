class Photogallery
  constructor: ->
    @showGallery()
    @closeButton()
    @nextButton()
    @prevButton()
    @windowResize()
    $(document).on('keyup.keyboard', $.proxy(@_keyboardAction, @));

  showGallery: ->
    $('#photogalleryWrapper').on 'click', '.photoLink', (e) ->
      e.preventDefault()
      showImage = $(this).addClass('currentImage').attr('href')
      $("<div class='overlay'>
        <a href='#' class='overlay-close'></a>
        <a href='#' class='overlay-prev'></a>
        <a href='#' class='overlay-next'></a>
        <img id='mainImage' src='#{showImage}' /></div>").appendTo('body')
      Photogallery.prototype._imageResize()

  closeButton: ->
    $('body').on 'click', '.overlay-close', (e) =>
      e.preventDefault()
      @_closeGallery()

  nextButton: ->
    $('body').on 'click', '.overlay-next', (e) =>
      e.preventDefault()
      @_nextImage()

  prevButton: ->
    $('body').on 'click', '.overlay-prev', (e) =>
      e.preventDefault()
      @_prevImage()

  windowResize: ->
    $(window).resize =>
      @_imageResize()



  _imageResize: ->
    maxHeight = $(window).height()
    $('#mainImage').css('height', maxHeight)

  _closeGallery: ->
    $('.overlay').fadeOut 'fast', ->
      $('.currentImage').removeClass('currentImage')
      $(this).remove()

  _nextImage: ->
    nextImage =
      $('.currentImage')
        .removeClass('currentImage')
        .next()
        .addClass('currentImage')
    nextImage = $('.currentImage').siblings().last() if nextImage is false
    console.log nextImage
    $('#mainImage').attr('src', nextImage.attr 'href')

  _prevImage: ->
    prevImage =
      $('.currentImage')
        .removeClass('currentImage')
        .prev()
        .addClass('currentImage')
    prevImage = $('.currentImage').siblings().last() if prevImage is false
    console.log prevImage
    $('#mainImage').attr('src', prevImage.attr 'href' )

  _keyboardAction: (event) ->
    KEYCODE_ESC        = 27
    KEYCODE_LEFTARROW  = 37
    KEYCODE_RIGHTARROW = 39

    keycode = event.keyCode;
    key     = String.fromCharCode(keycode).toLowerCase()
    if keycode == KEYCODE_ESC or key.match(/x|o|c/)
      @_closeGallery()
    else if key == 'p' or keycode == KEYCODE_LEFTARROW
      @_prevImage()
    else if key == 'n' or keycode == KEYCODE_RIGHTARROW
      @_nextImage()


$ ->
  photogallery = new Photogallery()