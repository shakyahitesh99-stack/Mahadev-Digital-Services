document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true, // Whether animation should happen only once - while scrolling down
        easing: 'ease-in-out', // Easing for animation
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.querySelector('.main-nav');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Handle the "About Us" link click separately
            if (this.id === 'aboutLink' || this.id === 'footerAboutLink') {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.classList.add('visible'); // Show the about section
                    setTimeout(() => { // Scroll after content is displayed
                        aboutSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }, 100); // Small delay to allow display
                }
                return; // Stop further processing for About Us
            }


            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize Swiper Slider for Services
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Loop slides
        autoplay: {
            delay: 3500, // Slide every 3.5 seconds
            disableOnInteraction: false, // Continue autoplay even when user interacts
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade', // Smooth fade transition
        fadeEffect: {
            crossFade: true,
        },
        speed: 1000, // Transition speed
    });

    // Modals functionality (Privacy Policy & Terms & Conditions)
    const privacyPolicyLink = document.getElementById('privacyPolicyLink');
    const termsConditionsLink = document.getElementById('termsConditionsLink');
    const privacyPolicyModal = document.getElementById('privacyPolicyModal');
    const termsConditionsModal = document.getElementById('termsConditionsModal');
    const closeButtons = document.querySelectorAll('.modal .close-button');

    function openModal(modal) {
        modal.style.display = 'flex'; // Use flex to center the modal
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    privacyPolicyLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(privacyPolicyModal);
    });

    termsConditionsLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(termsConditionsModal);
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal'));
        });
    });

    // Close modal if clicked outside of content
    window.addEventListener('click', (e) => {
        if (e.target === privacyPolicyModal) {
            closeModal(privacyPolicyModal);
        }
        if (e.target === termsConditionsModal) {
            closeModal(termsConditionsModal);
        }
    });

    // Dynamic Active Class for Navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust as needed
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call on load to set initial active link

    // Optional: Add an observer for more precise active link highlighting
    // This is more advanced and uses IntersectionObserver API
    // const observerOptions = {
    //     root: null,
    //     rootMargin: '0px',
    //     threshold: 0.7 // When 70% of the section is visible
    // };

    // const observer = new IntersectionObserver((entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             navLinks.forEach(link => {
    //                 link.classList.remove('active');
    //                 if (link.getAttribute('href').includes(entry.target.id)) {
    //                     link.classList.add('active');
    //                 }
    //             });
    //         }
    //     });
    // }, observerOptions);

    // sections.forEach(section => {
    //     observer.observe(section);
    // });
});