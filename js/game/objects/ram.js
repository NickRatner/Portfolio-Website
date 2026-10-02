import { createInteractable } from "./interactable.js";
import { openModal } from "../../ui/modal.js";


const sprite = new Image();
sprite.src = "./assets/sprites/computer/ram_sprite.png";


export function createRAM(x, y) {

    return createInteractable({

        x,
        y,

        name: "RAM",

        prompt: "View Projects",

        label: "Projects",
        sprite,
        width: 192,
        height: 96,

        onInteract() {

            window.dispatchEvent(
                new CustomEvent(
                    "open-portfolio-section",
                    {
                        detail: "projects"
                    }
                )
            );
        }
    });
}