(function ($) {
  "use strict";
  //dark and light template trigger 
  var checkbox = document.querySelector('input[name=mode]');
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      trans()
      document.documentElement.setAttribute('data-template', 'dark')
    } else {
      trans()
      document.documentElement.setAttribute('data-template', 'light')
    }
  })
  let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 1000)
  }

  // Testimonials carousel (uses the Owl Carousel library)
  
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    nav: true,
    dots: false,
    navText: ['<i class="ri-arrow-left-line"></i>', '<i class="ri-arrow-right-line"></i>'],
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 1
      }
    }
  });
  $(".testimonials-carousel-fade").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    nav: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    dots: false,
    navText: ['<i class="ri-arrow-left-line"></i>', '<i class="ri-arrow-right-line"></i>'],
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 1
      }
    }
  });
  $("#owl-carousel-portfolio-one").owlCarousel({
    autoplay: true,
    lazyLoad: true,
    loop: true,
    margin: 12,
    stagePadding: 12,
    dots:false,
    merge:true,
    center:true,

    autoplayHoverPause: true,
    responsiveClass: true,
    autoHeight: false,
    autoplayTimeout: 2500,
    smartSpeed: 800,
    nav: false,
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      },

      600: {
        items: 3
      },

      1024: {
        items: 4
      },

      1366: {
        items: 4
      }
    }
  });
  $("#owl-carousel-portfolio-two").owlCarousel({
    autoplay: true,
    lazyLoad: true,
    loop: true,
    margin: 12,
    rtl:true,
    stagePadding: 12,
    merge:true,
    center:true,
    dots:false,
    /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
 autoplayHoverPause: true,
 responsiveClass: true,
 autoHeight: false,
 autoplayTimeout: 2500,
 smartSpeed: 800,
 nav: false,
 autoWidth: true,
    responsive: {
      0: {
        items: 1
      },

      600: {
        items: 3
      },

      1024: {
        items: 4
      },

      1366: {
        items: 4
      }
    }
  });
  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });
  $('#portfolio-flters li').on('click', function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({
      filter: $(this).data('filter')
    });
  });
  // Initiate venobox (lightbox feature used in portofilo)
  $('.venobox').venobox({
    titleBackground: 'transparent',
    share: ['facebook', 'twitter', 'linkedin']
  });
  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });
  return false;
})(jQuery);



$(function() {
  $('.lazy').lazy();
});
$.ajax({
  method: "POST",
  url: "https://api.hashnode.com/",
  beforeSend: function() {
      $('#image').show();
  },
  contentType: "application/json",
  headers: {
      Authorization: "bearer 0865a5ed-578f-45e3-ae21-de8120800101"
  },
  complete: function() {
      $('#image').hide();
  },
  data: JSON.stringify({
      query: `query{
            user(username:"rahuladream") {
              publication{
                posts {
                  title
                  brief
                  slug
                  coverImage
                  cuid
                  totalReactions
                  dateAdded
                  popularity
                }
              }
            }
          }`,
      variables: {
          "entry": $('#entry').val()
      }
  })
}).then(function(data) {
  var mainContainer = document.getElementById("blogData");
  tmp = data['data']['user']['publication']['posts'];
  var len = tmp.length / 2;
  var txt = "";
  if (len > 0) {
      for (var i = 0; i < len; i++) {
          // var div = document.createElement("div");
          if (i + 1 == len) {
              col_change = 'col-lg-6'
          } else {
              col_change = 'col-lg-3'
          }
          var dateString = moment(tmp[i].dateAdded).format("MM-DD-YYYY");
          var popularity = Math.ceil(tmp[i].popularity);
          innerHTML = "<div class='col-sm-12 " + col_change + " col-12'> <div class='card' style='background-image: url(" + tmp[i].coverImage + ");' data-aos='fade-up' data-aos-delay='100'>" +
              "<div class='card-body-second'><h6 class='card-text'>" + dateString + "/ <i class='ri-eye-line'></i> " + popularity + "  </h6><h5 class='card-title'><a href='https://blog.voltry.in/" + tmp[i].slug + "' target='_blank'>" + tmp[i].title + "</a></h5>" +
              "<div class='read-more'><a href='https://blog.voltry.in/" + tmp[i].slug + "' target='_blank'> Read more</a></div></div></div></div>"
          $("#blogData").append(innerHTML);

      }
  }

});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {}).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
  });
}