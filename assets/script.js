// Particle System
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.resize();
    this.init();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
      this.ctx.fill();
    });

    // Connect nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${
            0.1 * (1 - distance / 100)
          })`;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.update());
  }
}

// Initialize particles
const particleSystem = new ParticleSystem(
  document.getElementById("particles-canvas")
);
particleSystem.update();

// Typing animation
const typingText = document.getElementById("typing-text");
const words = ["Code", "Design", "Photography", "Storytelling"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeWriter, isDeleting ? 50 : 100);
}

typeWriter();

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      // Animate skill bars
      if (entry.target.classList.contains("skill-card")) {
        const progressBar = entry.target.querySelector(".skill-progress");
        const width = progressBar.getAttribute("data-width");
        setTimeout(() => {
          progressBar.style.width = width + "%";
        }, 300);
      }
    }
  });
}, observerOptions);

// Observe elements
document
  .querySelectorAll(".section-title, .about-text, .skill-card, .project-card")
  .forEach((el) => {
    observer.observe(el);
  });

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update scroll indicator
  const scrollPercent =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  scrollIndicator.style.width = scrollPercent + "%";
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Animate button
    const button = this.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Sending...";
    button.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      button.textContent = "Message Sent!";
      button.style.background =
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = "";
        this.reset();
      }, 2000);
    }, 1500);
  });

// Add mouse parallax effect
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  document.querySelectorAll(".floating-element").forEach((element, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed * 50;
    const y = (mouseY - 0.5) * speed * 50;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });
});
