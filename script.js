// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    const bgMusic = document.getElementById('bgMusic');
    const bgVideo = document.getElementById('bgVideo');
    const audioToggle = document.getElementById('audioToggle');
    const audioIcon = document.getElementById('audioIcon');
    
    let isMusicPlaying = false;
    
    // Muted icon SVG
    const mutedIconSVG = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
    `;
    
    // Unmuted icon SVG
    const unmutedIconSVG = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    `;
    
    // Function to update audio icon
    function updateAudioIcon(playing) {
        audioIcon.innerHTML = playing ? unmutedIconSVG : mutedIconSVG;
        if (playing) {
            audioToggle.classList.remove('muted');
        } else {
            audioToggle.classList.add('muted');
        }
    }
    
    // Attempt to autoplay music
    const playMusic = () => {
        bgMusic.play()
            .then(() => {
                console.log('Music started playing automatically');
                isMusicPlaying = true;
                updateAudioIcon(true);
            })
            .catch(error => {
                console.log('Autoplay blocked. Click anywhere to start music.');
                isMusicPlaying = false;
                updateAudioIcon(false);
                
                // Add click listener to play music on first interaction
                document.body.addEventListener('click', function playOnce() {
                    if (!isMusicPlaying) {
                        bgMusic.play()
                            .then(() => {
                                isMusicPlaying = true;
                                updateAudioIcon(true);
                            });
                    }
                    document.body.removeEventListener('click', playOnce);
                }, { once: true });
            });
    };
    
    // Audio toggle button functionality
    audioToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
            updateAudioIcon(false);
        } else {
            bgMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                    updateAudioIcon(true);
                })
                .catch(error => {
                    console.log('Failed to play music:', error);
                });
        }
    });
    
    // Try to play music
    playMusic();
    
    // Ensure video plays (muted videos can autoplay)
    bgVideo.play().catch(error => {
        console.log('Video autoplay issue:', error);
    });
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Log when buttons are clicked
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log(`Button ${index + 1} clicked - Opening: ${button.href}`);
        });
    });
    
    // Add particle effect on mouse move (optional enhancement)
    let particles = [];
    const maxParticles = 50;
    
    document.addEventListener('mousemove', function(e) {
        if (particles.length < maxParticles && Math.random() > 0.95) {
            createParticle(e.clientX, e.clientY);
        }
    });
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.borderRadius = '50%';
        particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.6)`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${Math.random() * 100}px)`;
        }, 10);
        
        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 1000);
    }
});