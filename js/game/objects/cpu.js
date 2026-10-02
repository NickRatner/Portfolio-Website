import { createInteractable } from "./interactable.js";
import { openModal } from "../../ui/modal.js";


const sprite = new Image();
sprite.src = "./assets/sprites/computer/cpu_sprite.png";


export function createCPU(x, y) {

    return createInteractable({

        x,
        y,

        name: "CPU",

        prompt: "View About",

        label: "About",
        sprite,
        width: 128,
        height: 128,

        onInteract() {

            window.dispatchEvent(
                new CustomEvent(
                    "open-portfolio-section",
                    {
                        detail: "about"
                    }
                )
            );
        }
    });
}