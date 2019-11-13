(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 71)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery); // End of use strict

function getClips() {
  $.ajax({
    url: "https://api.twitch.tv/kraken/clips/top?channel=Nalian_&period=month&limit=3",
    type: 'GET',
    dataType: 'json',
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'hobzlil1b9qwhxbwgwwqgg8k2ktt6s'
    },
    contentType: 'application/json; charset=utf-8',
    success: function (result) {
      console.log((result));
      var i = 0;
      result.clips.forEach(element => {
        i++;
        console.log(element.slug);
        var carouselNode = document.createElement("div");

        if (i == 1) {
          carouselNode.className = "carousel-item active";
        } else {
          carouselNode.className = "carousel-item";
        }

        var iframeNode = document.createElement("iframe");
        var divId = document.getElementById("topclipscarouselinner");
        iframeNode.src = "https://clips.twitch.tv/embed?clip=" + element.slug + "&autoplay=false";
        iframeNode.width = "100%";
        iframeNode.height = "600px";
        iframeNode.frameborder = "1";
        iframeNode.scrolling = "no";
        iframeNode.allowfullscreen = "true";

        divId.appendChild(carouselNode);
        carouselNode.appendChild(iframeNode)
      });
    },
    error: function (error) {
      console.log(error);
    }
  });
}

$(document).ready(function () {
  AOS.init({ duration: 700 });

  getClips();

  var channelID = "UCDQ2cnL7CkbiCmc3PghlEVQ ";
  var reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";
  $.getJSON("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(reqURL) + channelID, function (data) {
    var link = data.items[0].link;
    var id = link.substr(link.indexOf("=") + 1);
    $("#youtube_video").attr("src", "https://youtube.com/embed/" + id + "?controls=0&showinfo=0&rel=0");
  });
});

jQuery(window).load(function () {
  $('.carousel').carousel('pause');
});
