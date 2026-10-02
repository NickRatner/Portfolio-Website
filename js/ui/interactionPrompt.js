const prompt = document.getElementById(
    "interaction-prompt"
);

const interactionText = document.getElementById(
    "interaction-text"
);


export function showInteractionPrompt(text) {

    interactionText.textContent = text;

    prompt.classList.remove("hidden");
}


export function hideInteractionPrompt() {

    prompt.classList.add("hidden");
}