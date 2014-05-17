class Photogallery
  constructor: ->
    @showGallery()
    @closeButton()
    @nextButton()
    @prevButton()
    @windowResize()

  showGallery: ->
    $('#photogalleryWrapper').on 'click', '.photoLink', (e) ->
      e.preventDefault()
      showImage = $(this).addClass('currentImage').attr('href')
      console.log("Testovací test #{showImage} add hoc test")
      $("<div class='overlay'>
        <a href='#' class='overlay-close'></a>
        <a href='#' class='overlay-prev'></a>
        <a href='#' class='overlay-next'></a>
        <img id='mainImage' src='#{showImage}' /></div>").appendTo('body')

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

$ ->
  photogallery = new Photogallery()