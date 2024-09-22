jQuery(document).ready(function ($) {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on("scroll", (e) => {
    var scrolled = e.actualScroll;

    if (scrolled > 115) {
      $(".header").addClass("header-fixed");
    } else {
      $(".header").removeClass("header-fixed");
    }
  });
  if (lenis.targetScroll > 115) {
    $(".header").addClass("header-fixed");
  } else {
    $(".header").removeClass("header-fixed");
  }

  // header scroll
  var bannerHeight;
  if ($(".banner").length) {
    bannerHeight = $(".banner").outerHeight();

    if ($(".banner").hasClass("banner-simple")) {
      bannerHeight = $(window).height() - 30;
    }
  }
  lenis.on("scroll", (e) => {
    if (lenis.actualScroll > bannerHeight) {
      $(".header").addClass("header-fixed-top");
    } else {
      $(".header").removeClass("header-fixed-top");
    }
  });

  if (lenis.targetScroll > bannerHeight) {
    $(".header").addClass("header-fixed-top");
  } else {
    $(".header").removeClass("header-fixed-top");
  }

  // sliders
  if ($(".banner-home .swiper").length) {
    const swiperBanner = new Swiper(".banner-home .swiper", {
      speed: 500,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".banner-home  .swiper-pagination",
        clickable: true,
      },
    });
  }
  if ($(".image-slider").length) {
    document.querySelectorAll(".image-slider").forEach((slider) => {
      const swiperImage = new Swiper(slider, {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 1.2,
      });
    });
  }
  if ($(".services-slider").length) {
    document.querySelectorAll(".services-slider").forEach((slider) => {
      const swiperService = new Swiper(slider, {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1.2,
        watchSlidesProgress: true,
        freeMode: true,
        pagination: {
          el: slider.nextElementSibling,
          type: "progressbar",
        },
        breakpoints: {
          768: {
            slidesPerView: 2.2,
          },
          992: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: "auto",
            spaceBetween: 46,
          },
        },
      });
    });
  }
  if ($(".projects-slider").length) {
    document.querySelectorAll(".projects-slider").forEach((slider) => {
      const swiperProjects = new Swiper(slider, {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1.2,
        watchSlidesProgress: true,
        centeredSlides: true,
        initialSlide: 1,
        pagination: {
          el: slider.nextElementSibling,
          type: "progressbar",
        },
        breakpoints: {
          768: {
            slidesPerView: 2.2,
          },
          992: {
            centeredSlides: false,
            slidesPerView: "auto",
            slidesOffsetBefore: 40,
            slidesOffsetAfter: 40,
          },
          1200: {
            centeredSlides: false,
            slidesPerView: "auto",
            spaceBetween: 46,
            slidesOffsetBefore: 80,
            slidesOffsetAfter: 80,
          },
          1794: {
            centeredSlides: false,
            slidesPerView: "auto",
            spaceBetween: 46,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        },
      });
    });
  }
  if ($(".images-slider").length) {
    document.querySelectorAll(".images-slider").forEach((slider) => {
      const swiperImagesLarge = new Swiper(slider, {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1.2,
        initialSlide: 1,
        pagination: {
          el: slider.nextElementSibling,
          type: "progressbar",
        },
        breakpoints: {
          768: {
            slidesPerView: 2.2,
          },
          992: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: "auto",
            spaceBetween: 46,
          },
        },
      });
    });
  }

  // menu
  $(".menu-item-has-children").each(function () {
    var btn = $('<button class="submenu-toggler" />');
    btn.append('<i class="fa-regular fa-chevron-down" />');
    $(this).find("ul").before(btn);
  });
  $(document).on("click", ".menu-item-has-children .submenu-toggler", function () {
    if (!$(this).parent("li").hasClass("show")) {
      $(this).parent("li").addClass("show");
      $(this).next("ul").slideDown(300);
    } else {
      $(this).parent("li").removeClass("show");
      $(this).next("ul").slideUp(300);
    }
  });

  $("#navbarContent").on("shown.bs.collapse", function () {
    $("html").addClass("hide-scroll");
    lenis.stop();
  });
  $("#navbarContent").on("hide.bs.collapse", function () {
    $("html").removeClass("hide-scroll");
    lenis.start();
  });

  // forms
  if (document.querySelector("input[type=file]")) {
    document.querySelectorAll("input[type=file]").forEach((file) => {
      file.addEventListener("change", function () {
        var fileName = this.files[0].name;
        var labelText = this.closest(".form-field").querySelector("label span");
        labelText.innerText = fileName;
        labelText.classList.add("active");
      });
    });
  }

  // text see more
  $(".text-toggler").on("click", function () {
    var txt1 = "Meer over deze vacature",
      txt2 = "Minder over deze vacature";
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).find("span").text(txt1);
      $(this).next(".text-hidden").slideUp(300);
    } else {
      $(this).addClass("active");
      $(this).find("span").text(txt2);
      $(this).next(".text-hidden").slideDown(300);
    }
  });

  $(".category-filter .btn").on("click", function () {
    $(".category-filter .active").removeClass("active");
    $(this).parent("li").addClass("active");
  });
});
