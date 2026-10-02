import { createCPU } from "../objects/cpu.js";
import { createRAM } from "../objects/ram.js";
import { createGPU } from "../objects/gpu.js";
import { createStorage } from "../objects/storage.js";
import { createNetwork } from "../objects/network.js";
import { createTerminal } from "../objects/terminal.js";


export function getWorldMap() {

    return {

        objects: [

            createCPU(1000, 300),

            createRAM(600, 450),

            createGPU(1400, 450),

            createStorage(700, 800),

            createNetwork(1600, 200),

            createTerminal(1500, 850)

        ]
    };
}