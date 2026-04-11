// ===================================
// WISDOM TREE TUTORING
// FAQ Toggle & Admin Content Loader
// ===================================

// FAQ Toggle
function toggleFAQ(element) {
    element.classList.toggle('active');
    element.nextElementSibling.classList.toggle('active');
}

// Load admin-editable fields from localStorage (set via admin panel)
document.addEventListener('DOMContentLoaded', () => {
    const content = JSON.parse(localStorage.getItem('siteContent') || '{}');

    // Logo
    const logo = document.getElementById('displayLogo');
    if (logo) {
        if (content.logoType === 'image' && content.logoImage) {
            logo.innerHTML = `<img src="${content.logoImage}" alt="Logo">`;
        } else if (content.logoType === 'text' && content.logoText) {
            logo.textContent = content.logoText;
        }
        if (content.logoSize) {
            logo.style.width  = content.logoSize + 'px';
            logo.style.height = content.logoSize + 'px';
        }
    }

    // Company name
    if (content.companyName) {
        ['displayCompanyName', 'footerCompanyName', 'footerCompanyName2'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = content.companyName;
        });
    }

    // Hero
    if (content.heroTitle)    document.getElementById('heroTitle').innerHTML  = content.heroTitle;
    if (content.heroSubtitle) document.getElementById('heroSubtitle').textContent = content.heroSubtitle;
    if (content.heroButton)   document.getElementById('heroButton').innerHTML  = content.heroButton + ' →';

    // About
    if (content.aboutTitle)   document.getElementById('aboutTitle').textContent   = content.aboutTitle;
    if (content.aboutContent) document.getElementById('aboutContent').textContent = content.aboutContent;

    // Contact info
    if (content.contactEmail) document.getElementById('displayEmail').textContent = content.contactEmail;
    if (content.contactPhone) document.getElementById('displayPhone').textContent = content.contactPhone;

    // Services (if admin has saved custom ones)
    if (content.services && content.services.length > 0) {
        const grid = document.getElementById('servicesGrid');
        grid.innerHTML = content.services.map(s => `
            <div class="service-card">
                <div class="service-icon">${s.icon}</div>
                <h3>${s.title}</h3>
                <p>${s.description}</p>
            </div>
        `).join('');
    }

    // Testimonials (if admin has saved custom ones)
    if (content.testimonials && content.testimonials.length > 0) {
        const grid = document.getElementById('testimonialsGrid');
        grid.innerHTML = content.testimonials.map(t => `
            <div class="testimonial-card">
                <div class="testimonial-text">"${t.text}"</div>
                <div class="testimonial-author">${t.author}</div>
                <div class="testimonial-role">${t.role}</div>
            </div>
        `).join('');
    }
// ===== FORMSPREE CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate required fields
        let valid = true;
        [['cf-name', 'err-name'], ['cf-email', 'err-email'], ['cf-message', 'err-message']].forEach(([inputId, errId]) => {
            const input = document.getElementById(inputId);
            const err   = document.getElementById(errId);
            const bad   = !input.value.trim() || (inputId === 'cf-email' && !/\S+@\S+\.\S+/.test(input.value));
            input.classList.toggle('invalid', bad);
            err.classList.toggle('show', bad);
            if (bad) valid = false;
        });
        if (!valid) return;

        const btn = document.getElementById('cfSubmitBtn');
        btn.disabled = true;
        btn.textContent = 'Sending...';

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                form.reset();
                document.getElementById('cfSuccess').classList.add('show');
            } else {
                document.getElementById('cfErrorMsg').classList.add('show');
            }
        } catch {
            document.getElementById('cfErrorMsg').classList.add('show');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Send Message →';
        }
    });

    // Clear validation styling on input
    form.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', () => {
            el.classList.remove('invalid');
            const err = document.getElementById('err-' + el.id.replace('cf-', ''));
            if (err) err.classList.remove('show');
        });
    });
}
    });
