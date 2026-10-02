import { setUIState } from "../game/gameState.js";

const mapMenu = document.getElementById(
    "map-menu"
);

const closeButton = document.getElementById(
    "map-close"
);


export function initializeMapMenu() {

    window.addEventListener(
        "toggle-map",
        toggleMap
    );


    closeButton.addEventListener(
        "click",
        closeMap
    );


    document
        .querySelectorAll(
            "#map .map-node[data-section]"
        )
        .forEach(node => {

            node.addEventListener(
                "click",
                () => {

                    const section =
                        node.dataset.section;

                    closeMap();

                    window.dispatchEvent(
                        new CustomEvent(
                            "open-portfolio-section",
                            {
                                detail: section
                            }
                        )
                    );
                }
            );
        });


    document
        .querySelector(
            "#map-terminal"
        )
        .addEventListener(
            "click",
            () => {

                closeMap();

                window.dispatchEvent(
                    new CustomEvent("open-terminal")
                );
            }
        );
}


// =============================================
// MAP
// =============================================

function toggleMap() {

    const isOpen =
        mapMenu.classList.contains("hidden");

    mapMenu.classList.toggle("hidden");

    setUIState(
        "mapOpen",
        isOpen
    );
}


function closeMap() {

    mapMenu.classList.add("hidden");

    setUIState(
        "mapOpen",
        false
    );
}