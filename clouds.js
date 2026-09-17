// Archive Portfolio — Main interactions
// Tabs, reveal, preloader, clouds

// ===== Tabs (Projects / Certificates / Tech Stack) =====
const buttons = document.querySelectorAll(".tab-btn");
const pages = document.querySelectorAll(".page");
const pagesWrapper = document.querySelector(".pages");

function updateHeight() {
  if (!pagesWrapper) return;
  const activePage = document.querySelector(".page.active");
  if (activePage) {
    // let CSS handle height on mobile via auto; only set on desktop if needed
    pagesWrapper.style.height = activePage.scrollHeight + "px";
  }
}
window.addEventListener("load", updateHeight);
window.addEventListener("resize", updateHeight);

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    pages.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    const target = document.getElementById(btn.dataset.target);
    if (target) target.classList.add("active");
    requestAnimationFrame(updateHeight);
    // smooth scroll to projects on mobile after tab switch
    if (window.innerWidth < 768) {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  // keyboard a11y handled in index.html, but keep click via Enter/Space here too
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      btn.click();
    }
  });
});

// ===== Scroll Reveal =====
const reveals = document.querySelectorAll(".reveal");
function handleReveal() {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
}
// also support .visible class used by some sections
function handleVisible() {
  document.querySelectorAll(".reveal").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) el.classList.add("visible");
  });
}
window.addEventListener("scroll", () => {
  handleReveal();
  handleVisible();
}, { passive: true });
window.addEventListener("load", () => {
  handleReveal();
  handleVisible();
});

// ===== Preloader Clouds =====
const containerElement = document.getElementById('cloudContainer');
if (containerElement) {
  // add extra clouds
  containerElement.innerHTML += `
    <div class="cloud">
        <div class="cloudBubble1"></div>
        <div class="cloudBubble2"></div>
    </div>`.repeat(12);

  const elements = document.getElementsByClassName('cloud');
  for (let j = 0; j < elements.length; j++) {
    const element = elements[j];
    element.style.top = (Math.random() * 100) + '%';
    element.style.left = (Math.random() * 100) + '%';
    element.style.transform = "scale(" + ((Math.random() * 0.6) + 0.4) + ")";
    const intervalTimeInSeconds = (Math.random() * 12) + 8;
    element.style.transition = "all linear " + intervalTimeInSeconds + "s";
    const startRight = Math.random() > 0.5;
    setTimeout(() => {
      element.style.left = startRight ? '100%' : '-50%';
    }, 800);
    let i = startRight ? 1 : 0;
    setInterval(() => {
      element.style.left = (i % 2 === 0) ? '100%' : '-50%';
      i += 1;
    }, intervalTimeInSeconds * 1000);
  }
}

// ===== Loading Progress =====
let percent = 0;
const loadingText = document.getElementById('loading-text');
const portfolio = document.getElementById('portfolio');
const cloudContainer = document.getElementById('cloudContainer');

if (loadingText && portfolio && cloudContainer) {
  document.body.classList.add("loading");
  // Safety: if JS fails or takes too long, force show after 6s
  let forceShow = setTimeout(finishLoading, 6000);

  let loadingInterval = setInterval(() => {
    percent++;
    if (loadingText) loadingText.textContent = percent + "%";
    if (percent >= 100) {
      clearInterval(loadingInterval);
      clearTimeout(forceShow);
      finishLoading();
    }
  }, 28); // ~2.8s total for snappier feel

  function finishLoading() {
    clearInterval(loadingInterval);
    cloudContainer.classList.add('fade-out');
    setTimeout(() => {
      cloudContainer.style.display = "none";
      portfolio.style.display = "block";
      // trigger CSS transition
      requestAnimationFrame(() => portfolio.classList.add('show'));
      document.body.classList.remove("loading");
      handleReveal();
      handleVisible();
      updateHeight();
      // update header offset if banner logic exists
      if (typeof updateLayoutOffset === 'function') {
        try { updateLayoutOffset(); } catch(e) {}
      }
    }, 700);
  }

  function applyImportantStyles(element, styles) {
    if (!element) return;
    for (const property in styles) {
      element.style.setProperty(property, styles[property], 'important');
    }
  }
}

// ===== Sidebar Toggle (guarded — sidebar may not exist on main index) =====
const closeBtn = document.getElementById("closeSidebarBtn");
const openBtn = document.getElementById("openSidebarBtn");
const sidebar = document.getElementById("sidebar");
if (closeBtn && sidebar) {
  closeBtn.addEventListener('click', function () {
    sidebar.style.left = '-250px';
  });
}
if (openBtn && sidebar) {
  openBtn.addEventListener('click', function () {
    sidebar.style.left = '0px';
  });
}

// Fallback: if preloader is disabled (noscript or reduced-motion), ensure portfolio shows
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  if (cloudContainer) cloudContainer.style.display = 'none';
  if (portfolio) {
    portfolio.style.display = 'block';
    portfolio.classList.add('show');
  }
  document.body.classList.remove('loading');
}
