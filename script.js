document.addEventListener('DOMContentLoaded', function() {

    // --- Navigation Bar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // --- Close Mobile Menu When a Link is Clicked ---
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.querySelector('i').classList.remove('fa-times');
                mobileMenu.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Scroll Reveal Animation for Sections ---
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Dynamic Status Logic ---
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day

    // --- Certification Status Logic ---
    function updateCertificationStatus() {
        const certifications = document.querySelectorAll('.certification-item');
        certifications.forEach(cert => {
            const statusElement = cert.querySelector('.cert-status');
            const expiryDateStr = cert.dataset.expiryDate;

            if (expiryDateStr) {
                const expiryDate = new Date(expiryDateStr);
                
                if (expiryDate >= today) {
                    statusElement.textContent = 'Valid';
                    statusElement.classList.add('valid');
                } else {
                    statusElement.textContent = 'Expired';
                    statusElement.classList.add('expired');
                }
            } else {
                statusElement.textContent = 'Valid';
                statusElement.classList.add('valid');
            }
        });
    }

    // --- Education Status Logic ---
    function updateEducationStatus() {
        const educations = document.querySelectorAll('.education-item');
        educations.forEach(edu => {
            const statusElement = edu.querySelector('.education-status');
            const startDate = new Date(edu.dataset.startDate);
            const endDate = new Date(edu.dataset.endDate);

            if (endDate < today) {
                statusElement.textContent = 'Completed';
                statusElement.classList.add('completed');
            } else if (startDate <= today && endDate >= today) {
                statusElement.textContent = 'In Progress';
                statusElement.classList.add('in-progress');
            } else if (startDate > today) {
                statusElement.textContent = 'Upcoming';
                statusElement.classList.add('upcoming');
            }
        });
    }

    // --- Smart Email Button Logic ---
    function setupSmartEmailButton() {
        const emailButton = document.getElementById('emailMeBtn');
        if (!emailButton) return;

        const btnText = emailButton.querySelector('.btn-text');
        const originalText = btnText.textContent;
        const email = 'sahil82764@gmail.com';

        emailButton.addEventListener('click', () => {
            // 1. Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // 2. Provide feedback
                btnText.textContent = 'Copied!';
                emailButton.classList.add('copied');

                // 3. Attempt to open mail client
                window.location.href = `mailto:${email}?subject=Job%20Opportunity%20Inquiry`;

                // 4. Revert button state after a delay
                setTimeout(() => {
                    btnText.textContent = originalText;
                    emailButton.classList.remove('copied');
                }, 2500); // Revert after 2.5 seconds
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }

    // --- Run all dynamic functions on page load ---
    updateCertificationStatus();
    updateEducationStatus();
    setupSmartEmailButton();
});