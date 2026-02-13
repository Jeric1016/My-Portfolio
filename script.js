// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Recommendation form submission
const recommendationForm = document.getElementById('recommendation-form');
const popup = document.getElementById('popup');
const closePopupBtn = document.querySelector('.close-popup');

// Function to show popup
function showPopup() {
    popup.style.display = 'block';
}

// Function to hide popup
function hidePopup() {
    popup.style.display = 'none';
}

// Handle form submission
recommendationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate inputs
    if (name === '' || message === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Create new recommendation card
    const recommendationsList = document.getElementById('recommendations-list');
    const newRecommendation = document.createElement('div');
    newRecommendation.className = 'recommendation-card';
    newRecommendation.style.animation = 'fadeInUp 0.5s ease';
    
    newRecommendation.innerHTML = `
        <p class="recommendation-text">"${message}"</p>
        <p class="recommendation-author">- ${name}</p>
    `;
    
    // Add new recommendation to the list
    recommendationsList.appendChild(newRecommendation);
    
    // Reset form
    recommendationForm.reset();
    
    // Show popup only after recommendation is submitted
    showPopup();
});

// Close popup when clicking the X button
closePopupBtn.addEventListener('click', hidePopup);

// Close popup when clicking outside the popup content
window.addEventListener('click', function(event) {
    if (event.target === popup) {
        hidePopup();
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, and recommendation cards
document.querySelectorAll('.skill-card, .project-card, .recommendation-card').forEach(card => {
    observer.observe(card);
});

// Add typing effect to home section (optional enhancement)
const homeTitle = document.querySelector('.home-content h1');
if (homeTitle) {
    const originalText = homeTitle.textContent;
    homeTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            homeTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Add counter animation for skills
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#1a252f';
    } else {
        navbar.style.backgroundColor = '#2c3e50';
    }
});

// Form input validation and styling
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add loading animation to submit button
const submitButton = document.querySelector('.submit-button');
let originalButtonText = submitButton.textContent;

recommendationForm.addEventListener('submit', function() {
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Re-enable button after popup is shown
    setTimeout(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }, 1000);
});

// Console message for developers
console.log('%c Welcome to My Portfolio! ', 'background: #3498db; color: white; font-size: 20px; padding: 10px;');
console.log('%c Thanks for checking out the code! 👨‍💻', 'color: #2c3e50; font-size: 14px;');