
const player = document.getElementById('player');
const playableArea = document.getElementById('gameArea');

let posX = player.offsetLeft;;
let posY = player.offsetTop;
const speed = 10; // Movement speed
const dashSpeed = 150; // Dash movement speed

let playableAreaWidth = playableArea.offsetWidth;
let playableAreaHeight = playableArea.offsetHeight;

let moving = { up: false, down: false, left: false, right: false };

setInterval(movePlayer, 16); // set up interval to call movePlayer every 16 milliseconds

function movePlayer() 
{
    if(moving.up)
    {
        posY = Math.max(0, posY - speed);
    }

    if(moving.down)
    {
        posY = Math.min(playableAreaHeight - 50, posY + speed);
    }

    if(moving.left)
    {
        posX = Math.max(0, posX - speed);
    }

    if(moving.right)
    {
        posX = Math.min(playableAreaWidth - 50, posX + speed);
    }
    
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';
}

function dash()
{
    if(moving.up)
    {
        posY = Math.max(0, posY - dashSpeed);
    }

    if(moving.down)
    {
        posY = Math.min(playableAreaHeight - 50, posY + dashSpeed);
    }

    if(moving.left)
    {
        posX = Math.max(0, posX - dashSpeed);
    }

    if(moving.right)
    {
        posX = Math.min(playableAreaWidth - 50, posX + dashSpeed);
    }
    
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';
}



document.addEventListener('keydown', (event) => 
{
    switch(event.key)
    {
        case "w":
        case 'ArrowUp':
            moving.up = true;
            break;

        case "s":
        case 'ArrowDown':
            moving.down = true;
            break;

        case "a":
        case 'ArrowLeft':
            moving.left = true;
            break;

        case "d":
        case 'ArrowRight':
            moving.right = true;
            break;
    }
});

document.addEventListener('keyup', (event) => 
{
    switch (event.key)
    {
        case "w":
        case 'ArrowUp':
            moving.up = false;
            break;

        case "s":
        case 'ArrowDown':
            moving.down = false;
            break;

        case "a":
        case 'ArrowLeft':
            moving.left = false;
            break;
        
        case "d":
        case 'ArrowRight':
            moving.right = false;
            break;
    }
});


document.addEventListener('keypress', (event) => 
{
    switch(event.key)
    {
        case " ": // when space bar is pressed, dash
            dash();
            break;
    }
});

