// ===================================
// GOLDEN LUXURY TUTORING WEBSITE
// Theme Toggle & Dynamic Content
// ===================================

// Theme Toggle Function
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    
    // Load content
    loadContent();
});

// FAQ Toggle
function toggleFAQ(element) {
    const question = element;
    const answer = question.nextElementSibling;
    
    // Toggle active class
    question.classList.toggle('active');
    answer.classList.toggle('active');
}

// Load Content from LocalStorage
function loadContent() {
    const content = JSON.parse(localStorage.getItem('siteContent') || '{}');
    
    // Load logo
    const logoElements = document.querySelectorAll('#displayLogo');
    logoElements.forEach(el => {
        if (content.logoType === 'image' && content.logoImage) {
            el.innerHTML = `<img src="${content.logoImage}" alt="Logo">`;
        } else if (content.logoType === 'text' && content.logoText) {
            el.textContent = content.logoText;
        }
        if (content.logoSize) {
            el.style.width = content.logoSize + 'px';
            el.style.height = content.logoSize + 'px';
        }
    });
    
    // Load company name
    if (content.companyName) {
        document.querySelectorAll('#displayCompanyName, #footerCompanyName, #footerCompanyName2').forEach(el => {
            el.textContent = content.companyName;
        });
    }
    
    // Load hero content
    if (content.heroTitle) document.getElementById('heroTitle').innerHTML = content.heroTitle;
    if (content.heroSubtitle) document.getElementById('heroSubtitle').textContent = content.heroSubtitle;
    if (content.heroButton) document.getElementById('heroButton').innerHTML = content.heroButton + ' →';
    
    // Load about content
    if (content.aboutTitle) document.getElementById('aboutTitle').textContent = content.aboutTitle;
    if (content.aboutContent) document.getElementById('aboutContent').textContent = content.aboutContent;
    
    // Load contact info
    if (content.contactEmail) document.getElementById('displayEmail').textContent = content.contactEmail;
    if (content.contactPhone) document.getElementById('displayPhone').textContent = content.contactPhone;
    
    // Load Google Form
    if (content.googleFormUrl) {
        document.getElementById('contactFormFrame').src = content.googleFormUrl;
    }
    
    // Load services
    loadServices();
    
    // Load testimonials
    loadTestimonials();
}

// Load Services
function loadServices() {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const grid = document.getElementById('servicesGrid');
    
    if (services.length === 0) {
        // Default services
        grid.innerHTML = `
            <div class="service-card">
                <div class="service-icon">📚</div>
                <h3>One-to-One Tutoring</h3>
                <p>Personalized learning with dedicated tutors focused on your individual needs and goals.</p>
            </div>
            <div class="service-card">
                <div class="service-icon">💻</div>
                <h3>Online Lessons</h3>
                <p>Flexible online tutoring sessions from the comfort of your home with interactive tools.</p>
            </div>
            <div class="service-card">
                <div class="service-icon">🎓</div>
                <h3>Funtional Skills</h3>
                <p>Focused prep with proven strategies to help you achieve top grades.</p>
            </div>
            <div class="service-card">
                <div class="service-icon">👥</div>
                <h3>Group Classes</h3>
                <p>Collaborative learning in small groups for an engaging educational experience.</p>
            </div>
            <div class="service-card">
                <div class="service-icon">📖</div>
                <h3>Subject Specialists</h3>
                <p>Expert tutors in Maths, English, Science, and all major academic subjects.</p>
            </div>
         //   <div class="service-card">
         //       <div class="service-icon">⏰</div>
         //       <h3>Flexible Scheduling</h3>
          //      <p>Book sessions at times that work for you with our flexible scheduling options.</p>
         //   </div>
        `;
    } else {
        grid.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `).join('');
    }
}

// Load Testimonials
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const grid = document.getElementById('testimonialsGrid');
    
    if (testimonials.length === 0) {
        // Default testimonials
        grid.innerHTML = `
            <div class="testimonial-card">
                <div class="testimonial-text">"The tutoring has been amazing! My grades improved dramatically and I feel so much more confident in my studies."</div>
                <div class="testimonial-author">Sarah Johnson</div>
                <div class="testimonial-role">GCSE Student</div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-text">"Excellent tutors who really care about their students. My daughter went from struggling to excelling!"</div>
                <div class="testimonial-author">David Smith</div>
                <div class="testimonial-role">Parent</div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-text">"Professional, patient, and effective. Helped me achieve the A* I needed for university!"</div>
                <div class="testimonial-author">Emma Williams</div>
                <div class="testimonial-role">A-Level Student</div>
            </div>
        `;
    } else {
        grid.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-text">"${testimonial.text}"</div>
                <div class="testimonial-author">${testimonial.author}</div>
                <div class="testimonial-role">${testimonial.role}</div>
            </div>
        `).join('');
    }
}
