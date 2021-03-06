/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

  /**
   * This behavior adds shadow to header on scroll.
   *
  Drupal.behaviors.addHeaderShadow = {
    attach: function (context) {
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 10) {
          $("header.navbar .container").css("box-shadow", "0 4px 3px -4px gray");
        }
        else {
          $("header.navbar .container").css("box-shadow", "none");
        }
      });
    }
  };
   */

  /**
   * This behavior controls the height of the collapse menu height.
   *
   */
  Drupal.behaviors.collapseMenuHeight = {
    attach: function (context) {
      // only for mobile menu
      if ($(window).width() >= 768) return;

      var $toggleButton = $('.navbar-toggle'),
          $collapseMenu = $('#navbar-collapse'),
          $navbarHeader = $('.navbar-header');

      $toggleButton.once('init', function() {
        //
        // calculate menu height of menu on window resize
        $(window).on("resize", function() {
          var height = $(window).height() - $navbarHeader.height();

          $collapseMenu.height(height);
        });

        //
        // calculate menu height when toggled
        $toggleButton.on('click',function() {
          if ($collapseMenu.hasClass('open')) {
            $collapseMenu.animate({'min-height': '0px'});
            $collapseMenu.removeClass('open');
          }
          else {
            var height = $(window).height() - $navbarHeader.height();
            $collapseMenu.animate({'min-height': height+'px'});
            $collapseMenu.addClass('open');
          }
        });
      });
    }
  };

  /**
   * Swaps images from colored to black/white on mouse hover.
   */
  Drupal.behaviors.hoverImageSwap = {
    attach: function () {
      $('.node-album.view-mode-teaser').hover(
        function () {
          // mouse enter
          var $img = $(this).find('.field-name-field-image img'),
              src = $img.attr('src').replace('/cover/', '/cover_bw/');
          $img.attr('src', src);
        },
        function () {
          // mouse leave
          var $img = $(this).find('.field-name-field-image img'),
            src = $img.attr('src').replace('/cover_bw/', '/cover/');
          $img.attr('src', src);
        }
      );
    }
  }

  /**
   * Audio controller toggle button.
   */
  Drupal.behaviors.audioController = {
    attach: function () {
      var audio = document.getElementById('background-sound'), // element needed, not jquery object
        $controls = $(document).find('#sound-controls'),
        $toggleImg = $controls.find('img.sound-play'),
        imgUrl = $toggleImg.attr('src');

      // click on play / pause button
      $controls.once('click', function () {
        // set music play according to flag
        if (sessionStorage.isMuted == 'true') {
          audio.pause();
          $toggleImg.attr('src', imgUrl.replace('sound_on', 'sound_off'));
        } else {
          audio.play();
          $toggleImg.attr('src', imgUrl.replace('sound_off', 'sound_on'));
        }

        // controls event
        $controls.on('click', function () {
          // toggle the play button
          if (audio.paused || audio.ended) {
            audio.play();
            sessionStorage.isMuted = "false";
            $toggleImg.attr('src', imgUrl.replace('sound_off', 'sound_on'));
          } else {
            audio.pause();
            sessionStorage.isMuted = "true";
            $toggleImg.attr('src', imgUrl.replace('sound_on', 'sound_off'));
          }

          // don't propagate click event further up
          return false;
        });
      });

    }
  };

  /**
   * Anchor menus: Scrolls smoothly to anchor due to menu click.
  Drupal.behaviors.smoothScrolltoAnchors = {
    attach: function (context, settings) {
      $(function () {
        $('.menu li.leaf a').click(function () {
          var anchorPos = this.href.indexOf('#');
          // no anchor available, perform click
          if (anchorPos == -1) return true;

          // menu item references anchor, get anchor target
          var target = $(this.href.slice(pos));
          if (target.length) {
            $('html, body').stop().animate({
              scrollTop: target.offset().top
            }, 1000, 'swing');
            return false;
          }
          // no target available, perform click
          return true;
        });
      });
    }
  };
   */

  /**
   * Allows full size clickable items.
   Drupal.behaviors.fullSizeClickableItems = {
    attach: function () {
      var $clickableItems = $('.node-link-item.node-teaser .field-group-div')
        .add('.node-team-member.node-teaser .field-group-div');

      $clickableItems.once('click', function () {
        $(this).on('click', function () {
          window.location = $(this).find("a:first").attr("href");
          return false;
        });
      });
    }
  };
   */

  /**
   * Open file links in its own tab. The file field doesn't implement this behaviour right away.
   Drupal.behaviors.openDocumentsInTab = {
    attach: function () {
      $(".field-name-field-documents").find(".field-item a").attr('target', '_blank');
    }
  }
   */

})(jQuery);
