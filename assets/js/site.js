function toggleMobileMenu() {
  document.getElementById("navLinks").classList.toggle("open");
  document.getElementById("mobileToggle").classList.toggle("open");
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 15 + 10 + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.width = Math.random() * 4 + 2 + "px";
    particle.style.height = particle.style.width;
    const colors = ["var(--accent-purple)", "var(--accent-cyan)"];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(particle);
  }
}

function initTypingEffect() {
  const text =
    '"الذكاء الاصطناعي التوليدي ليس مجرد أداة، إنه شريك إبداعي يفتح آفاقاً جديدة للخيال البشري."';
  const el = document.querySelector("#typingText span");
  if (!el) return;
  let i = 0;
  el.textContent = "";
  function typeChar() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 50);
    }
  }
  setTimeout(typeChar, 800);
}

function animateCounters() {
  document.querySelectorAll(".stat-number").forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function update() {
      current += step;
      if (current >= target) {
        counter.textContent = target + "+";
      } else {
        counter.textContent = Math.floor(current) + "+";
        requestAnimationFrame(update);
      }
    }

    // Use IntersectionObserver to trigger when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            update();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counter);
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => {
    el.classList.remove("visible");
    observer.observe(el);
  });
}

function switchMediaTab(tab) {
  document
    .querySelectorAll(".media-tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".media-content")
    .forEach((c) => c.classList.remove("active"));

  event.target.classList.add("active");
  document.getElementById("tab-" + tab).classList.add("active");

  if (tab === "audio") {
    setTimeout(initAudioVisualizers, 100);
  }
  if (tab === "video") {
    setTimeout(initVideoCanvases, 100);
  }
}

// ==================== LIGHTBOX ====================
function openLightbox(item) {
  const img = item.querySelector("img");
  document.getElementById("lightboxImg").src = img.src;
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ==================== DIFFUSION ANIMATION ====================
function initDiffusionAnimation() {
  const fills = document.querySelectorAll(".step-bar-fill");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.style.width;
          fill.style.width = "0%";
          setTimeout(() => {
            fill.style.width = targetWidth;
          }, 200);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach((fill) => observer.observe(fill));
}

// ========= Enhanced image ================
// ==================== BEFORE / AFTER SLIDER ====================
function initBeforeAfterSlider() {
  const range = document.getElementById("comparisonRange");
  const afterImage = document.getElementById("comparisonAfter");
  const divider = document.getElementById("comparisonDivider");

  if (!range || !afterImage || !divider) return;

  function updateComparison(value) {
    afterImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    divider.style.left = value + "%";
  }

  range.addEventListener("input", function () {
    updateComparison(this.value);
  });

  updateComparison(range.value);
}

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes("/")) {
    const pathParts = path.split("/");
    if (pathParts[1] && !pathParts[1].includes(".")) {
      return "/" + pathParts[1] + "/";
    }
  }
  return "/";
}
// ==================== CUSTOM VIDEO PLAYER ====================
function initCustomVideoPlayer() {
  const player = document.getElementById("customVideoPlayer");
  const video = document.getElementById("aiProcessVideo");
  const mainPlay = document.getElementById("videoMainPlay");
  const playPauseBtn = document.getElementById("videoPlayPause");
  const progressRange = document.getElementById("videoProgressRange");
  const currentTimeEl = document.getElementById("videoCurrentTime");
  const durationEl = document.getElementById("videoDuration");
  const muteBtn = document.getElementById("videoMuteBtn");
  const fullscreenBtn = document.getElementById("videoFullscreenBtn");

  if (
    !player ||
    !video ||
    !mainPlay ||
    !playPauseBtn ||
    !progressRange ||
    !currentTimeEl ||
    !durationEl ||
    !muteBtn ||
    !fullscreenBtn
  ) {
    return;
  }

  function formatTime(time) {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function updatePlayState() {
    if (video.paused) {
      playPauseBtn.textContent = "▶";
      mainPlay.classList.remove("hidden");
      player.classList.remove("playing");
    } else {
      playPauseBtn.textContent = "⏸";
      mainPlay.classList.add("hidden");
      player.classList.add("playing");
    }
  }

  function togglePlay() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  mainPlay.addEventListener("click", togglePlay);
  playPauseBtn.addEventListener("click", togglePlay);

  video.addEventListener("click", togglePlay);

  video.addEventListener("loadedmetadata", function () {
    durationEl.textContent = formatTime(video.duration);
  });

  video.addEventListener("timeupdate", function () {
    const progress = (video.currentTime / video.duration) * 100 || 0;
    progressRange.value = progress;
    currentTimeEl.textContent = formatTime(video.currentTime);
  });

  progressRange.addEventListener("input", function () {
    const newTime = (progressRange.value / 100) * video.duration;
    video.currentTime = newTime;
  });

  muteBtn.addEventListener("click", function () {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
  });

  fullscreenBtn.addEventListener("click", function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      player.requestFullscreen();
    }
  });

  video.addEventListener("play", updatePlayState);
  video.addEventListener("pause", updatePlayState);
  video.addEventListener("ended", function () {
    video.currentTime = 0;
    updatePlayState();
  });

  updatePlayState();
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  initTypingEffect();
  animateCounters();
  initScrollAnimations();
  initDiffusionAnimation();
  initCustomVideoPlayer();
  initLottieAnimations();
  initBeforeAfterSlider();
  LoadNavigation(window.location.pathname);
  LoadFooter();
});

function initLottieAnimations() {
  const heroLottie = document.getElementById("heroLottie");

  if (!heroLottie || typeof lottie === "undefined") return;

  lottie.loadAnimation({
    container: heroLottie,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/Lottiefiles/GenroGenerator.json",
  });
}

function LoadNavigation(page) {
  const container = document.querySelector("#nav-container");
  // debugger;
  const pathname = getBasePath();
  console.log(pathname);

  if (container) {
    container.innerHTML = `
  <nav class="navbar" id="navbar">
      <div class="nav-container">
        <a href="${pathname}" class="logo">
          <img
            src="assets/imgs/logo/logoMark_colored.svg"
            alt="Gerenova Logo"
            class="logo-icon"
          />
          <span class="logo-text">Gerenova</span>
        </a>
        <ul class="nav-links" id="navLinks">
          <li>
            <a
              class="nav-link ${page == "/" ? "active" : ""}"
              data-page="home"
              href="${pathname}"
              >الرئيسية</a
            >
          </li>
          <li>
            <a class="nav-link ${page.includes("tools") ? "active" : ""}" 
            data-page="tools" 
            href="${pathname}tools.html"
              >الأدوات</a
            >
          </li>
          <li>
            <a 
            class="nav-link ${page.includes("gallery") ? "active" : ""}"
            data-page="media" href="${pathname}gallery.html"
              >المعرض</a
            >
          </li>
          <li>
            <a
            class="nav-link ${page.includes("how") ? "active" : ""}"
              data-page="howItWorks"
              href="${pathname}how.html"
              >كيف يعمل</a
            >
          </li>
        </ul>
        <div
          class="mobile-toggle"
          id="mobileToggle"
          onclick="toggleMobileMenu()"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  `;
  }
}

function LoadFooter() {
  const footer = document.querySelector("#footer-container");
  const pathname = getBasePath();

  if (footer) {
    footer.innerHTML = `
    <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <a href="${pathname}" class="logo">
          <img
            src="assets/imgs/logo/logoMark_colored.svg"
            alt="Gerenova AI Logo"
            class="logo-icon"
          />
          <span class="logo-text">Gerenova</span>
        </a>
        <p>
          منصة تعليمية شاملة تهدف إلى تعريف المطورين والمصممين والطلاب بعالم
          الذكاء الاصطناعي التوليدي وتقنياته المتقدمة.
        </p>
      </div>
      <div class="footer-col">
        <h4>الصفحات</h4>
        <ul>
          <li><a href='${pathname}'>الرئيسية</a></li>
          <li><a href='${pathname}tools.html'>الأدوات</a></li>
          <li><a href='${pathname}gallery.html'>المعرض</a></li>
          <li><a href='${pathname}how.html'>كيف يعمل</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>الأدوات</h4>
        <ul>
          <li><a>Midjourney</a></li>
          <li><a>DALL-E 3</a></li>
          <li><a>Runway ML</a></li>
          <li><a>ElevenLabs</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>مصادر إضافية</h4>
        <ul>
          <li><a>التوثيق الفني</a></li>
          <li><a>الأسئلة الشائعة</a></li>
          <li><a>المدونة</a></li>
          <li><a>اتصل بنا</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Gerenova | جميع الحقوق محفوظة</p>
    </div>
  </footer>
    `;
  }
}
