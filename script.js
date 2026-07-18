// ============= MUSIC PLAYER =============

const musicToggle = document.getElementById("musicToggle");
const backgroundMusic = document.getElementById("backgroundMusic");

// Налаштування музики
if (backgroundMusic) {
    backgroundMusic.volume = 0.5; // 50% гучність
    backgroundMusic.loop = true;
}

if (musicToggle && backgroundMusic) {
    let audioStarted = false;

    const startMusic = () => {
        if (audioStarted || !backgroundMusic.paused) return;

        audioStarted = true;
        backgroundMusic.play().then(() => {
            musicToggle.classList.add("active");
            console.log("✓ Музика запущена");
        }).catch(err => {
            audioStarted = false;
            console.log("⚠ Не можу запустити музику автоматично:", err);
        });
    };

    // Клік на кнопку музики
    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (backgroundMusic.paused) {
            startMusic();
        } else {
            backgroundMusic.pause();
            musicToggle.classList.remove("active");
            console.log("⏸ Музика паузована");
        }
    });

    // Спроба запустити музики при завантаженні сторінки та при першому дотику/кліку
    window.addEventListener("load", startMusic);
    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);
    document.addEventListener("keydown", startMusic);

    // Слідкуємо за стану музики
    backgroundMusic.addEventListener("play", () => {
        musicToggle.classList.add("active");
    });

    backgroundMusic.addEventListener("pause", () => {
        musicToggle.classList.remove("active");
    });

    // Якщо музика закінчилась - грай заново
    backgroundMusic.addEventListener("ended", () => {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    });
}

// ============= ENVELOPE ANIMATION =============

const envelope = document.getElementById("envelope");

if (envelope) {
    envelope.addEventListener("click", () => {
        envelope.classList.add("opened");

        // Перейти на наступну секцію після відкриття
        setTimeout(() => {
            document.getElementById("story").scrollIntoView({ behavior: "smooth" });
        }, 1000);
    });
}

// ============= PETALS ANIMATION =============

function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";

    const left = Math.random() * window.innerWidth;
    const delay = Math.random() * 0.5;
    const duration = 3 + Math.random() * 2;

    petal.style.left = left + "px";
    petal.style.top = "-20px";
    petal.style.animation = `fall ${duration}s linear ${delay}s infinite`;

    document.querySelector(".petals-container").appendChild(petal);

    setTimeout(() => petal.remove(), (duration + delay) * 1000);
}

// Додаємо CSS анімацію для пелюстків
const style = document.createElement("style");
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Генеруємо пелюстки
setInterval(createPetal, 300);

// ============= TIMER =============

const weddingDate = new Date("September 19, 2026 11:00:00").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("days").innerHTML = "0";
        document.getElementById("hours").innerHTML = "0";
        document.getElementById("minutes").innerHTML = "0";
        document.getElementById("seconds").innerHTML = "0";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);

// ============= SCROLL ANIMATIONS =============

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in-section").forEach(el => {
    el.style.opacity = "0";
    observer.observe(el);
});

// ============= SMOOTH SCROLL =============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============= PARALLAX EFFECT =============

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

console.log("✨ Wedding Website Loaded! 💍");
