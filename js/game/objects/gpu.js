import { createInteractable } from "./interactable.js";
import { openModal } from "../../ui/modal.js";


const sprite = new Image();
sprite.src = "./assets/sprites/computer/gpu_sprite.png";


export function createGPU(x, y) {

    return createInteractable({

        x,
        y,

        name: "GPU",

        prompt: "View Skills",

        label: "Skills",
        sprite,
        width: 192,
        height: 96,

        onInteract() {

            window.dispatchEvent(
                new CustomEvent(
                    "open-portfolio-section",
                    {
                        detail: "skills"
                    }
                )
            );
        }
    });
}