// =========================
// 0. INTRO NETFLIX FLICKER (AUTO REMOVE)
// =========================
window.addEventListener("load", () => {
  const intro = document.querySelector(".intro");

  if (intro) {
    setTimeout(() => {
      intro.style.opacity = "0";
      intro.style.transition = "opacity 0.8s ease";

      setTimeout(() => {
        intro.remove();
      }, 800);
    }, 2500);
  }
});


// =========================
// 1. HAMBURGER MENU (MOBILE)
// =========================
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("open");
    document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
  });

  // Close menu when a nav link is clicked
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      nav.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}


// =========================
// 2. FADE IN SCROLL
// =========================
const revealItems = document.querySelectorAll(
  '.project, .about, .compare, .contact, .showcase, .work-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

revealItems.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(40px)";
  el.style.transition = "all 1s ease";
  revealObserver.observe(el);
});


// =========================
// 3. SMOOTH SCROLL NAV
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// =========================
// 4. BEFORE / AFTER (MOUSE + TOUCH)
// =========================
const compares = document.querySelectorAll('.compare');

compares.forEach(container => {
  const slider = container.querySelector('.slider');
  const after = container.querySelector('.img-after');

  let isInteracting = false;
  let auto = 50;
  let dir = 1;

  const set = (percent) => {
    const clamped = Math.max(0, Math.min(percent, 100));
    after.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    slider.style.left = clamped + "%";
  };

  const getPercent = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    return (x / rect.width) * 100;
  };

  // MOUSE
  container.addEventListener('mousemove', (e) => {
    isInteracting = true;
    set(getPercent(e.clientX));
  });

  container.addEventListener('mouseleave', () => {
    isInteracting = false;
  });

  // TOUCH
  container.addEventListener('touchstart', (e) => {
    isInteracting = true;
    e.preventDefault();
  }, { passive: false });

  container.addEventListener('touchmove', (e) => {
    isInteracting = true;
    e.preventDefault();
    const touch = e.touches[0];
    set(getPercent(touch.clientX));
  }, { passive: false });

  container.addEventListener('touchend', () => {
    isInteracting = false;
  });

  // AUTO ANIMATION
  function loop() {
    if (!isInteracting) {
      auto += dir * 0.25;
      if (auto >= 100) dir = -1;
      if (auto <= 0) dir = 1;
      set(auto);
    }
    requestAnimationFrame(loop);
  }

  loop();
});


// =========================
// 5. LOGO → SCROLL TOP
// =========================
const logo = document.getElementById("logo");

if (logo) {
  logo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// =========================
// 6. VIMEO LAZY LOAD
// =========================
const videos = document.querySelectorAll('.project iframe, .work-item iframe');

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const iframe = entry.target;
    if (entry.isIntersecting && iframe.dataset.src && !iframe.src) {
      iframe.src = iframe.dataset.src;
    }
  });
}, { threshold: 0.3 });

videos.forEach(v => videoObserver.observe(v));

// Eager-load for .project iframes with data-src
const projects = document.querySelectorAll(".project");
projects.forEach(project => {
  const iframe = project.querySelector("iframe");
  if (iframe && iframe.dataset.src && !iframe.src) {
    iframe.src = iframe.dataset.src;
    iframe.onload = () => {
      project.classList.add("loaded");
    };
  }
});


// =========================
// 7. FOOTER REVEAL
// =========================
const footer = document.querySelector(".linktree");

if (footer) {
  const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  footerObserver.observe(footer);
}


// =========================
// 8. HEADER TRANSPARENCY ON SCROLL
// =========================
const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      header.style.background = "rgba(0,0,0,0.85)";
      header.style.backdropFilter = "blur(8px)";
    } else {
      header.style.background = "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)";
      header.style.backdropFilter = "blur(2px)";
    }
  }, { passive: true });
}
