document.addEventListener('DOMContentLoaded', function() {
  // Initialize slider
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  const slideCount = slides.length;

  // Set initial slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Auto-rotate slides (optional)
  let slideInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  const slider = document.querySelector('.slider');
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  
  searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      alert(`Searching for: ${searchTerm}`);
      // In a real implementation, you would filter games or make an API call
    }
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = '';
        // In a real implementation, you would send this to your server
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Skip if it's a play button link
      if (this.classList.contains('play-btn') || this.parentElement.classList.contains('play-btn')) {
        return;
      }
      
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('show');
          navButtons.classList.remove('show');
        }
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  
  const headerContainer = document.querySelector('.header-container');
  headerContainer.prepend(mobileMenuBtn);
  
  const navLinks = document.querySelector('.nav-links');
  const navButtons = document.querySelector('.nav-buttons');
  
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('show');
    navButtons.classList.toggle('show');
  });
  
  // Check screen size and adjust menu
  function checkScreenSize() {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('show');
      navButtons.classList.remove('show');
      mobileMenuBtn.style.display = 'block';
    } else {
      mobileMenuBtn.style.display = 'none';
      navLinks.classList.add('show');
      navButtons.classList.add('show');
    }
  }
  
  window.addEventListener('resize', checkScreenSize);
  checkScreenSize();
  
  // Play button animations
  const playButtons = document.querySelectorAll('.play-btn');
  playButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 5px 15px rgba(12, 190, 234, 0.5)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
});