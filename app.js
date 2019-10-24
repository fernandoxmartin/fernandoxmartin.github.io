function init() {
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const topslides = document.querySelectorAll(".topnavslide");
  let current = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener("click", function() {
      changeDots(this);
      nextSlide(index);
      scrollSlide = index;
    });
  });

  topslides.forEach((slide, index) => {
    slide.addEventListener("click", function() {
      nextSlide(index);
      scrollSlide = index;
    });
  });

  function changeDots(dot) {
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  }

  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];

    const tl = new TimelineMax({
      onStart: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "all";
        });
      }
    });

    const topnavtl = new TimelineMax({
      onStart: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "all";
        });
      }
    });

    tl.fromTo(
      currentPage,
      0.18,
      { opacity: 1, pointerEvents: "all" },
      { opacity: 0, pointerEvents: "none" }
    ).fromTo(
      nextPage,
      0.2,
      { opacity: 0, pointerEvents: "none" },
      { opacity: 1, pointerEvents: "all" }
    );

    topnavtl
      .fromTo(
        currentPage,
        0.18,
        { opacity: 1, pointerEvents: "all" },
        { opacity: 0, pointerEvents: "none" }
      )
      .fromTo(
        nextPage,
        0.2,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "all" }
      );

    current = pageNumber;
  }

  const hamburger = document.querySelector(".menu");
  const hamburgerLines = document.querySelectorAll(".menu line");
  const navOpen = document.querySelector(".nav-open");
  const logo = document.querySelector(".logo");
  const links = document.querySelectorAll(".topnavslide");

  const tl = new TimelineMax({ paused: true, reversed: true });

  tl.to(navOpen, 0.2, { y: 0 })
    .fromTo(logo, 0.2, { color: "white" }, { color: "black" }, "-=1")
    .fromTo(hamburgerLines, 0.2, { stroke: "white" }, { stroke: "black" });

  hamburger.addEventListener("click", () => {
    tl.reversed() ? tl.play() : tl.reverse();
  });

  links.forEach(function(e) {
    e.addEventListener("click", () => {
      tl.reversed() ? tl.play() : tl.reverse();
    });
  });
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

init();
