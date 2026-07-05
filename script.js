const CONTACTS = {
    instagram: "https://www.instagram.com/grekova.yuli/",
    whatsapp: "",
    booking: ""
};

const TRANSLATIONS = {
    ru: {
        name: "Юлия Грекова",
        eyebrow: "Lebensberaterin",
        intro: "Пространство для бережного разговора, самопонимания и внутренней опоры.",
        view: "Смотреть",
        write: "Написать",
        booking: "Записаться",
        consultation: "Консультация",
        approach: "Мой подход",
        more: "Подробнее",
        quote: "«Любопытство —<br>начало любого изменения.»",
        skip: "Пропустить",
        contacts: "Контакты",
        phoenixAlt: "Золотой феникс",
        description: "Юлия Грекова — психолог и консультант"
    },
    de: {
        name: "Yuliia Hrekova",
        eyebrow: "Lebensberaterin",
        intro: "Ein geschützter Raum für achtsame Gespräche, Selbsterkenntnis und innere Stabilität.",
        view: "Ansehen",
        write: "Schreiben",
        booking: "Termin vereinbaren",
        consultation: "Beratung",
        approach: "Mein Ansatz",
        more: "Mehr erfahren",
        quote: "„Neugier ist der Anfang<br>jeder Veränderung.“",
        skip: "Überspringen",
        contacts: "Kontakte",
        phoenixAlt: "Goldener Phönix",
        description: "Yuliia Hrekova — Lebensberaterin"
    }
};

let featherFrame;
let introFinished = false;

const finishIntro = () => {
    if (introFinished) return;
    introFinished = true;
    cancelAnimationFrame(featherFrame);
    document.body.classList.add("ready");
};

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const featherPath = document.querySelector(".feather-path");
const feather = document.querySelector(".feather");
const motionDuration = 4040;

const placeFeather = progress => {
    const t = Math.min(1, Math.max(0, progress));
    const fall = 1 - Math.pow(1 - t, 1.25);
    const settle = Math.pow(1 - t, 1.65);
    const wave = Math.PI * 2;

    const x = settle * (
        42 * Math.sin(wave * (.95 * t) + 1.2) +
        14 * Math.sin(wave * (2.1 * t) + .1)
    );

    const airLift = settle * 6 * Math.sin(wave * (1.7 * t) + .5);
    const startY = -118;
    const endY = window.innerHeight * .60;
    const y = startY + (endY - startY) * fall + airLift;

    const angle = settle * (
        3.6 * Math.sin(wave * (.95 * t) - .5) +
        1.2 * Math.sin(wave * (2.1 * t) + 1.1)
    );

    const opacity = Math.min(1, t / .075);
    const scale = .96 + .04 * Math.min(1, t / .16) - .008 * t * t * t;

    featherPath.style.opacity = opacity;
    featherPath.style.transform = `translate3d(calc(-50% + ${x.toFixed(3)}px), ${y.toFixed(3)}px, 0)`;
    feather.style.opacity = opacity;
    feather.style.transform = `translate(-1.5%, -98%) rotate(${angle.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
};

const animateFeather = startTime => {
    const draw = now => {
        if (introFinished) return;
        const progress = (now - startTime) / motionDuration;
        placeFeather(progress);

        if (progress < 1) {
            featherFrame = requestAnimationFrame(draw);
        }
    };

    featherFrame = requestAnimationFrame(draw);
};

document.body.classList.add("motion-js");

if (reducedMotion) {
    placeFeather(1);
    finishIntro();
} else {
    animateFeather(performance.now());
    setTimeout(finishIntro, 4180);
}

document.querySelector(".skip").addEventListener("click", finishIntro);
document.querySelector(".intro").addEventListener("click", finishIntro);

const setLanguage = language => {
    const lang = TRANSLATIONS[language] ? language : "ru";
    const words = TRANSLATIONS[lang];

    document.documentElement.lang = lang;
    document.title = words.name;
    document.querySelector('meta[name="description"]').content = words.description;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        element.textContent = words[element.dataset.i18n];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(element => {
        element.innerHTML = words[element.dataset.i18nHtml];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(element => {
        element.setAttribute("aria-label", words[element.dataset.i18nAria]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(element => {
        element.alt = words[element.dataset.i18nAlt];
    });

    document.querySelector(".language-switch").setAttribute("aria-label", lang === "de" ? "Sprache" : "Язык");

    document.querySelectorAll("[data-lang]").forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });

    localStorage.setItem("language", lang);
};

document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(localStorage.getItem("language") || "ru");

document.querySelectorAll("[data-link]").forEach(link => {
    const url = CONTACTS[link.dataset.link];

    if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noreferrer";
    } else {
        link.addEventListener("click", event => event.preventDefault());
        link.setAttribute("aria-disabled", "true");
    }
});
