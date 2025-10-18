// ========================
// MENU TOGGLE & RESPONSIVE
// ========================
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('header nav a');

// Show/hide menu icon on page load
if (window.innerWidth <= 768) menuIcon.style.display = "block";
else menuIcon.style.display = "none";

// Toggle menu on click
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close menu on nav link click (mobile only)
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            menuIcon.classList.remove("bx-x");
            navbar.classList.remove("active");
        }
    });
});

// Reset menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        menuIcon.style.display = "none";
    } else {
        menuIcon.style.display = "block";
    }
});

// ========================
// DATE & GREETING
// ========================
function updateDateGreeting() {
    const dateEl = document.getElementById("date-only");
    const greetingEl = document.getElementById("greeting");
    const now = new Date();

    // Format date
    const options = { month: 'long', day: 'numeric', weekday: 'long' };
    dateEl.textContent = now.toLocaleDateString('en-US', options).toUpperCase();

    // Determine greeting
    const hour = now.getHours();
    let greetingText = '';
    if (hour < 12) greetingText = 'GOOD  MORNING';
    else if (hour < 16) greetingText = 'GOOD  AFTERNOON';
    else if (hour < 19) greetingText = 'GOOD  EVENING';
    else greetingText = 'GOOD  NIGHT';

    // Clear previous
    greetingEl.innerHTML = '';

    greetingText.split('').forEach((letter, i) => {
        const span = document.createElement('span');
        span.classList.add('letter');

        const floatWrap = document.createElement('span');
        floatWrap.classList.add('float-wrap');
        floatWrap.textContent = letter;

        span.style.animation = `letterBounce 0.6s cubic-bezier(0.25,1.25,0.5,1) forwards`;
        span.style.animationDelay = `${i * 0.08}s`;

        const floatDuration = (1.8 + Math.random() * 1.2).toFixed(2) + 's';
        const floatAmount = (-3 - Math.random() * 4) + 'px';
        floatWrap.style.setProperty('--floatDuration', floatDuration);
        floatWrap.style.setProperty('--floatAmount', floatAmount);
        floatWrap.style.animation = `floatBounce var(--floatDuration) ease-in-out infinite ${i * 0.08}s, gradientWave 6s linear infinite ${i * 0.08}s`;

        span.appendChild(floatWrap);
        greetingEl.appendChild(span);
    });
}
updateDateGreeting();
setInterval(updateDateGreeting, 60000);

// ========================
// CONTACT FORMS
// ========================
// WhatsApp
document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();
    let name = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    let phoneNumber = "94756136278";
    let url = "https://wa.me/" + phoneNumber + "?text="
        + "*New Contact Form Submission*%0A%0A"
        + "*Name:* " + name + "%0A"
        + "*Email:* " + email + "%0A"
        + "*Mobile:* " + mobile + "%0A"
        + "*Subject:* " + subject + "%0A"
        + "*Message:* " + message;
    window.open(url, "_blank");
});

// Email
document.getElementById("emailBtn").addEventListener("click", function(){
    let name = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    let mailto = "mailto:dilshantharinda610@gmail.com"
        + "?subject=" + encodeURIComponent("Contact Form: " + subject)
        + "&body=" + encodeURIComponent(
            "Name: " + name + "\n"
            + "Email: " + email + "\n"
            + "Mobile: " + mobile + "\n\n"
            + "Message: " + message
        );
    // Open in a new window instead of changing location
    window.open(mailto, "_blank");
});


// SMS (mobile only)
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
const smsBtn = document.getElementById("smsBtn");
if (isMobileDevice()) {
    smsBtn.style.display = "inline-block";
    smsBtn.addEventListener("click", function(){
        let name = document.getElementById("fullname").value;
        let email = document.getElementById("email").value;
        let mobile = document.getElementById("mobile").value;
        let subject = document.getElementById("subject").value;
        let message = document.getElementById("message").value;
        let phoneNumber = "94756136278";
        let sms = "sms:" + phoneNumber + "?body="
            + encodeURIComponent(
                "New Contact Form Submission\n\n"
                + "Name: " + name + "\n"
                + "Email: " + email + "\n"
                + "Mobile: " + mobile + "\n"
                + "Subject: " + subject + "\n"
                + "Message: " + message
            );
        window.location.href = sms;
    });
} else smsBtn.style.display = "none";

// Prevent services links from breaking particles
document.querySelectorAll(".services-box .btn2").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // Stop default page navigation
        const url = link.getAttribute("href"); // Get link URL
        if (url) {
            window.open(url, "_blank"); // Open in new tab
        }
    });
});

document.getElementById("previewCV").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent default link behavior

    // Open the image in a new tab
    const imageUrl = "images/main-site/INFO/CV.jpg";
    window.open(imageUrl, "_blank"); // _blank ensures new tab
});

// ========================
// VIDEO PLAY & SCROLL
// ========================
let sections = document.querySelectorAll('section');
let videos = document.querySelectorAll('.portfolio-box video');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) video.muted = true, video.play();
        else video.pause();
    });
}, { threshold: 0.5 });

videos.forEach(video => {
    observer.observe(video);
    video.addEventListener('mouseenter', () => { video.muted = false; video.play(); });
    video.addEventListener('mouseleave', () => {
        video.muted = true;
        const rect = video.getBoundingClientRect();
        if (!(rect.top >= 0 && rect.bottom <= window.innerHeight)) video.pause();
    });
});

window.onscroll = () => {
    let top = window.scrollY;
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150, height = sec.offsetHeight, id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// ========================
// SCROLL REVEAL
// ========================
ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-content, .heading, .heading24', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// ========================
// TYPED.JS
// ========================
new Typed('.multiple-text', {
    strings: ['Web Designer', 'Graphic Designer', 'Gamer', 'VFX Editor', 'YouTuber'],
    typeSpeed: 100, backSpeed: 100, backDelay: 1000, loop: true
});
new Typed('.multiple-text2', {
    strings: ['GRAPHIC','MARKETING','COMMERCIAL','VFX','VIDEO EDITS','SOCIAL MEDIA','MUSIC VIDEOS','THUMBNAILS','WEB','GAMING','YOUTUBE'],
    typeSpeed: 80, backSpeed: 60, backDelay: 1500, loop: true
});


/* ========================
   PARTICLES.JS BACKGROUND
   ======================== */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('particles-js');

  // Fade out on page unload
  window.addEventListener("beforeunload", () => {
    container.style.opacity = "0";
  });

  if (typeof particlesJS !== "undefined") {
    particlesJS('particles-js', {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: {
          type: 'circle',
          stroke: { width: 0, color: '#000000' },
          polygon: { nb_sides: 5 },
          image: { src: 'img/github.svg', width: 100, height: 100 }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });

    // Gentle parallax mouse movement
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      container.style.transform = `translate(${x}px, ${y}px)`;
    });
  } else {
    console.warn("⚠️ particles.js not loaded properly");
  }
});








