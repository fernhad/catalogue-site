// === QUANTUM MODE ACTIVATION === //
class QuantumRenderer {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.wires = [];
        this.isActive = false;
        this.init();
    }

    init() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.5s;
        `;
        document.body.appendChild(this.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    activate() {
        this.isActive = true;
        this.canvas.style.opacity = '0.7';
        this.createParticleField();
        this.animate();
    }

    deactivate() {
        this.isActive = false;
        this.canvas.style.opacity = '0';
        this.particles = [];
        this.wires = [];
    }

    createParticleField() {
        // Create quantum particles
        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 2 + 1,
                color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 60}%)`,
                connections: []
            });
        }

        // Create quantum entanglement wires
        for (let i = 0; i < 50; i++) {
            this.wires.push({
                p1: Math.floor(Math.random() * this.particles.length),
                p2: Math.floor(Math.random() * this.particles.length),
                opacity: Math.random() * 0.3 + 0.1,
                pulse: 0
            });
        }
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off walls
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.radius * 3
            );
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });

        // Draw entanglement wires
        this.wires.forEach(w => {
            w.pulse = (w.pulse + 0.05) % (Math.PI * 2);
            const p1 = this.particles[w.p1];
            const p2 = this.particles[w.p2];
            const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

            if (distance < 200) {
                const opacity = w.opacity * (0.5 + Math.sin(w.pulse) * 0.3);
                
                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y);
                this.ctx.lineTo(p2.x, p2.y);
                this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();

                // Draw pulse along wire
                const pulsePos = 0.5 + Math.sin(w.pulse) * 0.3;
                const pulseX = p1.x + (p2.x - p1.x) * pulsePos;
                const pulseY = p1.y + (p2.y - p1.y) * pulsePos;

                this.ctx.beginPath();
                this.ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + Math.sin(w.pulse) * 0.3})`;
                this.ctx.fill();
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// === CYBER 3D TERMINAL === //
class CyberTerminal3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cubes = [];
        this.texts = ['CYBER', 'OASIS', 'HACK', 'DEFENSE', 'CODE', 'SECURE'];
        this.init();
    }

    init() {
        if (!this.container) return;

        // Create Three.js scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 20;

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        // Create floating cubes with cyber text
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        
        this.texts.forEach((text, i) => {
            const material = new THREE.MeshPhongMaterial({
                color: 0x6366f1,
                emissive: 0x1e293b,
                specular: 0xffffff,
                shininess: 100,
                wireframe: i % 2 === 0
            });

            const cube = new THREE.Mesh(geometry, material);
            
            // Position in a sphere
            const phi = Math.acos(-1 + (2 * i) / this.texts.length);
            const theta = Math.sqrt(this.texts.length * Math.PI) * phi;
            
            cube.position.x = 10 * Math.cos(theta) * Math.sin(phi);
            cube.position.y = 10 * Math.sin(theta) * Math.sin(phi);
            cube.position.z = 10 * Math.cos(phi);
            
            cube.userData = { originalPosition: cube.position.clone(), text: text };
            this.cubes.push(cube);
            this.scene.add(cube);
        });

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);

        // Add text sprites
        this.createTextSprites();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Start animation
        this.animate();
    }

    createTextSprites() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        this.cubes.forEach((cube, i) => {
            canvas.width = 256;
            canvas.height = 128;
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#6366f1';
            context.font = 'bold 40px "Courier New", monospace';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(this.texts[i], canvas.width / 2, canvas.height / 2);
            
            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(4, 2, 1);
            sprite.position.copy(cube.position).add(new THREE.Vector3(0, 4, 0));
            
            cube.userData.sprite = sprite;
            this.scene.add(sprite);
        });
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate cubes
        this.cubes.forEach((cube, i) => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            
            // Gentle floating motion
            cube.position.y = cube.userData.originalPosition.y + Math.sin(Date.now() * 0.001 + i) * 0.5;
            
            // Update sprite position
            if (cube.userData.sprite) {
                cube.userData.sprite.position.copy(cube.position).add(new THREE.Vector3(0, 4, 0));
            }
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// === INTERACTIVE NETWORK VISUALIZER === //
class NetworkVisualizer {
    constructor() {
        this.nodes = [];
        this.connections = [];
        this.activeNodes = new Set();
        this.init();
    }

    init() {
        // Create skill nodes
        const skills = ['Pentesting', 'Networking', 'WebSec', 'Cryptography', 'Forensics', 'ReverseEng', 'CloudSec', 'IoT'];
        
        skills.forEach((skill, i) => {
            const node = document.createElement('div');
            node.className = 'network-node';
            node.textContent = skill;
            node.dataset.skill = skill.toLowerCase();
            
            const angle = (i / skills.length) * Math.PI * 2;
            const radius = 200;
            
            node.style.cssText = `
                position: absolute;
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                cursor: pointer;
                transform: translate(-50%, -50%);
                left: 50%;
                top: 50%;
                margin-left: ${Math.cos(angle) * radius}px;
                margin-top: ${Math.sin(angle) * radius}px;
                transition: all 0.3s ease;
                z-index: 10;
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
            `;
            
            node.addEventListener('mouseenter', () => this.highlightNode(skill));
            node.addEventListener('mouseleave', () => this.resetNodes());
            
            document.querySelector('.skills-section').appendChild(node);
            this.nodes.push({
                element: node,
                skill: skill,
                angle: angle,
                radius: radius
            });
        });

        // Create canvas for connections
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.querySelector('.skills-section').appendChild(this.canvas);
        this.resizeCanvas();
        
        // Create connections
        this.createConnections();
        
        // Animate
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    createConnections() {
        // Create random connections between nodes
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                if (Math.random() > 0.7) {
                    this.connections.push({
                        node1: i,
                        node2: j,
                        strength: Math.random(),
                        pulse: Math.random() * Math.PI * 2
                    });
                }
            }
        }
    }

    highlightNode(skill) {
        this.activeNodes.add(skill);
        
        this.nodes.forEach(node => {
            if (this.activeNodes.has(node.skill)) {
                node.element.style.transform = `translate(-50%, -50%) scale(1.2)`;
                node.element.style.boxShadow = `0 0 40px rgba(99, 102, 241, 0.6)`;
                node.element.style.background = `linear-gradient(135deg, #8b5cf6, #ec4899)`;
            }
        });
    }

    resetNodes() {
        this.activeNodes.clear();
        
        this.nodes.forEach(node => {
            node.element.style.transform = `translate(-50%, -50%) scale(1)`;
            node.element.style.boxShadow = `0 10px 30px rgba(99, 102, 241, 0.3)`;
            node.element.style.background = `linear-gradient(135deg, #6366f1, #8b5cf6)`;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Draw connections
        this.connections.forEach(conn => {
            const node1 = this.nodes[conn.node1];
            const node2 = this.nodes[conn.node2];
            
            conn.pulse += 0.05;
            const alpha = 0.2 + Math.sin(conn.pulse) * 0.1;
            
            this.ctx.beginPath();
            this.ctx.moveTo(
                centerX + Math.cos(node1.angle) * node1.radius,
                centerY + Math.sin(node1.angle) * node1.radius
            );
            this.ctx.lineTo(
                centerX + Math.cos(node2.angle) * node2.radius,
                centerY + Math.sin(node2.angle) * node2.radius
            );
            
            // Gradient for active connections
            if (this.activeNodes.has(node1.skill) || this.activeNodes.has(node2.skill)) {
                const gradient = this.ctx.createLinearGradient(
                    centerX + Math.cos(node1.angle) * node1.radius,
                    centerY + Math.sin(node1.angle) * node1.radius,
                    centerX + Math.cos(node2.angle) * node2.radius,
                    centerY + Math.sin(node2.angle) * node2.radius
                );
                gradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)');
                gradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');
                this.ctx.strokeStyle = gradient;
            } else {
                this.ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            }
            
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// === AI VOICE ASSISTANT === //
class CyberVoiceAssistant {
    constructor() {
        this.isListening = false;
        this.recognition = null;
        this.responses = {
            'hello': 'Greetings, I am your cyber security assistant. How can I help you?',
            'skills': 'My skills include penetration testing, network security, web application security, and cryptography.',
            'projects': 'Check out my projects section to see my latest work in cybersecurity.',
            'contact': 'You can reach me through the contact form or connect on LinkedIn.',
            'cyber': 'Cybersecurity is not just a job, it\'s a mindset. Always stay vigilant.',
            'hack': 'Ethical hacking helps secure systems. Remember: with great power comes great responsibility.'
        };
        this.init();
    }

    init() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                this.processCommand(transcript);
            };

            this.recognition.onerror = (event) => {
                console.log('Speech recognition error:', event.error);
                this.showResponse('Voice command failed. Please try again.');
            };

            // Create UI
            this.createUI();
        }
    }

    createUI() {
        const assistantBtn = document.createElement('button');
        assistantBtn.id = 'cyber-assistant';
        assistantBtn.innerHTML = '🎤';
        assistantBtn.title = 'Cyber Voice Assistant';
        
        assistantBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
            transition: all 0.3s ease;
        `;

        assistantBtn.addEventListener('mouseenter', () => {
            assistantBtn.style.transform = 'scale(1.1)';
            assistantBtn.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.6)';
        });

        assistantBtn.addEventListener('mouseleave', () => {
            assistantBtn.style.transform = 'scale(1)';
            assistantBtn.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.4)';
        });

        assistantBtn.addEventListener('click', () => this.toggleListening());
        
        document.body.appendChild(assistantBtn);

        // Create response box
        this.responseBox = document.createElement('div');
        this.responseBox.id = 'assistant-response';
        this.responseBox.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 300px;
            padding: 20px;
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 15px;
            color: white;
            font-family: 'Courier New', monospace;
            display: none;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(this.responseBox);
    }

    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        this.isListening = true;
        this.recognition.start();
        this.showResponse('🎤 Listening... Say "hello", "skills", "projects", or "cyber"');
        
        const btn = document.getElementById('cyber-assistant');
        btn.style.background = 'linear-gradient(135deg, #ef4444, #ec4899)';
        btn.innerHTML = '●';
        btn.style.animation = 'pulse 1s infinite';
    }

    stopListening() {
        this.isListening = false;
        this.recognition.stop();
        
        const btn = document.getElementById('cyber-assistant');
        btn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        btn.innerHTML = '🎤';
        btn.style.animation = 'none';
        
        this.hideResponse();
    }

    processCommand(command) {
        let response = 'I heard: "' + command + '". ';
        
        for (const [key, value] of Object.entries(this.responses)) {
            if (command.includes(key)) {
                response = value;
                break;
            }
        }
        
        this.showResponse(response);
        this.speak(response);
        this.stopListening();
    }

    showResponse(text) {
        this.responseBox.textContent = text;
        this.responseBox.style.display = 'block';
        
        setTimeout(() => {
            this.responseBox.style.display = 'none';
        }, 5000);
    }

    hideResponse() {
        this.responseBox.style.display = 'none';
    }

    speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 0.8;
            speechSynthesis.speak(utterance);
        }
    }
}

// === REAL-TIME CYBER DASHBOARD === //
class CyberDashboard {
    constructor() {
        this.metrics = {
            threats: 0,
            protected: 100,
            activity: 50,
            response: 95
        };
        this.init();
    }

    init() {
        // Create dashboard container
        const dashboard = document.createElement('div');
        dashboard.id = 'cyber-dashboard';
        dashboard.innerHTML = `
            <div class="dashboard-header">
                <h3><i class="fas fa-shield-alt"></i> SECURITY DASHBOARD</h3>
                <div class="dashboard-status">LIVE</div>
            </div>
            <div class="metrics-grid">
                <div class="metric-card" data-metric="threats">
                    <div class="metric-icon">⚠️</div>
                    <div class="metric-value">0</div>
                    <div class="metric-label">Active Threats</div>
                    <div class="metric-trend"></div>
                </div>
                <div class="metric-card" data-metric="protected">
                    <div class="metric-icon">🛡️</div>
                    <div class="metric-value">100%</div>
                    <div class="metric-label">Systems Protected</div>
                    <div class="metric-trend"></div>
                </div>
                <div class="metric-card" data-metric="activity">
                    <div class="metric-icon">📊</div>
                    <div class="metric-value">50%</div>
                    <div class="metric-label">Network Activity</div>
                    <div class="metric-trend"></div>
                </div>
                <div class="metric-card" data-metric="response">
                    <div class="metric-icon">⚡</div>
                    <div class="metric-value">95ms</div>
                    <div class="metric-label">Avg Response Time</div>
                    <div class="metric-trend"></div>
                </div>
            </div>
            <div class="dashboard-footer">
                <div class="scan-progress">
                    <div class="scan-bar"></div>
                </div>
                <div class="scan-text">Continuous Security Scan</div>
            </div>
        `;

        dashboard.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 350px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 15px;
            padding: 20px;
            color: white;
            font-family: 'Courier New', monospace;
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: translateY(-100px);
            opacity: 0;
            transition: all 0.5s ease;
        `;

        document.body.appendChild(dashboard);

        // Add CSS for dashboard
        const style = document.createElement('style');
        style.textContent = `
            #cyber-dashboard {
                font-family: 'Segoe UI', 'Courier New', monospace;
            }
            
            .dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(99, 102, 241, 0.3);
            }
            
            .dashboard-header h3 {
                margin: 0;
                font-size: 16px;
                color: #94a3b8;
            }
            
            .dashboard-status {
                background: #10b981;
                color: white;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: bold;
                animation: pulse 2s infinite;
            }
            
            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .metric-card {
                background: rgba(30, 41, 59, 0.8);
                border-radius: 10px;
                padding: 15px;
                text-align: center;
                border: 1px solid rgba(99, 102, 241, 0.1);
                transition: all 0.3s ease;
            }
            
            .metric-card:hover {
                border-color: rgba(99, 102, 241, 0.5);
                transform: translateY(-2px);
            }
            
            .metric-icon {
                font-size: 24px;
                margin-bottom: 10px;
            }
            
            .metric-value {
                font-size: 24px;
                font-weight: bold;
                color: #6366f1;
                margin-bottom: 5px;
            }
            
            .metric-label {
                font-size: 12px;
                color: #94a3b8;
            }
            
            .dashboard-footer {
                margin-top: 20px;
            }
            
            .scan-progress {
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .scan-bar {
                height: 100%;
                background: linear-gradient(90deg, #6366f1, #8b5cf6);
                width: 60%;
                animation: scan 2s infinite linear;
            }
            
            .scan-text {
                font-size: 12px;
                color: #94a3b8;
                text-align: center;
            }
            
            @keyframes scan {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);

        // Show dashboard with animation
        setTimeout(() => {
            dashboard.style.transform = 'translateY(0)';
            dashboard.style.opacity = '1';
        }, 1000);

        // Start updating metrics
        this.startMetricsUpdate();
    }

    startMetricsUpdate() {
        setInterval(() => {
            // Simulate random metric changes
            this.metrics.threats = Math.floor(Math.random() * 5);
            this.metrics.protected = 95 + Math.floor(Math.random() * 5);
            this.metrics.activity = 40 + Math.floor(Math.random() * 20);
            this.metrics.response = 80 + Math.floor(Math.random() * 40);

            this.updateDashboard();
        }, 3000);
    }

    updateDashboard() {
        const threatsElem = document.querySelector('[data-metric="threats"] .metric-value');
        const protectedElem = document.querySelector('[data-metric="protected"] .metric-value');
        const activityElem = document.querySelector('[data-metric="activity"] .metric-value');
        const responseElem = document.querySelector('[data-metric="response"] .metric-value');

        if (threatsElem) threatsElem.textContent = this.metrics.threats;
        if (protectedElem) protectedElem.textContent = `${this.metrics.protected}%`;
        if (activityElem) activityElem.textContent = `${this.metrics.activity}%`;
        if (responseElem) responseElem.textContent = `${this.metrics.response}ms`;

        // Add animation class for updates
        [threatsElem, protectedElem, activityElem, responseElem].forEach(elem => {
            if (elem) {
                elem.classList.add('metric-update');
                setTimeout(() => elem.classList.remove('metric-update'), 300);
            }
        });
    }
}

// === INITIALIZE ALL ADVANCED FEATURES === //
function initializeAdvancedFeatures() {
    console.log('🚀 Initializing Advanced Cyber Portfolio Features...');
    
    // 1. Quantum Renderer
    const quantumRenderer = new QuantumRenderer();
    
    // 2. 3D Terminal (requires Three.js)
    if (typeof THREE !== 'undefined') {
        const cyberTerminal = new CyberTerminal3D('hero-section');
    }
    
    // 3. Network Visualizer
    const networkViz = new NetworkVisualizer();
    
    // 4. Voice Assistant
    const voiceAssistant = new CyberVoiceAssistant();
    
    // 5. Cyber Dashboard
    const cyberDashboard = new CyberDashboard();
    
    // 6. Add Quantum Mode Toggle
    const quantumToggle = document.createElement('button');
    quantumToggle.id = 'quantum-mode';
    quantumToggle.innerHTML = '🌌';
    quantumToggle.title = 'Activate Quantum Mode';
    quantumToggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0ea5e9, #06b6d4);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4);
        transition: all 0.3s ease;
    `;
    
    quantumToggle.addEventListener('click', () => {
        if (quantumRenderer.isActive) {
            quantumRenderer.deactivate();
            quantumToggle.style.background = 'linear-gradient(135deg, #0ea5e9, #06b6d4)';
        } else {
            quantumRenderer.activate();
            quantumToggle.style.background = 'linear-gradient(135deg, #ec4899, #f97316)';
        }
    });
    
    document.body.appendChild(quantumToggle);
    
    console.log('✅ Advanced features initialized!');
}

// === ENHANCED SCROLL EFFECTS === //
function initializeEnhancedScroll() {
    let lastScroll = 0;
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const scrollPercent = (currentScroll / document.body.scrollHeight) * 100;
        
        // Parallax effects for hero section
        if (heroSection) {
            heroSection.style.transform = `translateY(${currentScroll * 0.5}px)`;
            heroSection.style.opacity = `${1 - (currentScroll / 500)}`;
        }
        
        // Scroll progress indicator
        const progressBar = document.querySelector('.scroll-progress') || createScrollProgress();
        progressBar.style.width = `${scrollPercent}%`;
        
        lastScroll = currentScroll;
    });
}

function createScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        z-index: 10001;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progress);
    return progress;
}

// === ADDITIONAL CSS FOR ADVANCED FEATURES === //
const advancedStyles = `
    /* Cyber Typography */
    @font-face {
        font-family: 'Cyber';
        src: url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
    }
    
    /* Enhanced Animations */
    @keyframes cyberPulse {
        0%, 100% { 
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.5),
                       0 0 40px rgba(139, 92, 246, 0.3);
        }
        50% { 
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.8),
                       0 0 60px rgba(139, 92, 246, 0.5),
                       0 0 80px rgba(236, 72, 153, 0.3);
        }
    }
    
    @keyframes matrixRain {
        0% {
            background-position: 0% 0%;
        }
        100% {
            background-position: 0% 100%;
        }
    }
    
    /* Cyber Cursor */
    .cyber-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
        transition: transform 0.1s;
    }
    
    .cyber-cursor-trail {
        width: 40px;
        height: 40px;
        border: 1px solid rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.3s ease;
    }
    
    /* Network Visualization */
    .skills-section {
        position: relative;
        overflow: hidden;
        min-height: 600px;
    }
    
    /* Metric Update Animation */
    .metric-update {
        animation: metricUpdate 0.3s ease;
    }
    
    @keyframes metricUpdate {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    /* Quantum Mode Indicator */
    #quantum-mode.active {
        animation: quantumPulse 1s infinite alternate;
    }
    
    @keyframes quantumPulse {
        from {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.6),
                       0 0 40px rgba(236, 72, 153, 0.4),
                       0 0 60px rgba(236, 72, 153, 0.2);
        }
        to {
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.8),
                       0 0 60px rgba(236, 72, 153, 0.6),
                       0 0 90px rgba(236, 72, 153, 0.
