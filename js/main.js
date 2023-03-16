// helper functions

function is_touch_device() {
  if ("ontouchstart" in window) return true;
  if (window.DocumentTouch && document instanceof DocumentTouch) return true;
  return window.matchMedia("(pointer: coarse)").matches;
}

function getScrollBarWidth() {
  var inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";
  var outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "100%";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);
  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;
  document.body.removeChild(outer);
  return w1 - w2;
}

function switchNavToggler() {
  if (!is_touch_device()) {
    $(".dropdown-toggle").removeAttr("data-bs-toggle");
    $(".dropdown").attr("data-bs-hover", "dropdown");
  } else {
    $(".dropdown").removeAttr("data-bs-hover");
    $(".dropdown-toggle").attr("data-bs-toggle", "dropdown");
  }
}

function eqHeightReset(elements) {
  elements.each(function () {
    $(this).height("auto");
  });
}

function eqHeight(elements) {
  var eqHeight = 0;
  elements.each(function () {
    var ht = $(this).height();
    if (ht > eqHeight) {
      eqHeight = ht;
    }
  });
  elements.each(function () {
    $(this).height(eqHeight);
  });
}

jQuery(document).ready(function ($) {
  eqHeight($(".cards-list .row .card-title"));

  $(window).on("resize", function () {
    eqHeightReset($(".cards-list .row .card-title"));
    if ($(window).width() >= 768) {
      eqHeight($(".cards-list .row .card-title"));
    }
  });

  // locomotive scroll
  const scroller = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    lerp: 0.1,
    // resetNativeScroll: true,
    mobile: {
      smooth: true,
    },
    tablet: {
      smooth: true,
      breakpoint: 992,
    },
  });

  // sticky header

  var scrollY = 0;
  scroller.on("scroll", (args) => {
    if (args.scroll.y > $(".header").outerHeight()) {
      $(".header").addClass("header-fixed");
    } else {
      $(".header").removeClass("header-fixed");
    }

    scrollY = args.scroll.y;
  });
  scroller.on("init", (args) => {
    if (args.scroll.y > $(".header").outerHeight()) {
      $(".header").addClass("header-fixed");
    } else {
      $(".header").removeClass("header-fixed");
    }

    scrollY = args.scroll.y;
  });

  switchNavToggler();
  $(window).on("resize", function () {
    switchNavToggler();
  });

  // sliders
  if ($(".main-banner-slider").length) {
    const swiperBanner = new Swiper(".main-banner-slider", {
      speed: 500,
      spaceBetween: 0,
      autoHeight: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".main-banner-slider .swiper-pagination",
        clickable: true,
      },
    });
  }
  if ($(".icons-slider").length) {
    const swiperIcons = new Swiper(".icons-slider", {
      spaceBetween: 11,
      slidesPerView: 2,
      slidesPerGroup: 2,
      pagination: {
        el: ".icons-slider .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 4,
          slidesPerGroup: 1,
          spaceBetween: 60,
          pagination: false,
        },
      },
    });
  }
  if ($(".cards-slider").length) {
    const swiperVacancies = new Swiper(".cards-slider", {
      spaceBetween: 35,
      slidesPerView: "auto",
      pagination: {
        el: ".cards-slider .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 44,
          pagination: false,
        },
      },
    });
  }
  if ($(".stories-slider").length) {
    const swiperVacancies = new Swiper(".stories-slider", {
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        el: ".stories-slider .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          pagination: false,
        },
      },
      on: {
        realIndexChange: function (swiper) {
          console.log(swiper.realIndex);
          $(".swiper-pagination-stories [data-slide]").each(function () {
            if (parseInt($(this).attr("data-slide")) === swiper.realIndex && !$(this).hasClass("active")) {
              $(".swiper-pagination-stories [data-slide].active").removeClass("active");
              $(this).addClass("active");
            }
          });
        },
      },
    });
    $(".swiper-pagination-stories [data-slide]").on("click", function () {
      var slide = parseInt($(this).attr("data-slide"));
      $(".swiper-pagination-stories [data-slide].active").removeClass("active");
      $(this).addClass("active");
      swiperVacancies.slideTo(slide, 500);
    });
  }
  if ($(".steps-slider").length) {
    const swiperSteps = new Swiper(".steps-slider", {
      spaceBetween: 40,
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".steps-slider .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          pagination: false,
        },
      },
      on: {
        realIndexChange: function (swiper) {
          console.log(swiper.realIndex);
          $(".steps-slider-pagination [data-slide]").each(function () {
            if (parseInt($(this).attr("data-slide")) === swiper.realIndex && !$(this).hasClass("active")) {
              $(".steps-slider-pagination [data-slide].active").removeClass("active");
              $(this).addClass("active");
            }
          });
        },
      },
    });
    $(".steps-slider-pagination [data-slide]").on("click", function () {
      var slide = parseInt($(this).attr("data-slide"));
      $(".steps-slider-pagination [data-slide].active").removeClass("active");
      $(this).addClass("active");
      swiperSteps.slideTo(slide, 500);
    });
    $(".steps-slider-next").on("click", function (e) {
      e.preventDefault();
      swiperSteps.slideNext(500);
    });
  }

  // click
  $(document)
    .on("click", ".footer .f-nav .f-nav-title", function () {
      if ($(window).width() < 992) {
        $(this).next().slideToggle(200);
      }
    })
    .on("click", ".video-play", function () {
      var video = $(this).prev("video");
      if (video.get(0).paused) {
        video.get(0).play();
      } else {
        video.get(0).pause();
      }
    });

  if (document.querySelector(".scroll-bottom")) {
    document.querySelector(".scroll-bottom").addEventListener("click", function () {
      var nextSection = document.querySelector(".page-banner").nextElementSibling;
      scroller.scrollTo(nextSection);
    });
  }
  // forms
  $(".form-select").on("change", function () {
    if ($(this).val() !== "" && $(this).val() !== "0") {
      $(this).addClass("selected");
    } else {
      $(this).removeClass("selected");
    }
  });
});
