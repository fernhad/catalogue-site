// === OASIS | Cyberfunction_Emmanuel Scripts === //
document.addEventListener('DOMContentLoaded', () => {
    // === DOM Element References === //
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    const themeToggle = document.querySelector('.theme-toggle');
    const hero = document.querySelector('.hero');
    const skillCards = document.querySelectorAll('.skill-card');
    const terminalOutput = document.querySelector('#terminal-output');
    const terminal = document.getElementById('#terminal-output');
    const button = document.getElementById('clickMeBtn');
    const form = document.getElementById('contactForm');
    
    // === New Project Elements === //
    const projectCards = document.querySelectorAll('.project-card');
    const projectLinks = document.querySelectorAll('.project-link');
    const projectTitles = document.querySelectorAll('.project-title');

    // === Backend Contact Form Submission === //
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('nameInput')?.value;
            const email = document.getElementById('emailInput')?.value;
            const message = document.getElementById('messageInput')?.value;

            try {
                const res = await fetch('https://spectacular-flexibility.up.railway.app/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });
                const data = await res.json();
                alert(data.message || 'Message submitted!');
                form.reset();
            } catch (err) {
                alert('❌ Could not send message.');
                console.error(err);
            }
        });
    }

    // === Backend Button Trigger Example === //
    if (button) {
        button.addEventListener('click', async () => {
            try {
                const res = await fetch('');
                const data = await res.json();
                alert(data.message);
            } catch (err) {
                alert('❌ Failed to fetch message.');
                console.error(err);
            }
        });
    }

    // === Hamburger Toggle === //
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // === Dark Mode Toggle + Persistence === //
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateProjectCardTheme(isDark);
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
            updateProjectCardTheme(true);
        }
    }

    // === Update Project Cards for Dark Mode === //
    function updateProjectCardTheme(isDark) {
        projectCards.forEach(card => {
            if (isDark) {
                card.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.08)');
                card.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.2)');
            } else {
                card.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.95)');
                card.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
            }
        });
    }

    // === Skill Bar Animation === //
    const animateProgressBars = () => {
        skillCards.forEach((card) => {
            const progress = card.querySelector('.progress');
            const rect = card.getBoundingClientRect();
            if (
                rect.top < window.innerHeight &&
                rect.bottom >= 0 &&
                !card.classList.contains('animated')
            ) {
                const targetWidth = progress.style.width || '0%';
                progress.style.width = '0%';
                card.classList.add('animated');
                setTimeout(() => {
                    progress.style.width = targetWidth;
                }, 150);
            }
        });
    };

    let scrollTimeout;
    const debouncedScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            animateProgressBars();
            checkProjectScroll(); // Check project cards on scroll
        }, 100);
    };

    animateProgressBars();
    window.addEventListener('scroll', debouncedScroll);

    // === Terminal Typewriter Animation === //
    if (terminalOutput) {
        const terminalLines = [
            '> whoami',
            'Cyberfunction_Emmanuel',
            '// Injecting logic into insecure stacks.',
            '// Exfiltrating inefficiencies from front to back.',
            "~ sudo Code Crafter and crawler",
            "| Exfiltrating inefficiencies with precision.",
            "$ root@cyber-oasis:~$ Web Defense Architect",
            "// Intrusion Detection Evangelist // Full-Stack Hacker",
            "// Building secure, interactive web experiences..."
        ];

        let lineIndex = 0;
        let charIndex = 0;

        const typeLine = () => {
            if (lineIndex >= terminalLines.length) return;

            const currentLine = terminalLines[lineIndex];
            const typed = currentLine.slice(0, charIndex);
            const cursor = "▌";

            terminalOutput.textContent =
                terminalLines.slice(0, lineIndex).join('\n') + '\n' + typed + cursor;

            if (charIndex < currentLine.length) {
                charIndex++;
                setTimeout(typeLine, 40);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeLine, 400);
            }
        };

        typeLine();
    }

    // === Smooth Scroll Navigation === //
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;

            target.scrollIntoView({ behavior: 'smooth' });

            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // === PROJECTS SECTION INTERACTIVE EFFECTS === //

    // 1. Mouse move gradient effect for project cards
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            // Set initial CSS variables
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });

            // 2. Click effect
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.project-link')) {
                    this.classList.add('clicked');
                    setTimeout(() => this.classList.remove('clicked'), 300);
                    
                    // Cyber sound effect simulation
                    playCyberSound();
                }
            });

            // 3. Hover particle effect
            card.addEventListener('mouseenter', () => {
                card.classList.add('active');
                createParticles(card);
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('active');
            });
        });

        // 4. Scroll animation for project cards
        function checkProjectScroll() {
            projectCards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (cardTop < windowHeight - 100) {
                    card.classList.add('visible');
                }
            });
        }

        // 5. Parallax effect on project images
        function handleProjectParallax() {
            projectCards.forEach(card => {
                const image = card.querySelector('.project-image');
                if (!image) return;
                
                const rect = card.getBoundingClientRect();
                const scrollPercent = (rect.top / window.innerHeight) * 100;
                
                if (scrollPercent > -100 && scrollPercent < 100) {
                    const translateY = scrollPercent * 0.1;
                    image.style.transform = `translateY(${translateY}px) scale(1.1)`;
                }
            });
        }

        window.addEventListener('scroll', handleProjectParallax);
        checkProjectScroll(); // Initial check
    }

    // 6. Typewriter effect for project titles
    if (projectTitles.length > 0) {
        projectTitles.forEach(title => {
            const originalText = title.textContent;
            title.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    title.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(title.closest('.project-card'));
        });
    }

    // 7. Ripple effect on project buttons
    if (projectLinks.length > 0) {
        projectLinks.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    z-index: 1;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
                
                // Add ripple animation CSS if not present
                if (!document.querySelector('#ripple-style')) {
                    const style = document.createElement('style');
                    style.id = 'ripple-style';
                    style.textContent = `
                        @keyframes ripple {
                            to {
                                transform: scale(4);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Simulate link navigation after animation
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    setTimeout(() => {
                        window.open(href, '_blank');
                    }, 300);
                }
            });
        });
    }

    // === Particle Effect Function === //
    function createParticles(card) {
        const particles = 6;
        const colors = body.classList.contains('dark-mode') 
            ? ['#6366f1', '#8b5cf6', '#10b981'] 
            : ['#4f46e5', '#7c3aed', '#059669'];
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                top: 50%;
                left: 50%;
            `;
            
            card.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            const distance = 30 + Math.random() * 70;
            
            const animation = particle.animate([
                { 
                    transform: `translate(-50%, -50%) rotate(${angle}rad) translate(0px)`,
                    opacity: 1 
                },
                { 
                    transform: `translate(-50%, -50%) rotate(${angle}rad) translate(${distance}px)`,
                    opacity: 0 
                }
            ], {
                duration: 600 + Math.random() * 400,
                easing: 'cubic-bezier(0.2, 0, 0.8, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }

    // === Cyber Sound Effect Simulation === //
    function playCyberSound() {
        // This is a visual effect that simulates sound
        const soundIndicator = document.createElement('div');
        soundIndicator.className = 'sound-indicator';
        soundIndicator.textContent = '⌁';
        soundIndicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary, #6366f1);
            color: white;
            padding: 10px 15px;
            border-radius: 10px;
            font-size: 1.2rem;
            animation: pulse 0.5s ease;
            z-index: 1000;
            display: none;
        `;
        
        document.body.appendChild(soundIndicator);
        soundIndicator.style.display = 'block';
        
        setTimeout(() => {
            soundIndicator.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => soundIndicator.remove(), 500);
        }, 300);
    }

    // === Add Cyber Effects CSS === //
    if (!document.querySelector('#cyber-effects-style')) {
        const cyberStyle = document.createElement('style');
        cyberStyle.id = 'cyber-effects-style';
        cyberStyle.textContent = `
            /* Particle styles */
            .particle {
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
            }

            /* Click effect */
            .project-card.clicked {
                animation: cyberClick 0.3s ease;
            }

            @keyframes cyberClick {
                0% { transform: scale(1); }
                50% { transform: scale(0.98); }
                100% { transform: scale(1); }
            }

            /* Glitch effect */
            .project-card:hover .project-title {
                animation: glitch 0.3s ease;
            }

            @keyframes glitch {
                0%, 100% { transform: translate(0); }
                33% { transform: translate(-1px, 1px); }
                66% { transform: translate(1px, -1px); }
            }

            /* Sound indicator */
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(10px); }
            }

            /* Project card scroll animation */
            .project-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }

            .project-card.visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* Dark mode adjustments */
            .dark-mode .project-card {
                --glass-bg: rgba(255, 255, 255, 0.08);
                --glass-border: rgba(255, 255, 255, 0.2);
            }

            body:not(.dark-mode) .project-card {
                --glass-bg: rgba(255, 255, 255, 0.95);
                --glass-border: rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(cyberStyle);
    }

    // === Initialize project card theme === //
    updateProjectCardTheme(body.classList.contains('dark-mode'));
});
