import { createInteractable } from "./interactable.js";
import { openTerminal } from "../../ui/terminalUI.js";


const sprite = new Image();
sprite.src = "./assets/sprites/computer/terminal_sprite.png";


export function createTerminal(x, y) {

    return createInteractable({

        x,
        y,

        name: "TERMINAL",

        prompt: "Open Terminal",

        label: "Terminal",
        sprite,
        width: 128,
        height: 128,

        onInteract() {
            openTerminal();
        }
    });
}