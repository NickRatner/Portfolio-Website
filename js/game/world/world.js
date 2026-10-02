import {
    drawPCBBackground,
    drawTrace,
    drawVia,
    drawFootprint,
    drawPins,
    drawDecorations,
    drawDenseTraces,
    drawDenseVias,
    drawPCBAnimations
} from "./pcb.js";

import { createCPU } from "../objects/cpu.js";
import { createRAM } from "../objects/ram.js";
import { createGPU } from "../objects/gpu.js";
import { createStorage } from "../objects/storage.js";
import { createNetwork } from "../objects/network.js";
import { createTerminal } from "../objects/terminal.js";

export const WORLD_WIDTH = 2000;
export const WORLD_HEIGHT = 1200;


export function createWorld() {
    const objects = [
        createCPU(1000, 300),
        createRAM(600, 450),
        createGPU(1400, 450),
        createStorage(700, 800),
        createNetwork(1600, 200),
        createTerminal(1500, 850)
    ];

    const world = {
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,

        playerStart: {
            x: 1000,
            y: 600
        },

        objects,

        draw(context, timestamp) {
            // 1. PCB base
            drawPCBBackground(context);

            // 2. Dense circuit network
            drawDenseTraces(context);

            // 3. Connection points
            drawDenseVias(context);

            // 4. Animated circuitry
            drawPCBAnimations(context, timestamp);

            // 5. Decorative components
            drawDecorations(context);

            // 6. Component footprints
            drawComponentFootprints(context);

            // 7. Actual component sprites
            objects.forEach(object => {
                object.draw(context);
            });
        }
    };

    // Let the interaction system know about the objects.
    window.dispatchEvent(
        new CustomEvent("game-interactables-ready", {
            detail: objects
        })
    );

    return world;
}


/*
 * Main motherboard routing.
 *
 * These are intentionally made with mostly
 * 90-degree turns so they look like PCB traces.
 */
function drawMainTraces(context) {

    // CPU -> RAM
    drawTrace(context, [
        { x: 1000, y: 300 },
        { x: 850, y: 300 },
        { x: 850, y: 450 },
        { x: 600, y: 450 }
    ]);


    // CPU -> GPU
    drawTrace(context, [
        { x: 1000, y: 300 },
        { x: 1150, y: 300 },
        { x: 1150, y: 450 },
        { x: 1400, y: 450 }
    ]);


    // CPU -> Network
    drawTrace(context, [
        { x: 1000, y: 300 },
        { x: 1000, y: 180 },
        { x: 1600, y: 180 },
        { x: 1600, y: 200 }
    ]);


    // RAM -> Storage
    drawTrace(context, [
        { x: 600, y: 450 },
        { x: 500, y: 450 },
        { x: 500, y: 800 },
        { x: 700, y: 800 }
    ]);


    // GPU -> Terminal
    drawTrace(context, [
        { x: 1400, y: 450 },
        { x: 1500, y: 450 },
        { x: 1500, y: 850 }
    ]);


    // Storage -> Terminal
    drawTrace(context, [
        { x: 700, y: 800 },
        { x: 700, y: 950 },
        { x: 1500, y: 950 },
        { x: 1500, y: 850 }
    ]);


    // Additional decorative traces
    drawTrace(context, [
        { x: 250, y: 350 },
        { x: 400, y: 350 },
        { x: 400, y: 450 },
        { x: 600, y: 450 }
    ]);


    drawTrace(context, [
        { x: 1400, y: 450 },
        { x: 1550, y: 450 },
        { x: 1550, y: 350 },
        { x: 1750, y: 350 }
    ]);


    drawTrace(context, [
        { x: 300, y: 900 },
        { x: 500, y: 900 },
        { x: 500, y: 800 }
    ]);


    drawTrace(context, [
        { x: 1200, y: 1050 },
        { x: 1200, y: 950 },
        { x: 1500, y: 950 }
    ]);


    // Small branches around CPU
    drawTrace(context, [
        { x: 900, y: 300 },
        { x: 900, y: 220 },
        { x: 800, y: 220 }
    ]);

    drawTrace(context, [
        { x: 1100, y: 300 },
        { x: 1100, y: 220 },
        { x: 1200, y: 220 }
    ]);
}


/*
 * Vias placed at important routing points.
 */
function drawMainVias(context) {
    const vias = [
        // CPU area
        { x: 850, y: 300 },
        { x: 850, y: 450 },
        { x: 1150, y: 300 },
        { x: 1150, y: 450 },

        // Network
        { x: 1000, y: 180 },
        { x: 1600, y: 180 },

        // Storage
        { x: 500, y: 450 },
        { x: 500, y: 800 },

        // Terminal
        { x: 1500, y: 450 },
        { x: 1500, y: 950 },

        // Decorative
        { x: 400, y: 350 },
        { x: 1550, y: 450 },
        { x: 1550, y: 350 },
        { x: 500, y: 900 },
        { x: 1200, y: 950 },

        // CPU branches
        { x: 900, y: 220 },
        { x: 1100, y: 220 }
    ];

    vias.forEach(via => {
        drawVia(
            context,
            via.x,
            via.y
        );
    });
}


/*
 * Draw the PCB footprints underneath the
 * actual computer sprites.
 */
function drawComponentFootprints(context) {

    // CPU
    drawFootprint(
        context,
        1000,
        300,
        150,
        150
    );

    drawPins(
        context,
        1000,
        300,
        130,
        130,
        8
    );


    // RAM
    drawFootprint(
        context,
        600,
        450,
        200,
        140
    );

    drawPins(
        context,
        600,
        450,
        180,
        80,
        6
    );


    // GPU
    drawFootprint(
        context,
        1400,
        450,
        180,
        100
    );

    drawPins(
        context,
        1400,
        450,
        160,
        80,
        10
    );


    // Storage
    drawFootprint(
        context,
        700,
        800,
        120,
        120
    );

    drawPins(
        context,
        700,
        800,
        100,
        100,
        6
    );


    // Network
    drawFootprint(
        context,
        1600,
        200,
        120,
        120
    );

    drawPins(
        context,
        1600,
        200,
        100,
        100,
        6
    );


    // Terminal
    drawFootprint(
        context,
        1500,
        850,
        150,
        150
    );

    drawPins(
        context,
        1500,
        850,
        100,
        100,
        6
    );
}