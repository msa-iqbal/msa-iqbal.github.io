// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYearElements = document.querySelectorAll("#currentYear");
  currentYearElements.forEach((el) => {
    if (el) el.textContent = new Date().getFullYear();
  });

  // Theme toggle functionality
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.className = savedTheme === "light-mode" ? "light-mode" : "dark-mode";
  } else {
    // Use system preference as default
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      body.className = "light-mode";
    } else {
      body.className = "dark-mode";
    }
  }

  // Toggle theme when button is clicked
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLightMode = body.classList.contains("light-mode");

      if (isLightMode) {
        body.classList.replace("light-mode", "dark-mode");
        localStorage.setItem("theme", "dark-mode");
      } else {
        body.classList.replace("dark-mode", "light-mode");
        localStorage.setItem("theme", "light-mode");
      }
    });
  }

  // Share functionality
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      try {
        if (navigator.share) {
          await navigator.share({
            title: document.title,
            text: "Check out my portfolio!",
            url: window.location.href,
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard!");
        }
      } catch (err) {
        console.error("Error sharing:", err);
      }
    });
  }

  // Initialize particle animation
  initParticleAnimation();

  // Portfolio filter functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        // Filter portfolio items
        portfolioItems.forEach((item) => {
          if (
            filter === "all" ||
            item.getAttribute("data-category") === filter
          ) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 100);
          } else {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-progress-bar");
  if (skillBars.length > 0) {
    const animateSkills = () => {
      skillBars.forEach((bar) => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (barPosition < screenPosition) {
          const width =
            bar.parentElement.previousElementSibling.lastElementChild
              .textContent;
          bar.style.setProperty("--skill-percent", width);
        }
      });
    };

    window.addEventListener("scroll", animateSkills);
    // Initial check
    setTimeout(animateSkills, 500);
  }

  // Track link clicks (for analytics purposes)
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      // Don't track internal links
      if (this.hostname === window.location.hostname) return;

      const linkText = this.textContent.trim();
      const linkHref = this.href;

      console.log(`Link clicked: ${linkText} (${linkHref})`);
      // In a real implementation, you would send this data to your analytics service
    });
  });

  // Add jump to top button
  const jumpToTopContainer = document.body;
  const jumpToTopBtn = document.createElement("button");
  jumpToTopBtn.className = "jump-to-top";
  jumpToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  jumpToTopBtn.setAttribute("aria-label", "Jump to top");
  jumpToTopBtn.setAttribute("title", "Jump to top");
  jumpToTopContainer.appendChild(jumpToTopBtn);

  // Show/hide jump to top button on scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      jumpToTopBtn.classList.add("visible");
    } else {
      jumpToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when button is clicked
  jumpToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Particle animation
function initParticleAnimation() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let mouseX = 0;
  let mouseY = 0;
  let width, height;
  const isDarkMode = document.body.classList.contains("dark-mode");

  // Set canvas dimensions
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createParticles();
  }

  // Create particles
  function createParticles() {
    particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 10000), 150);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: getParticleColor(),
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.2,
        connected: [],
      });
    }
  }

  // Get particle color based on theme
  function getParticleColor() {
    const darkColors = [
      "#7c3aed",
      "#a78bfa",
      "#c4b5fd",
      "#4f46e5",
      "#2563eb",
      "#06b6d4",
      "#10b981",
      "#ec4899",
      "#f59e0b",
    ];
    const lightColors = [
      "#7c3aed",
      "#a78bfa",
      "#c4b5fd",
      "#4f46e5",
      "#2563eb",
      "#06b6d4",
      "#10b981",
      "#ec4899",
      "#f59e0b",
    ];

    const colors = isDarkMode ? darkColors : lightColors;
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Draw particles
  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((p, i) => {
      // Move particle
      p.x += Math.cos(p.direction) * p.speed;
      p.y += Math.sin(p.direction) * p.speed;

      // Bounce off edges
      if (p.x < 0 || p.x > width) {
        p.direction = Math.PI - p.direction;
      }
      if (p.y < 0 || p.y > height) {
        p.direction = -p.direction;
      }

      // Slight attraction to mouse
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * 0.2;
        p.y += Math.sin(angle) * 0.2;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      // Reset connections
      p.connected = [];
    });

    // Draw connections between particles
    ctx.globalAlpha = 0.2;
    particles.forEach((p1, i) => {
      particles.forEach((p2, j) => {
        if (i !== j && !p1.connected.includes(j) && !p2.connected.includes(i)) {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            p1.connected.push(j);
            p2.connected.push(i);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    });

    requestAnimationFrame(drawParticles);
  }

  // Initialize
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  drawParticles();
}

// Logo Dark/Light

document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("themeLogo");
  if (!logo) return;

  // Detect if we're on a subpage (about.html, etc.)
  const isSubPage = window.location.pathname.includes("/pages/");

  function setLogoByTheme() {
    const isDark = document.body.classList.contains("dark-mode");
    const basePath = isSubPage ? "../public/images/" : "./public/images/";
    logo.src = isDark
      ? basePath + "white-logo.svg"
      : basePath + "black-logo.svg";
  }

  // Initial set
  setLogoByTheme();

  // Listen for theme changes
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTimeout(setLogoByTheme, 10); // Wait for class to update
    });
  }
});
