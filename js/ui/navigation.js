import { playSound } from "../game/systems/audio.js";

const menu = document.getElementById(
    "navigation-menu"
);

const menuButton = document.getElementById(
    "menu-button"
);

const closeButton = document.getElementById(
    "menu-close"
);


export function initializeNavigation() {

    menuButton.addEventListener(
        "click",
        openNavigation
    );

    closeButton.addEventListener(
        "click",
        closeNavigation
    );


    document
        .querySelectorAll(
            "#main-navigation [data-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openSection(
                        button.dataset.section
                    );
                }
            );
        });


    document
        .querySelector(
            '[data-action="resume"]'
        )
        .addEventListener(
            "click",
            openResume
        );


    document
        .querySelector(
            '[data-action="return-to-world"]'
        )
        .addEventListener(
            "click",
            closeNavigation
        );
}


// =============================================
// MENU
// =============================================

function openNavigation() {
    playSound("interact");
    menu.classList.remove("hidden");
}


function closeNavigation() {
    menu.classList.add("hidden");
}


// =============================================
// SECTIONS
// =============================================

function openSection(section) {
    closeNavigation();

    window.dispatchEvent(
        new CustomEvent(
            "open-portfolio-section",
            {
                detail: section
            }
        )
    );
}


// =============================================
// RESUME
// =============================================

function openResume() {

    closeNavigation();

    window.open(
        "resume/resume.pdf",
        "_blank"
    );
}