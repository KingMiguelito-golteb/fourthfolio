
const buttons = document.querySelectorAll(".tab-btn");
const pages = document.querySelectorAll(".page");
const pagesWrapper = document.querySelector(".pages");

function updateHeight() {
  const activePage = document.querySelector(".page.active");
  if (activePage) {
    pagesWrapper.style.height = activePage.scrollHeight + "px";
  }
}


window.addEventListener("load", updateHeight);

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
 
    buttons.forEach(b => b.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    const targetPage = document.getElementById(btn.dataset.target);
    targetPage.classList.add("active");


    requestAnimationFrame(() => {
      updateHeight();
    });
  });
});


window.addEventListener("resize", updateHeight);

  const reveals = document.querySelectorAll(".reveal");

  window.addEventListener("scroll", () => {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 100; // trigger point

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  });
  
  /* ===== Preloader Clouds ===== */
const containerElement = document.getElementById('cloudContainer');
containerElement.innerHTML += `
  <div class="cloud">
      <div class="cloudBubble1"></div>
      <div class="cloudBubble2"></div>
  </div>`.repeat(15);

const elements = document.getElementsByClassName('cloud');
for (let j = 0; j < elements.length; j++) {
  const element = elements[j];
  element.style.top = (Math.random() * 100) + '%';
  element.style.left = (Math.random() * 100) + '%';
  element.style.transform = "scale(" + ((Math.random() * 0.7) + 0.3) + ")";
  const intervalTimeInSeconds = (Math.random() * 20) + 6;
  element.style.transition = "all linear " + intervalTimeInSeconds + "s";
  const startRight = Math.random() > 0.5;
  setTimeout(() => {
    element.style.left = startRight ? '100%' : '-50%';
  }, 1000);
  let i = startRight ? 1 : 0;
  setInterval(() => {
    element.style.left = (i % 2 === 0) ? '100%' : '-50%';
    i += 1;
  }, intervalTimeInSeconds * 1000);
}



/* ===== Loading Progress ===== */
let percent = 0;
const loadingText = document.getElementById('loading-text');
const portfolio = document.getElementById('portfolio');
const cloudContainer = document.getElementById('cloudContainer');

// Lock scroll while loading
document.body.classList.add("loading");

let loadingInterval = setInterval(() => {
  percent++;
  loadingText.textContent = percent + "%";

  if (percent >= 100) {
    clearInterval(loadingInterval);
    cloudContainer.classList.add('fade-out');

    // Wait for fade-out animation, then remove it completely
    setTimeout(() => {
      cloudContainer.style.display = "none";
      portfolio.style.display = "block";
      document.body.classList.remove("loading");
      
      // Nuclear option: Force About section to show with multiple approaches
      const aboutSection = document.getElementById("about");
      
      // Remove any conflicting classes first
      aboutSection.classList.remove("reveal", "active", "visible");
      
      // Reset and force display - we'll use a helper function for !important styles
      applyImportantStyles(aboutSection, {
        display: "block",
        opacity: "1",
        visibility: "visible",
        height: "auto",
        overflow: "visible"
      });
      
      // Add back necessary classes after a tiny delay
      setTimeout(() => {
        aboutSection.classList.add("active", "visible");
      }, 50);
      
      // Force a reflow to ensure rendering
      void aboutSection.offsetHeight;
    }, 1000);
  }
}, 50);


function applyImportantStyles(element, styles) {
  for (const property in styles) {
    element.style.setProperty(property, styles[property], 'important');
  }
}

/* ===== Scroll Reveal Effect ===== */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
});

/* ===== Sidebar Toggle ===== */
const close = document.getElementById("closeSidebarBtn");
const open = document.getElementById("openSidebarBtn");
const sidebar = document.getElementById("sidebar");

close.addEventListener('click', function () {
  sidebar.style.left = '-250px';
});

open.addEventListener('click', function () {
  sidebar.style.left = '0px';
});
