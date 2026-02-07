// ================================================
// CYBERFUNCTION PORTFOLIO - NEXT LEVEL JAVASCRIPT
// Version 0.0.1 | Elite Security Operations
// ================================================

class CyberPortfolio {
    constructor() {
        this.init();
    }

    async init() {
        console.log('%c⚡ CYBER SYSTEMS INITIALIZING...', 'color: #00ff88; font-family: "JetBrains Mono"; font-size: 16px; font-weight: bold;');
        
        // Initialize modules in sequence
        await this.initializeLoading();
        await this.initializeCursor();
        await this.initializeMatrix();
        await this.initializeTheme();
        await this.initializeNavigation();
        await this.initializeTerminal();
        await this.initializeParticles();
        await this.initializeSkills();
        await this.initializeProjects();
        await this.initializeContact();
        await this.initializeAnimations();
        await this.initializeAudio();
        await this.initializeNotifications();
        
        this.showNotification('CYBER SYSTEMS', 'All systems operational. Welcome to OASIS.', 'success');
        console.log('%c✅ CYBER SYSTEMS READY', 'color: #00ff88; font-family: "JetBrains Mono"; font-size: 14px;');
    }

    // ================= LOADING SYSTEM =================
    async initializeLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingText = document.getElementById('loading-text');
        
        if (!loadingScreen) return;
        
        const loadingPhases = [
            '>_ BOOTING CYBER SYSTEMS...',
            '>_ LOADING SECURITY PROTOCOLS...',
            '>_ INITIALIZING QUANTUM ENGINE...',
            '>_ SCANNING FOR THREATS...',
            '>_ ACTIVATING DEFENSE SYSTEMS...',
            '>_ SYSTEMS READY...'
        ];
        
        let phase = 0;
        const phaseInterval = setInterval(() => {
            if (phase < loadingPhases.length) {
                loadingText.textContent = loadingPhases[phase];
                phase++;
            } else {
                clearInterval(phaseInterval);
                
                // Add completion animation
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                        document.body.classList.remove('loading');
                        document.body.classList.add('loaded');
                        
                        // Initialize GSAP animations
                        this.initializeGSAPAnimations();
                    }
                });
            }
        }, 300);
    }

    // ================= CYBER CURSOR =================
    initializeCursor() {
        const cursor = document.getElementById('cyber-cursor');
        const cursorRing = document.getElementById('cursor-ring');
        const cursorDot = document.getElementById('cursor-dot');
        
        if (!cursor || !cursorRing || !cursorDot) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let dotX = 0;
        let dotY = 0;
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-slide, .nav-link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#ff0066';
                cursorRing.style.transform = 'scale(1.8)';
                cursorRing.style.borderColor = 'rgba(255, 0, 102, 0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#00ff88';
                cursorRing.style.transform = 'scale(1)';
                cursorRing.style.borderColor = 'rgba(0, 255, 136, 0.3)';
            });
        });
        
        // Click effect
        document.addEventListener('click', (e) => {
            cursor.style.transform = 'scale(0.8)';
            setTimeout(() => {
                cursor.style.transform = 'scale(1)';
            }, 100);
            
            // Ripple effect
            this.createRipple(e.clientX, e.clientY);
        });
        
        // Animation loop
        const animateCursor = () => {
            // Smooth follow for ring (laggy effect)
            ringX += (mouseX - ringX) * 0.1;
            ringY += (mouseY - ringY) * 0.1;
            
            // Snappy follow for dot
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;
            
            // Update positions
            cursor.style.left = `${mouseX - 12}px`;
            cursor.style.top = `${mouseY - 12}px`;
            
            cursorRing.style.left = `${ringX - 24}px`;
            cursorRing.style.top = `${ringY - 24}px`;
            
            cursorDot.style.left = `${dotX - 2}px`;
            cursorDot.style.top = `${dotY - 2}px`;
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #00ff88;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x - 10}px;
            top: ${y - 10}px;
            transform: scale(0);
            opacity: 0.8;
        `;
        
        document.body.appendChild(ripple);
        
        const animation = ripple.animate([
            { transform: 'scale(0)', opacity: 0.8 },
            { transform: 'scale(3)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => ripple.remove();
    }

    // ================= MATRIX BACKGROUND =================
    initializeMatrix() {
        const canvas = document.getElementById('matrix-bg');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        let lastTime = 0;
        const fps = 30;
        const interval = 1000 / fps;
        
        const drawMatrix = (timestamp) => {
            if (timestamp - lastTime < interval) {
                requestAnimationFrame(drawMatrix);
                return;
            }
            
            lastTime = timestamp;
            
            // Semi-transparent black to create fade effect
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = `${fontSize}px "JetBrains Mono"`;
            
            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = chars[Math.floor(Math.random() * chars.length)];
                
                // Gradient color based on position
                const gradient = ctx.createLinearGradient(0, drops[i] * fontSize, 0, (drops[i] + 1) * fontSize);
                gradient.addColorStop(0, '#00ff88');
                gradient.addColorStop(0.5, '#0088ff');
                gradient.addColorStop(1, '#00ff88');
                
                ctx.fillStyle = gradient;
                
                // Draw character
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                
                // Reset drop when it reaches bottom
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
            
            requestAnimationFrame(drawMatrix);
        };
        
        drawMatrix();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // ================= THEME SYSTEM =================
    initializeTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        // Load saved theme
        const savedTheme = localStorage.getItem('cyber-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'light';
        
        // Toggle theme
        themeToggle.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('cyber-theme', theme);
            
            this.showNotification('THEME', `Switched to ${theme} mode`, 'info');
        });
    }

    // ================= NAVIGATION SYSTEM =================
    initializeNavigation() {
        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Animate menu
                if (navMenu.classList.contains('active')) {
                    gsap.fromTo(navMenu.children, 
                        { y: -20, opacity: 0 },
                        { y: 0, opacity: 1, stagger: 0.1, duration: 0.3 }
                    );
                }
            });
        }
        
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (!target) return;
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Smooth scroll
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                anchor.classList.add('active');
            });
        });
        
        // Update active section on scroll
        const sections = document.querySelectorAll('.cyber-section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollDots = document.querySelectorAll('.scroll-dot');
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // Update nav links
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                    
                    // Update scroll dots
                    scrollDots.forEach(dot => {
                        dot.classList.toggle('active', dot.dataset.section === id);
                    });
                    
                    // Animate section entry
                    if (!entry.target.classList.contains('animated')) {
                        entry.target.classList.add('animated');
                        gsap.fromTo(entry.target,
                            { y: 50, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
                        );
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
        
        // Scroll dots click
        scrollDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const section = document.getElementById(dot.dataset.section);
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ================= TERMINAL SYSTEM =================
    initializeTerminal() {
        const terminalOutput = document.getElementById('terminal-output');
        if (!terminalOutput) return;
        
        const terminalLines = [
            '> whoami',
            'Cyberfunction_Emmanuel',
            '',
            '> system_status --check',
            '✓ Security Protocols: ACTIVE',
            '✓ Quantum Engine: ONLINE',
            '✓ Defense Systems: ARMED',
            '✓ Network: SECURE',
            '',
            '> current_role',
            '// Security Architect',
            '// Penetration Tester',
            '// DevSecOps Engineer',
            '// IoT Security Specialist',
            '',
            '> mission_statement',
            '"Securing digital frontiers with elite expertise."',
            '',
            '> last_login',
            'Access granted: ' + new Date().toLocaleString(),
            '',
            '> welcome_message --display',
            'System ready. Type "help" for commands.'
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        let currentLine = '';
        
        const typeLine = () => {
            if (lineIndex >= terminalLines.length) {
                // Start blinking cursor
                setInterval(() => {
                    const cursor = document.querySelector('.terminal-body .cursor');
                    if (cursor) cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }, 500);
                return;
            }
            
            currentLine = terminalLines[lineIndex];
            
            const typeChar = () => {
                if (charIndex < currentLine.length) {
                    terminalOutput.textContent += currentLine.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, Math.random() * 30 + 20);
                } else {
                    // End of line
                    terminalOutput.textContent += '\n';
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, Math.random() * 300 + 200);
                }
            };
            
            typeChar();
        };
        
        // Start typing after a delay
        setTimeout(typeLine, 1000);
        
        // Terminal commands
        document.addEventListener('keydown', (e) => {
            if (e.key === '`') { // Backtick opens debug console
                this.showDebugConsole();
                e.preventDefault();
            }
        });
    }

    // ================= PARTICLE SYSTEM =================
    initializeParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        const particleCount = window.innerWidth < 768 ? 30 : 80;
        const colors = ['#00ff88', '#0088ff', '#ff0066', '#00d9ff'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 4 + 1;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${x}vw;
                top: ${y}vh;
                pointer-events: none;
                z-index: 1;
                filter: blur(${size / 2}px);
                opacity: ${Math.random() * 0.5 + 0.1};
            `;
            
            container.appendChild(particle);
            
            // Animate particle
            gsap.to(particle, {
                x: `+=${(Math.random() - 0.5) * 100}`,
                y: `+=${(Math.random() - 0.5) * 100}`,
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            
            // Pulsing opacity
            gsap.to(particle, {
                opacity: Math.random() * 0.3 + 0.1,
                duration: Math.random() * 3 + 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }

    // ================= SKILLS SYSTEM =================
    initializeSkills() {
        const skillsGrid = document.querySelector('.skills-grid');
        if (!skillsGrid) return;
        
        const skills = [
            { icon: 'fab fa-html5', name: 'HTML5', value: 95, color: '#e34f26' },
            { icon: 'fab fa-css3-alt', name: 'CSS3 / SCSS', value: 90, color: '#264de4' },
            { icon: 'fab fa-js', name: 'JavaScript', value: 88, color: '#f7df1e' },
            { icon: 'fab fa-python', name: 'Python Security', value: 92, color: '#3776ab' },
            { icon: 'fas fa-user-secret', name: 'Penetration Testing', value: 85, color: '#00ff88' },
            { icon: 'fas fa-shield-alt', name: 'Network Security', value: 87, color: '#0088ff' },
            { icon: 'fas fa-cloud', name: 'Cloud Security', value: 80, color: '#ff9500' },
            { icon: 'fas fa-bug', name: 'Vulnerability Assessment', value: 90, color: '#ff0066' },
            { icon: 'fas fa-code', name: 'Secure Coding', value: 88, color: '#00d9ff' },
            { icon: 'fas fa-network-wired', name: 'IoT Security', value: 82, color: '#9d00ff' },
            { icon: 'fas fa-database', name: 'Database Security', value: 85, color: '#00cc99' },
            { icon: 'fas fa-mobile-alt', name: 'Mobile Security', value: 78, color: '#ff66cc' }
        ];
        
        skills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            
            card.innerHTML = `
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
                <div class="skill-progress">
                    <div class="progress-info">
                        <span class="progress-label">Proficiency</span>
                        <span class="progress-value">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%; background: ${skill.color}"></div>
                    </div>
                </div>
            `;
            
            skillsGrid.appendChild(card);
            
            // Animate skill bar on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const fill = card.querySelector('.progress-fill');
                        const value = card.querySelector('.progress-value');
                        
                        gsap.to(fill, {
                            width: `${skill.value}%`,
                            duration: 1.5,
                            ease: "power2.out",
                            onUpdate: () => {
                                const width = parseFloat(fill.style.width);
                                value.textContent = `${Math.round(width)}%`;
                            }
                        });
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(card);
        });
        
        // Network visualization
        this.initializeNetworkViz();
    }

    initializeNetworkViz() {
        const vizContainer = document.getElementById('network-viz');
        if (!vizContainer) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = vizContainer.clientWidth;
        canvas.height = vizContainer.clientHeight;
        vizContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const nodes = [];
        const connections = [];
        
        // Create nodes (skills)
        const skillCount = 12;
        for (let i = 0; i < skillCount; i++) {
            const angle = (i / skillCount) * Math.PI * 2;
            const radius = Math.min(canvas.width, canvas.height) * 0.3;
            const x = canvas.width / 2 + Math.cos(angle) * radius;
            const y = canvas.height / 2 + Math.sin(angle) * radius;
            
            nodes.push({
                x, y,
                radius: 8,
                color: `hsl(${(i * 30) % 360}, 100%, 65%)`,
                pulse: Math.random() * Math.PI * 2
            });
        }
        
        // Create connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (Math.random() > 0.6) {
                    connections.push({
                        from: i,
                        to: j,
                        strength: Math.random(),
                        pulse: Math.random() * Math.PI * 2
                    });
                }
            }
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections
            connections.forEach(conn => {
                const from = nodes[conn.from];
                const to = nodes[conn.to];
                
                conn.pulse += 0.02;
                const alpha = 0.1 + Math.sin(conn.pulse) * 0.05;
                
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Data flow dots
                const progress = (Math.sin(conn.pulse) + 1) / 2;
                const dotX = from.x + (to.x - from.x) * progress;
                const dotY = from.y + (to.y - from.y) * progress;
                
                ctx.beginPath();
                ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#00ff88';
                ctx.fill();
            });
            
            // Draw nodes
            nodes.forEach(node => {
                node.pulse += 0.05;
                const scale = 1 + Math.sin(node.pulse) * 0.2;
                
                // Glow
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius * 3
                );
                gradient.addColorStop(0, node.color);
                gradient.addColorStop(1, 'transparent');
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * scale, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * scale, 0, Math.PI * 2);
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.stroke();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = vizContainer.clientWidth;
            canvas.height = vizContainer.clientHeight;
        });
    }

    // ================= PROJECTS SYSTEM =================
    initializeProjects() {
        const slider = document.getElementById('projects-slider');
        const dots = document.getElementById('slider-dots');
        const prevBtn = document.getElementById('prev-project');
        const nextBtn = document.getElementById('next-project');
        
        if (!slider) return;
        
        const projects = [
            {
                title: 'Project Oasis',
                description: 'A secure portfolio platform showcasing cybersecurity expertise and modern web development practices with advanced security features.',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                badge: 'OPEN SOURCE',
                tech: ['HTML5', 'CSS3', 'JavaScript', 'Security'],
                demo: '#',
                code: '#'
            },
            {
                title: 'Quantum Firewall',
                description: 'Advanced network security system with AI-powered threat detection and real-time monitoring capabilities.',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                badge: 'CLASSIFIED',
                tech: ['Python', 'AI/ML', 'Network', 'Security'],
                demo: '#',
                code: '#'
            },
            {
                title: 'IoT Security Suite',
                description: 'Comprehensive security framework for Internet of Things devices with encryption and anomaly detection.',
                image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                badge: 'IN DEVELOPMENT',
                tech: ['IoT', 'Python', 'Encryption', 'Security'],
                demo: '#',
                code: '#'
            },
            {
                title: 'PenTest Toolkit',
                description: 'Collection of custom penetration testing tools and scripts for security assessments.',
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                badge: 'PRIVATE',
                tech: ['Python', 'Bash', 'Security', 'Testing'],
                demo: '#',
                code: '#'
            }
        ];
        
        // Create slides
        projects.forEach((project, index) => {
            const slide = document.createElement('div');
            slide.className = 'project-slide';
            slide.dataset.index = index;
            
            slide.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <span class="project-badge">${project.badge}</span>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.demo}" class="project-link link-demo">
                            <i class="fas fa-external-link-alt"></i> View Demo
                        </a>
                        <a href="${project.code}" class="project-link link-code">
                            <i class="fab fa-github"></i> Source Code
                        </a>
                    </div>
                </div>
            `;
            
            slider.appendChild(slide);
            
            // Create dot
            const dot = document.createElement('div');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            dots.appendChild(dot);
            
            // Dot click handler
            dot.addEventListener('click', () => {
                this.scrollToProject(index);
            });
        });
        
        // Navigation
        let currentIndex = 0;
        
        const scrollToProject = (index) => {
            currentIndex = index;
            const slideWidth = slider.children[0].offsetWidth + 32; // width + gap
            slider.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
            
            // Update active dot
            document.querySelectorAll('.slider-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };
        
        this.scrollToProject = scrollToProject;
        
        // Button handlers
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + projects.length) % projects.length;
                scrollToProject(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % projects.length;
                scrollToProject(newIndex);
            });
        }
        
        // Auto-scroll (optional)
        // setInterval(() => {
        //     const newIndex = (currentIndex + 1) % projects.length;
        //     scrollToProject(newIndex);
        // }, 5000);
    }

    // ================= CONTACT SYSTEM =================
    initializeContact() {
        const contactForm = document.getElementById('cyber-form');
        const directChat = document.getElementById('direct-chat');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Simulate form submission
                this.showNotification('TRANSMISSION', 'Encrypting message...', 'info');
                
                setTimeout(() => {
                    this.showNotification('SUCCESS', 'Message transmitted securely', 'success');
                    contactForm.reset();
                    
                    // Visual feedback
                    gsap.fromTo(contactForm,
                        { boxShadow: '0 0 0 0 rgba(0, 255, 136, 0)' },
                        { 
                            boxShadow: '0 0 30px 10px rgba(0, 255, 136, 0.3)',
                            duration: 0.5,
                            repeat: 1,
                            yoyo: true 
                        }
                    );
                }, 1500);
            });
        }
        
        if (directChat) {
            directChat.addEventListener('click', (e) => {
                e.preventDefault();
                this.showChatInterface();
            });
        }
    }

    showChatInterface() {
        const chatHTML = `
            <div class="cyber-chat-overlay">
                <div class="cyber-chat">
                    <div class="chat-header">
                        <h3><i class="fas fa-satellite"></i> SECURE CHAT</h3>
                        <button class="chat-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="chat-messages">
                        <div class="message system">
                            <span class="timestamp">[SYSTEM]</span>
                            <span class="text">Secure channel established. Messages are end-to-end encrypted.</span>
                        </div>
                        <div class="message system">
                            <span class="timestamp">[SYSTEM]</span>
                            <span class="text">Type your message below to initiate contact.</span>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type encrypted message..." id="chat-message">
                        <button id="send-chat"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        `;
        
        const chatOverlay = document.createElement('div');
        chatOverlay.innerHTML = chatHTML;
        document.body.appendChild(chatOverlay);
        
        // Add CSS for chat
        const chatStyle = document.createElement('style');
        chatStyle.textContent = `
            .cyber-chat-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 15, 0.95);
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .cyber-chat {
                width: 90%;
                max-width: 500px;
                background: rgba(26, 26, 46, 0.95);
                border: 1px solid #00ff88;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            
            .chat-header {
                padding: 1rem;
                background: rgba(0, 0, 0, 0.3);
                border-bottom: 1px solid #00ff88;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chat-header h3 {
                color: #00ff88;
                font-family: 'JetBrains Mono', monospace;
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .chat-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .chat-close:hover {
                color: #ff0066;
            }
            
            .chat-messages {
                padding: 1rem;
                height: 300px;
                overflow-y: auto;
            }
            
            .message {
                margin-bottom: 1rem;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                background: rgba(0, 255, 136, 0.1);
                border: 1px solid rgba(0, 255, 136, 0.2);
            }
            
            .message.system {
                background: rgba(0, 136, 255, 0.1);
                border-color: rgba(0, 136, 255, 0.2);
            }
            
            .timestamp {
                color: #00ff88;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.8rem;
                margin-right: 10px;
            }
            
            .text {
                color: white;
                font-size: 0.9rem;
            }
            
            .chat-input {
                display: flex;
                padding: 1rem;
                border-top: 1px solid rgba(0, 255, 136, 0.2);
                background: rgba(0, 0, 0, 0.3);
            }
            
            #chat-message {
                flex: 1;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(0, 255, 136, 0.3);
                border-radius: 6px;
                padding: 0.75rem;
                color: white;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.9rem;
            }
            
            #chat-message:focus {
                outline: none;
                border-color: #00ff88;
                box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
            }
            
            #send-chat {
                background: #00ff88;
                color: #0a0a0f;
                border: none;
                border-radius: 6px;
                padding: 0 1.5rem;
                margin-left: 1rem;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            #send-chat:hover {
                background: #00d9ff;
                transform: translateY(-2px);
            }
        `;
        document.head
