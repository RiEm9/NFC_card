const CONTACTS = {
    instagram: "",
    whatsapp: "",
    booking: ""
};

function finishIntro() {
    document.body.classList.add("ready");
}

document.addEventListener("DOMContentLoaded", () => {
    const reducedMotion = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    window.setTimeout(finishIntro, reducedMotion ? 0 : 4400);

    const skipButton = document.querySelector(".skip");
    const intro = document.querySelector(".intro");

    if (skipButton) {
        skipButton.addEventListener("click", finishIntro);
    }

    if (intro) {
        intro.addEventListener("click", finishIntro);
    }

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
});
