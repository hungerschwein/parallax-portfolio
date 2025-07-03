let currentSection = 0;
const totalSections = 5;
let isScrolling = false;

const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    requestAnimationFrame(updateCursor);
}
updateCursor();

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.querySelectorAll('a, button, .nav-dot, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

function goToSection(sectionIndex) {
    if (isScrolling) return;
    
    isScrolling = true;
    
    document.querySelectorAll('.section').forEach((section, index) => {
        section.classList.remove('active', 'prev');
        if (index < sectionIndex) {
            section.classList.add('prev');
        } else if (index === sectionIndex) {
            section.classList.add('active');
        }
    });
    
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === sectionIndex);
    });
    
    if (sectionIndex === 2) {
        setTimeout(() => {
            document.querySelectorAll('.skill-card').forEach((card, index) => {
                card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
            });
        }, 300);
    }
    
    currentSection = sectionIndex;
    
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

function nextSection() {
    if (currentSection < totalSections - 1) {
        goToSection(currentSection + 1);
    }
}

function prevSection() {
    if (currentSection > 0) {
        goToSection(currentSection - 1);
    }
}

document.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    if (e.deltaY > 0) {
        nextSection();
    } else {
        prevSection();
    }
});

document.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        nextSection();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        prevSection();
    }
});

let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (isScrolling) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextSection();
        } else {
            prevSection();
        }
    }
});

function handleSubmit(event) {
    event.preventDefault();
}

goToSection(0);
