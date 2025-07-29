// === OASIS | Cyberfunction_Emmanuel Scripts === //
document.addEventListener('DOMContentLoaded', () => {
    // === DOM Element References === //
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    const skillCards = document.querySelectorAll('.skill-card');
    const terminalOutput = document.querySelector('#terminal-output');
    const button = document.getElementById('clickMeBtn');
    const form = document.getElementById('contactForm');

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
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
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
        scrollTimeout = setTimeout(animateProgressBars, 100);
    };

    animateProgressBars();
    window.addEventListener('scroll', debouncedScroll);

    // === Terminal Typewriter Animation === //
    if (terminalOutput) {
        const terminalLines = [
            '> whoami',
            'Cyberfunction_Emmanuel',
            '// Injecting logic into insecure stacks.',
            '// Exfiltrating inefficiencies from front to back.'
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
});
