# To-do
# - add paging
# - destroy method

class Slideshow
  state: null
  autoSpeed: 2000
  
  sliding: false
  step: 200

  constructor: (settings = {}) ->

    @root = settings.root or $ '.slideshow-wrapper'
    @item = settings.item or $ '.slideshow-wrapper .slideshow-item'
    @prev = settings.prev or $ '<a class="prev" href="#" />'
    @next = settings.next or $ '<a class="next" href="#" />'
    @lift = settings.lift or ($ '.slideshow-wrapper .slideshow-lift')
    @paging = settings.paging or ($ '<div class="paging" />').appendTo @root

    (@prev.appendTo @root).click (e) =>
      e.preventDefault()
      @slideMe 'prev'

    (@next.appendTo @root).click (e) =>
      e.preventDefault()
      @slideMe 'next'

  
  slideMe: (dir) ->
    if(@sliding == true)
      return

    @unsetAutomat()
    last = @item.filter(':last-child')
    first = @item.filter(':first-child')

    @sliding = true

    switch dir
      when "prev"
        last.prependTo(@lift)
        @lift.css {'left': @step * -1}
        @lift.animate {left: 0}, 300, =>
          @sliding = false
          @setAutomat()

      when "next"
        @lift.animate {left: @step * -1}, 300, =>
          first.appendTo(@lift)
          @lift.css {'left': 0}
          @sliding = false
          @setAutomat()

  destroy: ->
    @root.hide
    @unsetAutomat

  setAutomat: ->
    @automat = setTimeout =>
      @slideMe('next')
    , @autoSpeed

  unsetAutomat: ->
    clearTimeout @automat


$('document').ready ->
  doSlideshow = new Slideshow()