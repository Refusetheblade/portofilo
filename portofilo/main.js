// Initialize Lucide icons
lucide.createIcons();

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('[data-lucide]');
const html = document.documentElement;

function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  themeIcon.setAttribute('data-lucide', newTheme === 'dark' ? 'sun' : 'moon');
  
  // Save theme preference
  localStorage.setItem('theme', newTheme);
  
  // Reinitialize icons after theme change
  lucide.createIcons();
}

// Set initial theme based on saved preference or system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  html.setAttribute('data-theme', theme);
  themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
  lucide.createIcons();
}

themeToggle.addEventListener('click', toggleTheme);
initializeTheme();

// Smooth scroll function
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = '0.2s';
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all project cards and skill items
document.querySelectorAll('.project-card, .skill-item').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// Contact form handling with enhanced feedback
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value
  };

  // Add loading state to button
  const submitButton = this.querySelector('.submit-button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  // Simulate sending (replace with actual API call)
  setTimeout(() => {
    console.log('Form submitted:', formData);
    
    // Reset form
    this.reset();
    
    // Reset button
    submitButton.textContent = 'Message Sent!';
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    successMessage.style.color = 'var(--primary-color)';
    successMessage.style.textAlign = 'center';
    successMessage.style.marginTop = '1rem';
    successMessage.style.animation = 'fadeIn 0.5s ease-out';
    
    this.appendChild(successMessage);
    
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }, 1500);
});


setTimeout(() => { document.title = "$"; }, 1000);
setTimeout(() => { document.title = "$$"; }, 1000);
setTimeout(() => { document.title = "$$$"; }, 1000);