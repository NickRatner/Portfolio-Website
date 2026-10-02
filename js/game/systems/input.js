import { getGameState } from "../gameState.js";
import { attemptDash } from "../player/dash.js";
import {
    interactWithCurrentObject,
    getInteractableAtPosition,
    setMouseHover
} from "./interaction.js";
import { closeModal } from "../../ui/modal.js";

let player = null;
let canvas = null;
let camera = null;

export function initializeInput(playerObject, cameraObject) {
    player = playerObject;
    camera = cameraObject;

    canvas = document.getElementById("game-canvas");

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Mouse interaction
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleMouseClick);
}

function handleKeyDown(event) {
    const state = getGameState();

    // Do not process game controls while any UI is open. (Allow space to close UI, except terminal)
    if (state.ui.terminalOpen || (isModalOpen() && event.code != "Space")) {
        return;
    }

    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            state.input.up = true;
            break;

        case "KeyS":
        case "ArrowDown":
            state.input.down = true;
            break;

        case "KeyA":
        case "ArrowLeft":
            state.input.left = true;
            break;

        case "KeyD":
        case "ArrowRight":
            state.input.right = true;
            break;

        case "KeyM":
            window.dispatchEvent(
                new CustomEvent("toggle-map")
            );
            break;

        case "Space":
            event.preventDefault();
            handleSpace();
            break;
    }
}

function handleKeyUp(event) {
    const state = getGameState();

    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            state.input.up = false;
            break;

        case "KeyS":
        case "ArrowDown":
            state.input.down = false;
            break;

        case "KeyA":
        case "ArrowLeft":
            state.input.left = false;
            break;

        case "KeyD":
        case "ArrowRight":
            state.input.right = false;
            break;
    }
}

function handleSpace() {
    const state = getGameState();

    // If a modal is open, Space closes it.
    if (state.ui.modalOpen) {
        closeModal();
        return;
    }

    // Otherwise interact with the nearby object.
    if (state.interaction.current) {
        interactWithCurrentObject();
        return;
    }

    // Nothing to interact with, so dash.
    attemptDash(player);
}

/*
 * Convert mouse coordinates from the canvas
 * into world coordinates.
 */
function getMouseWorldPosition(event) {
    const rect = canvas.getBoundingClientRect();

    const screenX =
        event.clientX - rect.left;

    const screenY =
        event.clientY - rect.top;

    return {
        x: screenX + camera.x,
        y: screenY + camera.y
    };
}

/*
 * Highlight a component when the mouse
 * is hovering over it.
 */
function handleMouseMove(event) {
    const state = getGameState();

    // Don't interact with the world while UI is open.
    if (
        state.ui.menuOpen ||
        state.ui.mapOpen ||
        state.ui.terminalOpen ||
        state.ui.modalOpen
    ) {
        setMouseHover(null);
        canvas.style.cursor = "default";
        return;
    }

    const position =
        getMouseWorldPosition(event);

    const object =
        getInteractableAtPosition(
            position.x,
            position.y
        );

    setMouseHover(object);

    canvas.style.cursor =
        object ? "pointer" : "default";
}

/*
 * Click a component to interact with it.
 */
function handleMouseClick(event) {
    const state = getGameState();

    // Ignore clicks while UI is open.
    if (
        state.ui.menuOpen ||
        state.ui.mapOpen ||
        state.ui.terminalOpen ||
        state.ui.modalOpen
    ) {
        return;
    }

    const position =
        getMouseWorldPosition(event);

    const object =
        getInteractableAtPosition(
            position.x,
            position.y
        );

    if (object) {
        object.interact();
    }
}


function isUIOpen() {
    const state = getGameState();

    return (
        state.ui.menuOpen ||
        state.ui.mapOpen ||
        state.ui.terminalOpen ||
        state.ui.modalOpen
    );
}

function isModalOpen() {
    const state = getGameState();
    return (
        state.ui.modalOpen
    );
}
