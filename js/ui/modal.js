import { setUIState } from "../game/gameState.js";

import { about } from "../../data/about.js";
import { projects } from "../../data/projects.js";
import { skills } from "../../data/skills.js";
import { experience } from "../../data/experience.js";
import { contact } from "../../data/contact.js";


const modal = document.getElementById(
    "content-modal"
);

const modalContent = document.getElementById(
    "modal-content"
);

const closeButton = document.getElementById(
    "modal-close"
);


// =============================================
// SECTION DATA
// =============================================

const sections = {
    about,
    projects,
    skills,
    experience,
    contact
};


// =============================================
// INITIALIZE
// =============================================

export function initializeModal() {

    closeButton.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        (event) => {

            if (event.target === modal) {
                closeModal();
            }
        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.code === "Escape" &&
                !modal.classList.contains("hidden")
            ) {
                closeModal();
            }
        }
    );
}


// =============================================
// OPEN
// =============================================

export function openModal({ title, content }) {

    modalContent.innerHTML = `
        <h2>${title}</h2>
        ${content}
    `;

    modal.classList.remove("hidden");

    setUIState("modalOpen", true);
}


// =============================================
// CLOSE
// =============================================

export function closeModal() {

    modal.classList.add("hidden");

    setUIState("modalOpen", false);
}


// =============================================
// SECTION SELECTION
// =============================================

window.addEventListener(
    "open-portfolio-section",
    (event) => {
        openSection(event.detail);
    }
);


function openSection(section) {

    const sectionData = sections[section];

    if (!sectionData) {
        return;
    }

    openModal(sectionData);
}