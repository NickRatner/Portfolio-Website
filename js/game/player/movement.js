import { getGameState } from "../gameState.js";


export function updateMovement(player) {
    const state = getGameState();

    let x = 0;
    let y = 0;

    if (state.input.up) {
        y -= 1;
    }

    if (state.input.down) {
        y += 1;
    }

    if (state.input.left) {
        x -= 1;
    }

    if (state.input.right) {
        x += 1;
    }


    // No movement
    if (x === 0 && y === 0) {
        return { x: 0, y: 0 };
    }


    // Normalize diagonal movement
    const length = Math.sqrt(x * x + y * y);

    x /= length;
    y /= length;


    // Update facing direction
    player.direction.x = x;
    player.direction.y = y;


    return {
        x: x * player.speed,
        y: y * player.speed
    };
}