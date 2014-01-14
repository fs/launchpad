/* =========================================================
 * bootstrap-modal.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function( $ ){

  "use strict"

 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function ( content, options ) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this

        if (this.isShown) return

        $('body').addClass('modal-open')

        this.isShown = true
        this.$element.trigger('show')

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          !that.$element.parent().length && that.$element.appendTo(document.body) //don't move modals dom position

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function ( e ) {
        e && e.preventDefault()

        if (!this.isShown) return

        var that = this
        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element
          .trigger('hide')
          .removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal( that ) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop( callback ) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.modal', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.modal(option)
    })
  })

}( window.jQuery );

(function(a){"use strict";var b=function(a,c,d){var e=document.createElement("img"),f,g;return e.onerror=c,e.onload=function(){g&&b.revokeObjectURL(g),c(b.scale(e,d))},window.Blob&&a instanceof Blob||window.File&&a instanceof File?f=g=b.createObjectURL(a):f=a,f?(e.src=f,e):b.readFile(a,function(a){e.src=a})},c=window.createObjectURL&&window||window.URL&&URL||window.webkitURL&&webkitURL;b.scale=function(a,b){b=b||{};var c=document.createElement("canvas"),d=Math.max((b.minWidth||a.width)/a.width,(b.minHeight||a.height)/a.height);return d>1&&(a.width=parseInt(a.width*d,10),a.height=parseInt(a.height*d,10)),d=Math.min((b.maxWidth||a.width)/a.width,(b.maxHeight||a.height)/a.height),d<1&&(a.width=parseInt(a.width*d,10),a.height=parseInt(a.height*d,10)),!b.canvas||!c.getContext?a:(c.width=a.width,c.height=a.height,c.getContext("2d").drawImage(a,0,0,a.width,a.height),c)},b.createObjectURL=function(a){return c?c.createObjectURL(a):!1},b.revokeObjectURL=function(a){return c?c.revokeObjectURL(a):!1},b.readFile=function(a,b){if(window.FileReader&&FileReader.prototype.readAsDataURL){var c=new FileReader;return c.onload=function(a){b(a.target.result)},c.readAsDataURL(a),c}return!1},typeof define!="undefined"&&define.amd?define(function(){return b}):a.loadImage=b})(this);

/*
 * Bootstrap Image Gallery 2.2
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, regexp: true */
/*global define, window, document, jQuery */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './load-image.js',
            'bootstrap'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.loadImage
        );
    }
}(function ($, loadImage) {
    'use strict';
    // Bootstrap Image Gallery is an extension to the Modal dialog of Twitter's
    // Bootstrap toolkit, to ease navigation between a set of gallery images.
    // It features transition effects, fullscreen mode and slideshow functionality.
    $.extend($.fn.modal.defaults, {
        // Delegate to search gallery links from, can be anything that
        // is accepted as parameter for $():
        delegate: document,
        // Selector for gallery links:
        selector: null,
        // The index of the first gallery image to show:
        index: 0,
        // The href of the first gallery image to show (overrides index):
        href: null,
        // The range of images around the current one to preload:
        preloadRange: 2,
        // Offset of image width to viewport width:
        offsetWidth: 100,
        // Offset of image height to viewport height:
        offsetHeight: 200,
        // Set to true to display images as canvas elements:
        canvas: false,
        // Shows the next image after the given time in ms (0 = disabled):
        slideshow: 0
    });
    var originalShow = $.fn.modal.Constructor.prototype.show,
        originalHide = $.fn.modal.Constructor.prototype.hide;
    $.extend($.fn.modal.Constructor.prototype, {
        initLinks: function () {
            var $this = this,
                options = this.options,
                selector = options.selector ||
                    'a[data-target=' + options.target + ']',
                index = 0;
            $(options.delegate).find(selector).each(function (i, node) {
                var url = node.href || $(node).data('href');
                // Check the the previously added url, to account for
                // thumbnail and name linking twice to the same image:
                if ($this.urls[$this.urls.length - 1] !== url) {
                    $this.urls.push(url);
                    $this.titles.push(node.title);
                    if (url === options.href) {
                        options.index = index;
                    }
                    index += 1;
                }
            });
            if (!this.urls[options.index]) {
                options.index = 0;
            }
        },
        startSlideShow: function () {
            var $this = this;
            if (this.options.slideshow) {
                this._slideShow = window.setTimeout(
                    function () {
                        $this.next();
                    },
                    this.options.slideshow
                );
            }
        },
        stopSlideShow: function () {
            window.clearTimeout(this._slideShow);
        },
        toggleSlideShow: function () {
            var node = this.$element.find('.modal-slideshow');
            if (this.options.slideshow) {
                this.options.slideshow = 0;
                this.stopSlideShow();
            } else {
                this.options.slideshow = node.data('slideshow') || 5000;
                this.startSlideShow();
            }
            node.children().toggleClass('icon-play icon-pause');
        },
        preloadImages: function () {
            var options = this.options,
                range = options.index + options.preloadRange + 1,
                url,
                i;
            for (i = options.index - options.preloadRange; i < range; i += 1) {
                url = this.urls[i];
                if (url && i !== options.index) {
                    $('<img>').prop('src', url);
                }
            }
        },
        loadImage: function () {
            var $this = this,
                modal = this.$element,
                index = this.options.index,
                oldImg;
            this.abortLoad();
            this.stopSlideShow();
            // The timeout prevents displaying a loading status,
            // if the image has already been loaded:
            this._loadingTimeout = window.setTimeout(function () {
                modal.addClass('modal-loading');
            }, 100);
            oldImg = modal.find('.modal-image').children().removeClass('in');
            // The timeout allows transition effects to finish:
            window.setTimeout(function () {
                oldImg.remove();
            }, 3000);
            modal.find('.modal-title').text(this.titles[index]);
            modal.find('.modal-download').prop('href', this.urls[index]);
            this.loadingImage = loadImage(
                this.urls[index],
                function (img) {
                    window.clearTimeout($this._loadingTimeout);
                    modal.removeClass('modal-loading');
                    $this.showImage(img);
                    $this.startSlideShow();
                },
                $this.loadImageOptions
            );
            this.preloadImages();
        },
        showImage: function (img) {
            var modal = this.$element,
                transition = $.support.transition && modal.hasClass('fade'),
                method = transition ? modal.animate : modal.css,
                modalImage = modal.find('.modal-image'),
                clone,
                forceReflow;
            modalImage.css({
                width: img.width,
                height: img.height
            });
            if (transition) {
                clone = modal.clone().hide().appendTo(document.body);
            }
            method.call(modal.stop(), {
                'margin-top': -((clone || modal).outerHeight() / 2),
                'margin-left': -((clone || modal).outerWidth() / 2)
            });
            if (clone) {
                clone.remove();
            }
            modalImage.append(img);
            forceReflow = img.offsetWidth;
            $(img).addClass('in');
        },
        abortLoad: function () {
            if (this.loadingImage) {
                this.loadingImage.onload = this.loadingImage.onerror = null;
            }
            window.clearTimeout(this._loadingTimeout);
        },
        prev: function () {
            var options = this.options;
            options.index -= 1;
            if (options.index < 0) {
                options.index = this.urls.length - 1;
            }
            this.loadImage();
        },
        next: function () {
            var options = this.options;
            options.index += 1;
            if (options.index > this.urls.length - 1) {
                options.index = 0;
            }
            this.loadImage();
        },
        keyHandler: function (e) {
            switch (e.which) {
            case 37: // left
            case 38: // up
                e.preventDefault();
                this.prev();
                break;
            case 39: // right
            case 40: // down
                e.preventDefault();
                this.next();
                break;
            }
        },
        wheelHandler: function (e) {
            e.preventDefault();
            e = e.originalEvent;
            this._wheelCounter = this._wheelCounter || 0;
            this._wheelCounter += (e.wheelDelta || e.detail || 0);
            if ((e.wheelDelta && this._wheelCounter >= 120) ||
                    (!e.wheelDelta && this._wheelCounter < 0)) {
                this.prev();
                this._wheelCounter = 0;
            } else if ((e.wheelDelta && this._wheelCounter <= -120) ||
                        (!e.wheelDelta && this._wheelCounter > 0)) {
                this.next();
                this._wheelCounter = 0;
            }
        },
        initGalleryEvents: function () {
            var $this = this,
                modal = this.$element;
            modal.find('.modal-image').on('click.modal-gallery', function (e) {
                if (e.altKey) {
                    $this.prev(e);
                } else {
                    $this.next(e);
                }
            });
            modal.find('.modal-prev').on('click.modal-gallery', function (e) {
                $this.prev(e);
            });
            modal.find('.modal-next').on('click.modal-gallery', function (e) {
                $this.next(e);
            });
            modal.find('.modal-slideshow').on('click.modal-gallery', function (e) {
                $this.toggleSlideShow(e);
            });
            $(document)
                .on('keydown.modal-gallery', function (e) {
                    $this.keyHandler(e);
                })
                .on(
                    'mousewheel.modal-gallery, DOMMouseScroll.modal-gallery',
                    function (e) {
                        $this.wheelHandler(e);
                    }
                );
        },
        destroyGalleryEvents: function () {
            var modal = this.$element;
            this.abortLoad();
            this.stopSlideShow();
            modal.find('.modal-image, .modal-prev, .modal-next, .modal-slideshow')
                .off('click.modal-gallery');
            $(document)
                .off('keydown.modal-gallery')
                .off('mousewheel.modal-gallery, DOMMouseScroll.modal-gallery');
        },
        show: function () {
            if (!this.isShown && this.$element.hasClass('modal-gallery')) {
                var modal = this.$element,
                    options = this.options,
                    windowWidth = $(window).width(),
                    windowHeight = $(window).height();
                this.urls = [];
                this.titles = [];
                if (modal.hasClass('modal-fullscreen')) {
                    this.loadImageOptions = {
                        minWidth: windowWidth,
                        minHeight: windowHeight,
                        maxWidth: windowWidth,
                        maxHeight: windowHeight,
                        canvas: options.canvas
                    };
                } else {
                    this.loadImageOptions = {
                        maxWidth: windowWidth - options.offsetWidth,
                        maxHeight: windowHeight - options.offsetHeight,
                        canvas: options.canvas
                    };
                }
                modal.css({
                    'margin-top': -(modal.outerHeight() / 2),
                    'margin-left': -(modal.outerWidth() / 2)
                });
                this.initGalleryEvents();
                this.initLinks();
                if (this.urls.length) {
                    this.loadImage();
                }
            }
            originalShow.apply(this, arguments);
        },
        hide: function () {
            if (this.isShown && this.$element.hasClass('modal-gallery')) {
                this.options.delegate = document;
                this.options.href = null;
                this.destroyGalleryEvents();
            }
            originalHide.apply(this, arguments);
        }
    });
    $(function () {
        $(document.body).on(
            'click.modal-gallery.data-api',
            '[data-toggle="modal-gallery"]',
            function (e) {
                var $this = $(this),
                    options = $this.data(),
                    modal = $(options.target),
                    data = modal.data('modal'),
                    link;
                if (!data) {
                    options = $.extend(modal.data(), options);
                }
                if (!options.selector) {
                    options.selector = 'a[rel=gallery]';
                }
                link = $(e.target).closest(options.selector);
                if (link.length && modal.length) {
                    e.preventDefault();
                    options.href = link.prop('href') || link.data('href');
                    options.delegate = link[0] !== this ? this : document;
                    if (data) {
                        $.extend(data.options, options);
                    }
                    modal.modal(options);
                }
            }
        );
    });
}));
/* =============================================================
 * bootstrap-scrollspy.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */

!function ( $ ) {

  "use strict"

  /* SCROLLSPY CLASS DEFINITION
   * ========================== */

  function ScrollSpy( element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body').on('click.scroll.data-api', this.selector, process)
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        this.targets = this.$body
          .find(this.selector)
          .map(function () {
            var href = $(this).attr('href')
            return /^#\w/.test(href) && $(href).length ? href : null
          })

        this.offsets = $.map(this.targets, function (id) {
          return $(id).position().top
        })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active

        this.activeTarget = target

        this.$body
          .find(this.selector).parent('.active')
          .removeClass('active')

        active = this.$body
          .find(this.selector + '[href="' + target + '"]')
          .parent('li')
          .addClass('active')

        if ( active.parent('.dropdown-menu') )  {
          active.closest('li.dropdown').addClass('active')
        }
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })
}( window.jQuery );


/* ============================================================
 * bootstrap-dropdown.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function ( element ) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function ( e ) {
      var $this = $(this)
        , selector = $this.attr('data-target')
        , $parent
        , isActive

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()
      !isActive && $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body').on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })
  
  $('[data-lightbox]').click(function(e) {
      e.preventDefault();

      var href = $(this).attr('href');
      var width = $(window).width() - 80;
      var height = $(window).height() - 80;
      var title = '';

      if ($(this).attr('title')) {
          title = $(this).attr('title');
      }

      bootbox.lightbox('<img src="'+href+'" alt="" style="max-width:'+width+'px;max-height:'+height+'px;" />', title);
  });
}( window.jQuery );