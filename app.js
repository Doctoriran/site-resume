// ==========================================
// i18n Language Pack
// ==========================================
const i18n = {
  en: {
    kicker: "Portfolio / Musician & Full-Stack Learner",
    sub: "Self-taught web developer (HTML/CSS/JS), admin for a 10k+ YouTube channel, and 5-year pianist.",
    cta: "Download Resume",
    skills: "Signature Skills",
    projects: "Selected Projects",
    contact: "Contact",
    footer: "Made with grit, coffee, and late-night code.",
  },
  fa: {
    kicker: "رزومه / موزیسین و توسعه‌دهنده وب",
    sub: "توسعه‌دهنده خودآموخته وب (HTML/CSS/JS)، ادمین یک کانال یوتیوب ۱۰K+ و پیانیست.",
    cta: "دانلود رزومه",
    skills: "مهارت‌های شاخص",
    projects: "پروژه‌های منتخب",
    contact: "تماس",
    footer: "ساخته شده با تلاش، قهوه و کدهای نیمه‌شب.",
  }
};

let lang = localStorage.getItem("lang") || "en";
const t = (k) => i18n[lang][k];

function applyLang() {
  document.querySelectorAll("[data-i]").forEach(el => {
    const key = el.getAttribute("data-i");
    if (i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });
  document.dir = (lang === "fa" ? "rtl" : "ltr");
}

document.addEventListener("click", (e) => {
  const trg = e.target.closest("[data-lang]");
  if (trg) {
    lang = trg.getAttribute("data-lang");
    localStorage.setItem("lang", lang);
    applyLang();
  }
});

// ==========================================
// Theme
// ==========================================
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let theme = localStorage.getItem("theme") || "dark";

function setTheme(th) {
  document.documentElement.style.setProperty('--bg', th === "dark" ? '#0b0b0f' : '#f7f7fb');
  document.documentElement.style.setProperty('--card', th === "dark" ? '#121222' : '#ffffff');
  document.documentElement.style.setProperty('--text', th === "dark" ? '#e6e6f0' : '#11121a');
  document.documentElement.style.setProperty('--muted', th === "dark" ? '#9aa0aa' : '#5a5f6b');
  localStorage.setItem("theme", th);
}

document.addEventListener("click", e => {
  if (e.target.closest("[data-theme]")) {
    theme = theme === "dark" ? "light" : "dark";
    setTheme(theme);
  }
});

// ==========================================
// Three.js
// ==========================================
let renderer, scene, camera, points;

function init3D() {
  const canvas = document.getElementById("bg");
  if (!canvas) return;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const geometry = new THREE.BufferGeometry();
  const N = 4000;
  const positions = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ size: 0.02, color: 0xffffff });
  points = new THREE.Points(geometry, material);
  scene.add(points);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (points) {
    points.rotation.y += 0.0008;
    points.rotation.x += 0.0004;
  }
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// ==========================================
// Carousel
// ==========================================
function setupCarousel() {
  const track = document.querySelector(".track");
  if (!track) return;

  let isDown = false, startX, scrollLeft;
  track.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener("mouseleave", () => isDown = false);
  track.addEventListener("mouseup", () => isDown = false);
  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
}

// ==========================================
// Typing Effect
// ==========================================
(function typing() {
  const el = document.getElementById("type");
  if (!el) return;

  const words = ["Developer", "Pianist", "Admin", "Dreamer"];
  let i = 0, j = 0, dir = 1;

  function tick() {
    el.textContent = words[i].slice(0, j);
    j += dir;
    if (j > words[i].length + 6) { dir = -1; }
    if (j < 0) { dir = 1; i = (i + 1) % words.length; }
    setTimeout(tick, 90);
  }
  tick();
})();

// ==========================================
// Scroll Reveal
// ==========================================
const obs = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.style.transform = "translateY(0) scale(1)";
      e.target.style.opacity = 1;
    }
  }
}, { threshold: 0.2 });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    el.style.transform = "translateY(18px) scale(.98)";
    el.style.opacity = 0;
    el.style.transition = "all .7s ease";
    obs.observe(el);
  });
});

// ==========================================
// Contact Copy
// ==========================================
function setupContactCopy() {
  document.querySelectorAll(".contact-field").forEach(field => {
    field.addEventListener("click", async () => {
      const text = field.getAttribute("data-copy");
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        field.classList.add("copied");
        const hint = field.querySelector(".copy-hint");
        if (hint) hint.textContent = "✅";
        setTimeout(() => {
          field.classList.remove("copied");
          if (hint) hint.textContent = "📋";
        }, 2000);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        field.classList.add("copied");
        setTimeout(() => field.classList.remove("copied"), 2000);
      }
    });
  });
}

// ==========================================
// Mobile Menu
// ==========================================
function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("active"));
    links.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => links.classList.remove("active"));
    });
  }
}

// ==========================================
// Counter Animation
// ==========================================
function animateCounters() {
  document.querySelectorAll(".glass-number").forEach(counter => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / 60));
    let current = 0;

    const update = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        return;
      }
      counter.textContent = current.toLocaleString();
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          update();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counter);
  });
}

// ==========================================
// Onload
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  setTheme(theme);
  applyLang();
  setupCarousel();
  setupContactCopy();
  setupMobileMenu();
  animateCounters();
  init3D();
});
