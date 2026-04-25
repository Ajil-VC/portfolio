document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar Scrolled Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Link Highlight
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Role Typing / Fading Effect
    const roles = document.querySelectorAll('.role');
    let roleIndex = 0;

    if(roles.length > 0) {
        roles[roleIndex].classList.add('active');
        
        setInterval(() => {
            roles[roleIndex].classList.remove('active');
            roleIndex = (roleIndex + 1) % roles.length;
            roles[roleIndex].classList.add('active');
        }, 4000); // matches the css animation duration
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load
    
    // Download Resume Interactivity (Mock)
    const resumeBtn = document.getElementById('download-resume');
    if(resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const originalText = resumeBtn.innerText;
            resumeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...';
            
            setTimeout(() => {
                resumeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded';
                resumeBtn.style.backgroundColor = '#339933';
                
                setTimeout(() => {
                    resumeBtn.innerHTML = originalText;
                    resumeBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

});
