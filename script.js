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

    if (roles.length > 0) {
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



    // Subtly Animated Particles for Hero Image
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth + 40;
            canvas.height = parent.clientHeight + 40;
        };

        window.addEventListener('resize', resizeCanvas);
        // Add a slight delay to ensure the image has painted and sizes are correct
        setTimeout(() => resizeCanvas(), 100);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5; // soft small dots

                // Slow drifting logic
                this.speedX = (Math.random() - 0.5) * 0.2;
                this.speedY = (Math.random() - 0.5) * 0.2;
                this.opacity = Math.random() * 0.5;
                this.fadeSpeed = (Math.random() * 0.005) + 0.002;
                this.fadeDir = Math.random() > 0.5 ? 1 : -1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                this.opacity += this.fadeSpeed * this.fadeDir;
                if (this.opacity >= 0.8) {
                    this.fadeDir = -1;
                } else if (this.opacity <= 0) {
                    this.reset();
                    this.opacity = 0;
                    this.fadeDir = 1;
                }

                // If it floats out of bounds, gently reset it
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(100, 150, 255, ${this.opacity})`; // Soft elegant blue
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = window.innerWidth > 768 ? 50 : 25; // lower count for minimalism
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        };
        animateParticles();
    }

});
