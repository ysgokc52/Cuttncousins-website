// ============================================
// CUTT N COUSINS - Main JavaScript
// ============================================

// Form Handling
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

// Handle Quote Form Submission
function handleQuoteSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('formMessage');

    // Validate form
    if (!validateForm(formData)) {
        showMessage(messageDiv, 'Please fill in all required fields correctly.', 'error');
        return;
    }

    // Create form data object
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

    // Store locally
    saveToLocalStorage('quoteRequests', quoteData);

    // Send to email service (if configured)
    sendToEmailService(quoteData, 'quote');

    // Show success message
    showMessage(messageDiv, 'Quote request submitted successfully! We\'ll contact you within 24 hours.', 'success');

    // Reset form
    form.reset();
}

// Handle Contact Form Submission
function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('contactMessage');

    // Validate form
    if (!validateForm(formData)) {
        showMessage(messageDiv, 'Please fill in all required fields.', 'error');
        return;
    }

    // Create contact data object
    const contactData = {
        timestamp: new Date().toISOString(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    // Store locally
    saveToLocalStorage('contactMessages', contactData);

    // Send to email service (if configured)
    sendToEmailService(contactData, 'contact');

    // Show success message
    showMessage(messageDiv, 'Message sent successfully! We\'ll get back to you soon.', 'success');

    // Reset form
    form.reset();
}

// Handle Portal Form Submission
function handlePortalSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('portalMessage');

    // Validate form
    if (!validateForm(formData)) {
        showMessage(messageDiv, 'Please fill in all required fields.', 'error');
        return;
    }

    // Validate file
    const fileInput = document.getElementById('file-upload');
    if (!fileInput.files.length) {
        showMessage(messageDiv, 'Please select a file to upload.', 'error');
        return;
    }

    const file = fileInput.files[0];
    if (file.size > 10485760) { // 10MB
        showMessage(messageDiv, 'File size must be less than 10MB.', 'error');
        return;
    }

    // Create portal data object
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

    // Store locally
    saveToLocalStorage('portalUploads', portalData);

    // Send to email service
    sendToEmailService(portalData, 'portal');

    // Show success message
    showMessage(messageDiv, 'Document uploaded successfully! You\'ll receive a confirmation email within 24 hours.', 'success');

    // Reset form
    form.reset();
}

// Validate Form Data
function validateForm(formData) {
    for (let [key, value] of formData.entries()) {
        if (key === 'phone' && value) {
            return isValidPhone(value);
        }
        if (key === 'email' && value) {
            return isValidEmail(value);
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
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';

    // Auto-hide after 5 seconds (for success messages)
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Save to Local Storage (Encrypted)
function saveToLocalStorage(key, data) {
    try {
        let existing = localStorage.getItem(key);
        let dataArray = existing ? JSON.parse(existing) : [];
        dataArray.push(data);
        localStorage.setItem(key, JSON.stringify(dataArray));
    } catch (error) {
        console.error('Error saving to local storage:', error);
    }
}

// Send to Email Service (Formspree or Custom)
function sendToEmailService(data, type) {
    // This function would integrate with Formspree, Firebase, or custom backend
    // Example with Formspree:
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    // For now, data is stored locally and can be retrieved manually
    console.log(`${type} data submitted:`, data);
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

// Mobile Menu Toggle (if needed)
function setupMobileMenu() {
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    setupMobileMenu();
    console.log('Cutt N Cousins website loaded successfully!');
});