const i18n = {
  en: {
    kicker: "Portfolio / Musician & Full-Stack Learner",
    h1a: "Mehrad",
    h1b: "Haratian",
    sub: "Self-taught web developer (HTML/CSS/JS), admin for a 10k+ YouTube channel, and 5-year pianist.",
    mohsen:"HTML5, CSS3, Modern JS (ES6+), responsive design, accessibility, SEO, performance",
    marquee:"MEHRAD • Dev • Pianist • Admin • Problem Solver • Security Curious",
    admin: "YouTube channel admin (10k+ Member), community moderation, content planning, analytics.",
    ops: "Youtube Ops",
    music3: "Music",
    music2:"5 years of piano. Studio & stage recording, ensemble with teachers, genre: Persian to classical.",
    see: "see projects",
    cta: "Download Resume",
    skils: "Skills",
    skills: "Signature Skills",
    projects: "Selected Projects",
    contact: "Contact",
    footer: "Made with grit, coffee, and late-night code.",
    formTitle: "Let's talk",
    formSub: "Business / collab / gigs",
    name: "Your name",
    email: "Email",
    message: "Message",
    send: "Send",
    sent: "Thanks! Your message is flying ✈️",
    liveTitle: "Live Session",
    liveStatus: "Coming Soon...",
    liveSub: "New performances are being prepared",
  },
  fa: {
    kicker: "رزومه / موزیسین و توسعه‌دهنده وب",
    h1a: "مهراد",
    h1b: "هراتیان",
    sub: "توسعه‌دهنده خودآموخته وب (HTML/CSS/JS)، ادمین یک کانال یوتیوب ۱۰K+ و پیانیست.",
    mohsen:" اله الا الله",
    marquee:"مهراد • برنامه نویس • پیانیست • ادمین • علاقه مند به امنیت و هک",
    admin: "ادمین کانال یوتیوب (با بیش از ۱۰ هزار عضو)، مدیریت انجمن، برنامه‌ریزی محتوا، تجزیه و تحلیل.",
    ops: "امور یوتیوب",
    music3: "موسیقی",
    music2: "تجربه ۵ ساله در پیانو. ضبط استودیویی و صحنه‌ای، گروه‌نوازی با اساتید، سبک: ایرانی تا کلاسیک.",
    see: "دیدن پروژه ها",
    cta: "دانلود رزومه",
    skills: "مهارت‌های شاخص",
    skils:"مهارت ها",
    projects: "پروژه‌های منتخب",
    contact: "تماس",
    footer: "ساخته شده با تلاش، قهوه و کدهای نیمه‌شب.",
    formTitle: "در تماس باشیم",
    formSub: "همکاری / پروژه / اجرا",
    name: "نام شما",
    email: "ایمیل",
    message: "پیام",
    send: "ارسال",
    sent: "مرسی! پیام شما پرواز کرد ✈️",
    liveTitle: "اجرای زنده",
    liveStatus: "به زودی...",
    liveSub: "اجراهای جدید در حال آماده‌سازی",
  }
};

let lang = localStorage.getItem("lang") || "en";
const t = (k) => i18n[lang][k];

// Apply language strings
function applyLang(){
  document.querySelectorAll("[data-i]").forEach(el => {
    const key = el.getAttribute("data-i");
    el.textContent = t(key);
  });
  document.dir = (lang === "fa" ? "rtl" : "ltr");
}

// Toggle language
document.addEventListener("click", (e)=>{
  const trg = e.target.closest("[data-lang]");
  if(trg){
    lang = trg.getAttribute("data-lang");
    localStorage.setItem("lang", lang);
    applyLang();
  }
});

// Theme toggle
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let theme = localStorage.getItem("theme") || (prefersDark ? "dark":"dark");
function setTheme(th){
  document.documentElement.style.setProperty('--bg', th==="dark" ? '#0b0b0f':'#f7f7fb');
  document.documentElement.style.setProperty('--bg-soft', th==="dark" ? '#101018':'#ffffff');
  document.documentElement.style.setProperty('--card', th==="dark" ? '#121222':'#ffffff');
  document.documentElement.style.setProperty('--text', th==="dark" ? '#e6e6f0':'#11121a');
  document.documentElement.style.setProperty('--muted', th==="dark" ? '#9aa0aa':'#5a5f6b');
  localStorage.setItem("theme", th);
}
document.addEventListener("click", e=>{
  if(e.target.closest("[data-theme]")){
    theme = theme==="dark" ? "light" : "dark";
    setTheme(theme);
  }
});

// Three.js animated background (particle nebula)
let renderer, scene, camera, points;
function init3D(){
  const canvas = document.getElementById("bg");
  if (!canvas) return;
  renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, .1, 1000);
  camera.position.z = 5;

  const geometry = new THREE.BufferGeometry();
  const N = 4000;
  const positions = new Float32Array(N*3);
  for(let i=0;i<N;i++){
    positions[i*3+0] = (Math.random()-0.5)*8;
    positions[i*3+1] = (Math.random()-0.5)*8;
    positions[i*3+2] = (Math.random()-0.5)*8;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ size: 0.02, color: 0xffffff });
  points = new THREE.Points(geometry, material);
  scene.add(points);

  window.addEventListener("resize", ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });

  animate();
}
function animate(){
  requestAnimationFrame(animate);
  if (points) {
    points.rotation.y += 0.0008;
    points.rotation.x += 0.0004;
  }
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// Simple carousel
function setupCarousel(){
  const track = document.querySelector(".track");
  if (!track) return;
  let isDown=false, startX, scrollLeft;
  track.addEventListener("mousedown", (e)=>{isDown=true; startX=e.pageX-track.offsetLeft; scrollLeft=track.scrollLeft;});
  track.addEventListener("mouseleave", ()=> isDown=false);
  track.addEventListener("mouseup", ()=> isDown=false);
  track.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
}

// Contact form - REMOVED (replaced with contact info fields)
// function setupForm() - حذف شد چون دیگه نیازی نیست

// Register SW
if("serviceWorker" in navigator){
  window.addEventListener("load", ()=> navigator.serviceWorker.register("./service-worker.js"));
}

// Onload
window.addEventListener("DOMContentLoaded", ()=>{
  setTheme(theme);
  applyLang();
  setupCarousel();
  // setupForm(); <-- این خط رو حذف کن
  init3D();
});

// Typing effect
(function typing(){
  const el = document.getElementById("type");
  if (!el) return;
  const words = ["Developer", "Pianist", "Admin", "Dreamer"];
  let i=0, j=0, dir=1;
  function tick(){
    el.textContent = words[i].slice(0,j);
    j+=dir;
    if(j>words[i].length+6){dir=-1}
    if(j<0){dir=1; i=(i+1)%words.length}
    setTimeout(tick, 90);
  }
  tick();
})();

// Scroll reveal
const obs = new IntersectionObserver((entries)=>{
  for(const e of entries){
    if(e.isIntersecting) e.target.style.transform="translateY(0) scale(1)";
    e.target.style.opacity= e.isIntersecting?1:0;
  }
},{threshold:.2});
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".reveal").forEach(el=>{
    el.style.transform="translateY(18px) scale(.98)";
    el.style.opacity=0;
    el.style.transition="all .7s ease";
    obs.observe(el);
  });
});

// ===== Contact Copy Feature =====
document.addEventListener("DOMContentLoaded", () => {
  const fields = document.querySelectorAll(".contact-field");
  
  fields.forEach(field => {
    field.addEventListener("click", async () => {
      const text = field.getAttribute("data-copy");
      if (!text) return;
      
      try {
        await navigator.clipboard.writeText(text);
        
        // افکت کپی شدن
        field.classList.add("copied");
        const hint = field.querySelector(".copy-hint");
        if (hint) hint.textContent = "✅";
        
        // برگشت به حالت عادی بعد از ۲ ثانیه
        setTimeout(() => {
          field.classList.remove("copied");
          if (hint) hint.textContent = "📋";
        }, 2000);
        
      } catch (err) {
        console.log("Copy failed:", err);
        // روش جایگزین برای مرورگرهای قدیمی
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
});
