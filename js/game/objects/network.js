import { createInteractable } from "./interactable.js";


const sprite = new Image();
sprite.src = "./assets/sprites/computer/network_sprite.png";


export function createNetwork(x, y) {

    return createInteractable({

        x,
        y,

        name: "NETWORK",

        prompt: "View Contact",

        label: "Contact",
        sprite,
        width: 128,
        height: 128,

        onInteract() {

            window.dispatchEvent(
                new CustomEvent(
                    "open-portfolio-section",
                    {
                        detail: "contact"
                    }
                )
            );
        }
    });
}