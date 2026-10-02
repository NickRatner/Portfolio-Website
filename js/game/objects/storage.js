import { createInteractable } from "./interactable.js";
import { openModal } from "../../ui/modal.js";


const sprite = new Image();
sprite.src = "./assets/sprites/computer/storage_sprite.png";


export function createStorage(x, y) {

    return createInteractable({

        x,
        y,

        name: "STORAGE",

        prompt: "View Experience",

        label: "Storage",
        sprite,
        width: 128,
        height: 128,

        onInteract() {

            window.dispatchEvent(
                new CustomEvent(
                    "open-portfolio-section",
                    {
                        detail: "experience"
                    }
                )
            );
        }
    });
}