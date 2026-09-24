// Queen Janie's Sourdough — site interactions

document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Slideshow
  var slideshow = document.getElementById("slideshow");
  if (!slideshow) return;

  var slides = Array.prototype.slice.call(slideshow.querySelectorAll(".slide"));
  var titleEl = document.getElementById("slideTitle");
  var dotsWrap = document.getElementById("slideDots");
  var prevBtn = document.getElementById("prevSlide");
  var nextBtn = document.getElementById("nextSlide");

  var captions = slides.map(function (slide) {
    return slide.getAttribute("data-caption") || "";
  });

  var current = 0;
  var autoplayDelay = 5000;
  var autoplayTimer = null;

  // Build dots
  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "slide-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to photo " + (i + 1));
    dot.addEventListener("click", function () {
      goTo(i);
      restartAutoplay();
    });
    dotsWrap.appendChild(dot);
  });

  var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll(".slide-dot"));

  function render() {
    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === current);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === current);
    });
    if (titleEl) titleEl.textContent = captions[current] || "";
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function restartAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, autoplayDelay);
  }

  if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAutoplay(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAutoplay(); });

  // Pause autoplay on hover/focus
  slideshow.addEventListener("mouseenter", function () {
    if (autoplayTimer) clearInterval(autoplayTimer);
  });
  slideshow.addEventListener("mouseleave", restartAutoplay);

  // Touch swipe support
  var touchStartX = null;
  var frame = slideshow.querySelector(".slide-frame");
  frame.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  frame.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) next(); else prev();
      restartAutoplay();
    }
    touchStartX = null;
  }, { passive: true });

  // Keyboard navigation when slideshow is in view/focused
  document.addEventListener("keydown", function (e) {
    var rect = slideshow.getBoundingClientRect();
    var inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === "ArrowRight") { next(); restartAutoplay(); }
    if (e.key === "ArrowLeft") { prev(); restartAutoplay(); }
  });

  render();
  restartAutoplay();
});
