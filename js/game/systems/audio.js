const sounds = {};

export function loadSound(
    name,
    path,
    volume = 1
) {
    const audio = new Audio(path);

    audio.volume = volume;
    sounds[name] = audio;
}

export function loadMusic(
    name,
    path,
    volume = 1
) {
    const audio = new Audio(path);

    audio.volume = volume;
    audio.loop = true;

    sounds[name] = audio;
}

export function playSound(name) {
    const sound = sounds[name];

    if (!sound) {
        console.warn(`Sound not loaded: ${name}`);
        return;
    }

    sound.currentTime = 0;

    sound.play().catch(() => {
        // Browsers may block audio until user interaction.
    });
}

export function stopSound(name) {
    const sound = sounds[name];

    if (!sound) {
        return;
    }

    sound.pause();
    sound.currentTime = 0;
}

export function setSoundVolume(name, volume) {
    const sound = sounds[name];

    if (!sound) {
        return;
    }

    sound.volume = Math.max(
        0,
        Math.min(1, volume)
    );
}