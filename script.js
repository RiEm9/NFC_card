const CONTACTS = {
    instagram: "https://www.instagram.com/grekova.yuli/",
    whatsapp: "",
    booking: ""
};

const TRANSLATIONS = {
    ru: {
        name: "Юлия Грекова",
        eyebrow: "Психолог · консультант",
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

const finishIntro = () => document.body.classList.add("ready");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

setTimeout(finishIntro, reducedMotion ? 0 : 4180);

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
