import React, { useEffect, useRef } from 'react';

const StarryBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId = 0;
        let particles: Particle[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            brightness: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = (Math.random() - 0.5) * 0.2;
                this.speedY = (Math.random() - 0.5) * 0.2;
                this.brightness = Math.random();
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around
                if (this.x < 0) this.x = canvas!.width;
                if (this.x > canvas!.width) this.x = 0;
                if (this.y < 0) this.y = canvas!.height;
                if (this.y > canvas!.height) this.y = 0;

                // Twinkle
                this.brightness += (Math.random() - 0.5) * 0.05;
                if (this.brightness > 1) this.brightness = 1;
                if (this.brightness < 0.2) this.brightness = 0.2;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const initParticles = () => {
            particles = [];
            const numberOfParticles = reducedMotion ? 24 : Math.min(40, Math.floor(window.innerWidth / 40));
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const drawFrame = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                if (!reducedMotion) p.update();
                p.draw();
            });

            if (!reducedMotion) {
                const maxDistanceSq = 110 * 110;
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const a = particles[i];
                        const b = particles[j];
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;
                        const distanceSq = dx * dx + dy * dy;
                        if (distanceSq >= maxDistanceSq) continue;
                        const distance = Math.sqrt(distanceSq);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 110) * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            drawFrame();
            if (document.hidden || reducedMotion) return;
            animationFrameId = requestAnimationFrame(animate);
        };

        const onVisibility = () => {
            if (document.hidden || reducedMotion) return;
            cancelAnimationFrame(animationFrameId);
            animate();
        };

        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', onVisibility);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', onVisibility);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-[#090A0F]">
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)'
                }}
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block"
            />
        </div>
    );
};

export default StarryBackground;
