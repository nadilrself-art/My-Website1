// ==========================================================================
// Portfolio Script - Nadil Havindu (Nexiz_v2)
// Clean, reliable functionality: Mobile menu, active nav, typewriter effect
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking any nav item
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Active Section Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // 3. Clean Subtitle Typing Effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const phrases = [
            'Minecraft Server Development',
            'Coding & Scripting Solutions',
            'Staff & Community Moderation',
            'CeylonEsports MC Network'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 30 : 75;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2200; // Pause at full word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400; // Pause before new word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    // 4. Subtle Minimal Network & Dev Node Background
    const canvas = document.getElementById('networkCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        });

        let nodes = [];
        const devTags = ['{ }', '</>', 'TPS', 'SQL', 'JVM', '20.0', 'PORT'];

        class Node {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 1.5 + 1;
                this.hasTag = Math.random() < 0.22;
                this.tag = devTags[Math.floor(Math.random() * devTags.length)];
                this.isServer = Math.random() < 0.18;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                else if (this.x > width) this.x = 0;

                if (this.y < 0) this.y = height;
                else if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.isServer ? 'rgba(230, 40, 40, 0.65)' : 'rgba(255, 255, 255, 0.35)';
                ctx.fill();

                if (this.hasTag) {
                    ctx.font = '9px "JetBrains Mono", monospace';
                    ctx.fillStyle = this.isServer ? 'rgba(230, 40, 40, 0.45)' : 'rgba(180, 195, 215, 0.25)';
                    ctx.fillText(this.tag, this.x + 6, this.y + 3);
                }
            }
        }

        function initNodes() {
            nodes = [];
            const count = Math.min(Math.max(Math.floor((width * height) / 22000), 25), 50);
            for (let i = 0; i < count; i++) {
                nodes.push(new Node());
            }
        }

        function render() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        const alpha = (1 - dist / 120) * 0.14;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = nodes[i].isServer || nodes[j].isServer 
                            ? `rgba(230, 40, 40, ${alpha * 1.5})` 
                            : `rgba(255, 255, 255, ${alpha})`;
                        ctx.lineWidth = 0.75;
                        ctx.stroke();
                    }
                }
                nodes[i].update();
                nodes[i].draw();
            }

            requestAnimationFrame(render);
        }

        initNodes();
        render();
    }
});
