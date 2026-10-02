const WORLD_WIDTH = 2000;
const WORLD_HEIGHT = 1200;


export function canMoveTo(x, y, player) {

    const halfWidth = player.width / 2;
    const halfHeight = player.height / 2;

    if (x - halfWidth < 0) {
        return false;
    }

    if (x + halfWidth > WORLD_WIDTH) {
        return false;
    }

    if (y - halfHeight < 0) {
        return false;
    }

    if (y + halfHeight > WORLD_HEIGHT) {
        return false;
    }

    return true;
}