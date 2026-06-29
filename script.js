const CONTACTS = {
    instagram: "https://www.instagram.com/grekova.yuli/",
    whatsapp: "",
    booking: ""
};

const finishIntro = () => document.body.classList.add("ready");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

setTimeout(finishIntro, reducedMotion ? 0 : 4400);

document.querySelector(".skip").addEventListener("click", finishIntro);
document.querySelector(".intro").addEventListener("click", finishIntro);

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
