import {
    setCurrentInteraction,
    getCurrentInteraction
} from "../gameState.js";

const INTERACTION_DISTANCE = 90;

let interactables = [];


/*
 * The world calls this event once its objects
 * have been created.
 */
export function initializeInteraction() {
    window.addEventListener(
        "game-interactables-ready",
        handleInteractablesReady
    );
}


/*
 * Store the objects that can be interacted with.
 */
function handleInteractablesReady(event) {
    interactables = event.detail || [];
}


/*
 * Find the closest interactable object.
 */
export function updateInteraction(player) {
    if (interactables.length === 0) {
        hideInteractionPrompt();
        return;
    }

    let closest = null;
    let closestDistance = Infinity;

    for (const object of interactables) {
        const dx = object.x - player.x;
        const dy = object.y - player.y;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        if (
            distance <= INTERACTION_DISTANCE &&
            distance < closestDistance
        ) {
            closest = object;
            closestDistance = distance;
        }
    }

    // Remove highlight from all objects first.
    for (const object of interactables) {
        object.isHighlighted = false;
    }

    if (closest) {
        closest.isHighlighted = true;

        setCurrentInteraction(closest);

        showInteractionPrompt(closest);
    } else {
        setCurrentInteraction(null);

        hideInteractionPrompt();
    }
}


/*
 * Interact with the currently selected object.
 */
export function interactWithCurrentObject() {
    const object = getCurrentInteraction();

    if (!object) {
        return;
    }

    object.interact();
}


/*
 * Show:
 *
 * [SPACE] View Projects
 */
function showInteractionPrompt(object) {
    const prompt = document.getElementById(
        "interaction-prompt"
    );

    const text = document.getElementById(
        "interaction-text"
    );

    if (!prompt || !text) {
        return;
    }

    text.textContent =
        `[SPACE] ${object.prompt}`;

    prompt.classList.remove("hidden");
}


/*
 * Hide the interaction prompt.
 */
function hideInteractionPrompt() {
    const prompt = document.getElementById(
        "interaction-prompt"
    );

    if (!prompt) {
        return;
    }

    prompt.classList.add("hidden");
}


// Mouse Interaction
export function getInteractableAtPosition(x, y) {
    for (const object of interactables) {
        const halfWidth = object.width / 2;
        const halfHeight = object.height / 2;

        if (
            x >= object.x - halfWidth &&
            x <= object.x + halfWidth &&
            y >= object.y - halfHeight &&
            y <= object.y + halfHeight
        ) {
            return object;
        }
    }

    return null;
}

export function setMouseHover(object) {
    // Clear previous hover
    for (const interactable of interactables) {
        interactable.isMouseHovered = false;
    }

    if (object) {
        object.isMouseHovered = true;
    }
}