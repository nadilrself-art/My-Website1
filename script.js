// ==========================================================================
// Interactive Portfolio Scripts - Nadil Havindu
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // 1. Navbar blur & scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 2. Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars-staggered';
            });
        });
    }

    // 3. Typing effect for hero header subtitle
    const phrases = [
        'Minecraft Server Development',
        'Coding & Scripting Solutions',
        'Staff & Community Moderation',
        'CeylonEsports MC Network'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');

    function typeEffect() {
        if (!typingElement) return;

        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 35 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before typing next phrase
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // 4. Interactive Networking, Development & Moderation Cyber Matrix Canvas
    const canvas = document.getElementById('constellationCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let mouse = {
            x: null,
            y: null,
            radius: 175
        };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        });

        // Network Data Packets moving along links
        let packets = [];
        let nodes = [];

        // Coding symbols for Dev/Moderation vibe
        const devSymbols = ['{ }', '</>', '20.0', 'TPS', 'SQL', 'SSH', 'JVM', 'ACL', 'AUTH', '🛡️', 'HEX'];

        class NetworkNode {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.42;
                this.vy = (Math.random() - 0.5) * 0.42;
                this.radius = Math.random() * 2 + 1.2;
                this.isCoreServer = Math.random() < 0.22; // Server Core Node
                this.hasSymbol = Math.random() < 0.25;
                this.symbol = devSymbols[Math.floor(Math.random() * devSymbols.length)];
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            update() {
                this.pulsePhase += 0.03;

                // Mouse interaction / Repulsion
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const forceDirectionX = dx / dist;
                        const forceDirectionY = dy / dist;
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= forceDirectionX * force * 3.2;
                        this.y -= forceDirectionY * force * 3.2;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                else if (this.x > width) this.x = 0;

                if (this.y < 0) this.y = height;
                else if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                const pulseSize = this.radius + Math.sin(this.pulsePhase) * 0.5;
                ctx.arc(this.x, this.y, Math.max(pulseSize, 0.8), 0, Math.PI * 2);

                if (this.isCoreServer) {
                    ctx.fillStyle = '#ff0000';
                    ctx.shadowColor = 'rgba(255, 0, 0, 0.9)';
                    ctx.shadowBlur = 9;
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                }
                ctx.fill();

                // Faint Dev / Moderation Code Tags near some nodes
                if (this.hasSymbol) {
                    ctx.font = '8px "Fira Code", monospace';
                    ctx.fillStyle = this.isCoreServer ? 'rgba(255, 80, 80, 0.5)' : 'rgba(200, 200, 200, 0.35)';
                    ctx.fillText(this.symbol, this.x + 8, this.y + 3);
                }
            }
        }

        class DataPacket {
            constructor(startNode, endNode) {
                this.start = startNode;
                this.end = endNode;
                this.progress = 0;
                this.speed = Math.random() * 0.015 + 0.008;
            }

            update() {
                this.progress += this.speed;
            }

            draw() {
                const currentX = this.start.x + (this.end.x - this.start.x) * this.progress;
                const currentY = this.start.y + (this.end.y - this.start.y) * this.progress;

                ctx.beginPath();
                ctx.arc(currentX, currentY, 1.8, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ff0000';
                ctx.shadowBlur = 8;
                ctx.fill();
            }
        }

        function initNodes() {
            nodes = [];
            packets = [];
            const count = Math.min(Math.max(Math.floor((width * height) / 15000), 45), 90);
            for (let i = 0; i < count; i++) {
                nodes.push(new NetworkNode());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Spawn network packets across random linked nodes
            if (Math.random() < 0.06 && packets.length < 15 && nodes.length > 2) {
                const i = Math.floor(Math.random() * nodes.length);
                const j = (i + 1 + Math.floor(Math.random() * 5)) % nodes.length;
                const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (dist < 140) {
                    packets.push(new DataPacket(nodes[i], nodes[j]));
                }
            }

            // Draw network connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 135) {
                        const alpha = (1 - dist / 135) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);

                        if (nodes[i].isCoreServer || nodes[j].isCoreServer) {
                            ctx.strokeStyle = `rgba(255, 0, 0, ${alpha * 1.3})`;
                        } else {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                        }
                        ctx.lineWidth = 0.85;
                        ctx.stroke();
                    }
                }

                // Connect to mouse cursor with dynamic red data line
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - nodes[i].x;
                    const dy = mouse.y - nodes[i].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const alpha = (1 - dist / 150) * 0.4;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Animate and render packets
            for (let k = packets.length - 1; k >= 0; k--) {
                packets[k].update();
                packets[k].draw();
                if (packets[k].progress >= 1) {
                    packets.splice(k, 1);
                }
            }

            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            requestAnimationFrame(animate);
        }

        initNodes();
        animate();
    }

    // 5. Smooth Trailing Custom Cursor
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing) {
        let mouseX = -100, mouseY = -100;
        let ringX = -100, ringY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Direct position for the glowing dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth physics interpolation for the trailing ring
        function renderCursor() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        // Enlarge ring on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-meter-card, .highlight-card');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorRing.classList.add('active');
            });
            target.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('active');
            });
        });
    }

    // ═══════════════════════════════════════════════════════
    // 6. Floating Binary / Hex / Dev Code Streams Background
    // ═══════════════════════════════════════════════════════
    const binaryLayer = document.getElementById('binaryLayer');
    if (binaryLayer) {
        const devChars = [
            '0x2F', '0xFF', '01101', '10110', '11001', 'AUTH', 'DENY',
            '3306', '25565', 'TPS', 'SSH', 'ACL', 'LOG', 'ERR',
            'NET', 'MOD', 'BAN', 'GRD', 'PKT', '///', '>>',
            '::1', '8080', 'DEV', 'JVM', 'SQL', 'ACK', 'SYN',
            'KICK', 'MUTE', '/**', '{ }', '---', '>>>'
        ];

        const colCount = Math.floor(window.innerWidth / 60);

        for (let c = 0; c < colCount; c++) {
            if (Math.random() > 0.55) continue; // Only spawn some columns

            const col = document.createElement('div');
            col.className = 'binary-stream-col';
            col.style.left = (c * 60 + Math.random() * 20) + 'px';

            const duration = 10 + Math.random() * 18;
            const delay = Math.random() * 20;
            col.style.animationDuration = duration + 's';
            col.style.animationDelay = delay + 's';

            const charCount = 6 + Math.floor(Math.random() * 10);
            for (let i = 0; i < charCount; i++) {
                const span = document.createElement('span');
                const txt = devChars[Math.floor(Math.random() * devChars.length)];
                span.textContent = txt;

                if (i === 0) {
                    span.className = 'stream-char bright';
                } else if (i < 3) {
                    span.className = 'stream-char mid';
                } else {
                    span.className = 'stream-char dim';
                }
                col.appendChild(span);
            }

            binaryLayer.appendChild(col);
        }

        // Regenerate on resize
        window.addEventListener('resize', () => {
            binaryLayer.innerHTML = '';
            const newColCount = Math.floor(window.innerWidth / 60);
            for (let c = 0; c < newColCount; c++) {
                if (Math.random() > 0.55) continue;
                const col = document.createElement('div');
                col.className = 'binary-stream-col';
                col.style.left = (c * 60 + Math.random() * 20) + 'px';
                const dur = 10 + Math.random() * 18;
                const del = Math.random() * 15;
                col.style.animationDuration = dur + 's';
                col.style.animationDelay = del + 's';
                const cc = 6 + Math.floor(Math.random() * 10);
                for (let i = 0; i < cc; i++) {
                    const span = document.createElement('span');
                    span.textContent = devChars[Math.floor(Math.random() * devChars.length)];
                    span.className = i === 0 ? 'stream-char bright' : i < 3 ? 'stream-char mid' : 'stream-char dim';
                    col.appendChild(span);
                }
                binaryLayer.appendChild(col);
            }
        });
    }

    // ═══════════════════════════════════════════════════════
    // 7. Live Server Log Ticker
    // ═══════════════════════════════════════════════════════
    const tickerContent = document.getElementById('tickerContent');
    if (tickerContent) {
        const logs = [
            { icon: 'fa-circle-check', cls: 'tick-ok', text: '[INFO] Velocity Proxy: All 3 sub-servers CONNECTED' },
            { icon: 'fa-gauge-high', cls: '', text: '[TPS] Node-01 Lobby: 20.0 / 20.0 &nbsp; Node-02 SMP: 19.98' },
            { icon: 'fa-shield-halved', cls: 'tick-ok', text: '[SECURITY] Anti-Cheat: 0 violations in last 5 minutes' },
            { icon: 'fa-database', cls: '', text: '[DB] MySQL Connection Pool: 12/20 threads active' },
            { icon: 'fa-user-shield', cls: 'tick-ok', text: '[MOD] Staff Online: 2 Senior Mods • 3 Helpers active' },
            { icon: 'fa-triangle-exclamation', cls: 'tick-warn', text: '[WARN] Player throughput spike detected on Survival node' },
            { icon: 'fa-circle-check', cls: 'tick-ok', text: '[GC] JVM Garbage Collection completed — Heap cleared' },
            { icon: 'fa-ban', cls: '', text: '[MOD] ACTION: Player XxCheaterxX banned — Fly hacks detected' },
            { icon: 'fa-code', cls: '', text: '[DEV] Nexiz_v2 pushed deploy: v2.1.4-patch — Economy fix' },
            { icon: 'fa-fire-flame-curved', cls: 'tick-ok', text: '[UPTIME] CeylonEsports MC Network: 99.97% Uptime this month' },
            { icon: 'fa-lock', cls: '', text: '[AUTH] Login Gateway: 0 unauthorized access attempts logged' },
            { icon: 'fa-network-wired', cls: 'tick-ok', text: '[PROXY] BungeeCord Tunnel: Latency avg 4ms — Nominal' },
        ];

        // Duplicate logs twice for seamless infinite scroll
        const allLogs = [...logs, ...logs];

        allLogs.forEach(log => {
            const entry = document.createElement('span');
            entry.className = 'tick-entry';
            entry.innerHTML = `<i class="fa-solid ${log.icon}"></i><span class="${log.cls}">${log.text}</span><span class="tick-sep">•</span>`;
            tickerContent.appendChild(entry);
        });
    }
});