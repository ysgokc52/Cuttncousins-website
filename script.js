/* ============================================
   CUTT N COUSINS - JavaScript
   ============================================ */

// Form Handling with Formspree Integration
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    const contactForm = document.getElementById('contactForm');
    const portalForm = document.getElementById('portalForm');

    // Quote Form Handler
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmit);
    }

    // Contact Form Handler
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Portal Form Handler
    if (portalForm) {
        portalForm.addEventListener('submit', handlePortalSubmit);
    }
});

// Handle Quote Form Submission with Formspree
async function handleQuoteSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('formMessage');
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Validate form
        if (!validateForm(formData)) {
            showMessage(messageDiv, 'Please fill in all required fields correctly.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Request Quote';
            return;
        }

        // Send to Formspree
        const response = await fetch('https://formspree.io/f/xyzqwert', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Save locally as backup
            const quoteData = {
                timestamp: new Date().toISOString(),
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                service: formData.get('service'),
                location: formData.get('location'),
                description: formData.get('description'),
                urgency: formData.get('urgency'),
                contactMethod: formData.get('contact-method')
            };
            saveToLocalStorage('quoteRequests', quoteData);

            // Show success message
            showMessage(messageDiv, '✓ Quote request sent successfully! We\'ll contact you within 24 hours.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form error:', error);
        showMessage(messageDiv, '✗ Error sending quote. Please try again or call us directly.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Request Quote';
    }
}

// Handle Contact Form Submission with Formspree
async function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('contactMessage');
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Validate form
        if (!validateForm(formData)) {
            showMessage(messageDiv, 'Please fill in all required fields.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            return;
        }

        // Send to Formspree
        const response = await fetch('https://formspree.io/f/xyzqwert', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Save locally as backup
            const contactData = {
                timestamp: new Date().toISOString(),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            saveToLocalStorage('contactMessages', contactData);

            // Show success message
            showMessage(messageDiv, '✓ Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form error:', error);
        showMessage(messageDiv, '✗ Error sending message. Please try again or call us directly.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}

// Handle Portal Form Submission
async function handlePortalSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('portalMessage');
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Validate form
        if (!validateForm(formData)) {
            showMessage(messageDiv, 'Please fill in all required fields.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            return;
        }

        // Validate file
        const fileInput = document.getElementById('file-upload');
        if (!fileInput || !fileInput.files.length) {
            showMessage(messageDiv, 'Please select a file to upload.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            return;
        }

        const file = fileInput.files[0];
        if (file.size > 10485760) { // 10MB
            showMessage(messageDiv, 'File size must be less than 10MB.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            return;
        }

        // Send to Formspree
        const response = await fetch('https://formspree.io/f/xyzqwert', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Save locally as backup
            const portalData = {
                timestamp: new Date().toISOString(),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                projectName: formData.get('project-name'),
                documentType: formData.get('document-type'),
                fileName: file.name,
                fileSize: file.size,
                notes: formData.get('notes')
            };
            saveToLocalStorage('portalUploads', portalData);

            // Show success message
            showMessage(messageDiv, '✓ Document uploaded successfully! You\'ll receive a confirmation email within 24 hours.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form error:', error);
        showMessage(messageDiv, '✗ Error uploading document. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    }
}

// Validate Form Data
function validateForm(formData) {
    for (let [key, value] of formData.entries()) {
        if (key === 'phone' && value) {
            if (!isValidPhone(value)) return false;
        }
        if (key === 'email' && value) {
            if (!isValidEmail(value)) return false;
        }
    }
    return true;
}

// Validate Phone Number
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Validate Email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Message
function showMessage(messageDiv, text, type) {
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide after 5 seconds (for success messages)
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Save to Local Storage
function saveToLocalStorage(key, data) {
    try {
        let existing = localStorage.getItem(key);
        let dataArray = existing ? JSON.parse(existing) : [];
        dataArray.push(data);
        localStorage.setItem(key, JSON.stringify(dataArray));
        console.log(`Data saved to local storage (${key}):`, data);
    } catch (error) {
        console.error('Error saving to local storage:', error);
    }
}

// Retrieve Data from Local Storage
function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error retrieving from local storage:', error);
        return null;
    }
}

// Format Phone Number
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentLocation = location.pathname;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentLocation || 
            (currentLocation === '/' && href === 'index.html') ||
            (currentLocation.endsWith('/') && href === 'index.html') ||
            href === location.pathname.split('/').pop()) {
            link.classList.add('active');
        }
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    setupMobileMenu();
    updateActiveNavLink();
    console.log('Cutt N Cousins website loaded successfully!');
});

// Update active link on navigation
document.addEventListener('DOMContentLoaded', updateActiveNavLink);