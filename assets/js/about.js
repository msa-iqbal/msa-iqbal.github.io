document.addEventListener("DOMContentLoaded", () => {
  // Animate sections on scroll
  const sections = document.querySelectorAll(".about-section")
  const interestItems = document.querySelectorAll(".interest-item")
  const aboutCards = document.querySelectorAll(".about-card")
  const flickrImages = document.querySelectorAll(".flickr-image")
  const toolkitItems = document.querySelectorAll(".toolkit-item")

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
  }

  // Function to animate elements when they come into view
  function animateOnScroll() {
    sections.forEach((section) => {
      if (isInViewport(section) && !section.classList.contains("animated")) {
        section.classList.add("animated")
      }
    })

    interestItems.forEach((item, index) => {
      if (isInViewport(item) && !item.classList.contains("animated")) {
        setTimeout(() => {
          item.classList.add("animated")
        }, index * 100)
      }
    })

    aboutCards.forEach((card, index) => {
      if (isInViewport(card) && !card.classList.contains("animated")) {
        setTimeout(() => {
          card.classList.add("animated")
        }, index * 100)
      }
    })

    flickrImages.forEach((image, index) => {
      if (isInViewport(image) && !image.classList.contains("animated")) {
        setTimeout(() => {
          image.classList.add("animated")
        }, index * 100)
      }
    })

    toolkitItems.forEach((item, index) => {
      if (isInViewport(item) && !item.classList.contains("animated")) {
        setTimeout(() => {
          item.classList.add("animated")
        }, index * 100)
      }
    })
  }

  // Initial check
  setTimeout(animateOnScroll, 100)

  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll)

  // Animate emoji
  const emoji = document.querySelector(".emoji")
  if (emoji) {
    emoji.style.display = "inline-block"
    emoji.style.animation = "bounce 2s infinite"
  }

  // Animate toolkit items on hover
  toolkitItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const icon = item.querySelector(".toolkit-icon")
      icon.style.transform = "rotate(10deg)"
    })

    item.addEventListener("mouseleave", () => {
      const icon = item.querySelector(".toolkit-icon")
      icon.style.transform = "rotate(0deg)"
    })
  })
})
