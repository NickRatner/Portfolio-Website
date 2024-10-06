
// player sprite images

let playerSpriteRight, playerSpriteLeft, playerSpriteUp, playerSpriteDown;

if(window.location.href.includes("experience.html"))
{
    playerSpriteRight = "url('Images/Sprites/AstronautSpriteRight.png')";
    playerSpriteLeft = "url('Images/Sprites/AstronautSpriteLeft.png')";
}
else
{
    playerSpriteRight = "url('Images/Sprites/playerSpriteRight.png')";
    playerSpriteLeft = "url('Images/Sprites/playerSpriteLeft.png')";
    playerSpriteUp = "url('Images/Sprites/playerSpriteUp.png')";
    playerSpriteDown = "url('Images/Sprites/playerSpriteDown.png')";
}
const player = document.getElementById('player');
player.style.backgroundImage = playerSpriteRight;
const playableArea = document.getElementById('gameArea');

const playerSideLength = player.offsetWidth; // Side length of player in pixels (assuming square sprite)
let posX = player.offsetLeft; // player's X position
let posY = player.offsetTop; // player's Y position

const initialSpeed = 8;
let speed = initialSpeed; // Movement speed
const dashSpeed = 20; // Dash movement speed
let canDash = true;

const numberOfAfterimages = 4; // number of afterimages created
const afterimageDelay = 25; // Delay between afterimages in milliseconds
const spacingMultiplier = 3; // after image distance from each other
const initialOffsetMultiplier = -1; // after image distance from player


let playableAreaWidth = playableArea.offsetWidth;
let playableAreaHeight = playableArea.offsetHeight;

let moving = { up: false, down: false, left: false, right: false };

setInterval(movePlayer, 16); // set up interval to call movePlayer every 16 milliseconds


function resetSpeed()
{
    speed = initialSpeed;
    canDash = true;
}

function setDashSpeed()
{
    speed = dashSpeed;
}

function movePlayer() 
{
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open

    if(moving.up)
    {
        posY = Math.max(0, posY - speed);
    }

    if(moving.down)
    {
        posY = Math.min(playableAreaHeight - playerSideLength, posY + speed);
    }

    if(moving.left)
    {
        posX = Math.max(0, posX - speed);
    }

    if(moving.right)
    {
        posX = Math.min(playableAreaWidth - playerSideLength, posX + speed);
    }
    
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    let collisions = checkCollisionWithPortal(); 

    if(collisions.isColliding) // Check for collision with portals after moving
    {
        enableSpacePopUp(collisions.collisionPortal);
    }
    else
    {
        disablePopUp();
    }

    if(window.location.href.includes("sideProjects.html"))  // if the page is the sideProjects page, check for collision with a cloud
    {
        let collisionsCloud = checkCollisionWithCloud(); 

        disableInfoBox();
        if(collisionsCloud.isColliding) // Check for collision with portals after moving
        {
            enableInfoBox(collisionsCloud.collisionCloud);
        }
        else
        {
            disableInfoBox();
        }
    }

    if(window.location.href.includes("aboutMe.html")) // if the page is the aboutMe page, check for collision with an animal
    {
        let collisionsAnimal = checkCollisionWithAnimals();

        if(collisionsAnimal.isColliding)
        {
            enableSpaceAnimalPopUp(collisionsAnimal.collisionAnimal);
        }
        else
        {

        }
    }
}

function createAfterImages()
{
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open

    const dashDirection = { x: 0, y: 0 };

    if (moving.up) dashDirection.y = -dashSpeed;
    if (moving.down) dashDirection.y = dashSpeed;
    if (moving.left) dashDirection.x = -dashSpeed;
    if (moving.right) dashDirection.x = dashSpeed;


    for (let i = 1; i <= numberOfAfterimages; i++) 
    {
        setTimeout(() => 
        {
            // create new afterimage
            const afterimage = document.createElement('div');
            afterimage.className = 'afterimage';

            // Position based on dash direction
            afterimage.style.left = (posX - (dashDirection.x * (i * spacingMultiplier + initialOffsetMultiplier))) + 'px'; 
            afterimage.style.top = (posY - (dashDirection.y * (i * spacingMultiplier + initialOffsetMultiplier))) + 'px';
            afterimage.style.backgroundImage = player.style.backgroundImage;
            playableArea.appendChild(afterimage);
            

            // Fade out and remove afterimage after 100ms
            setTimeout(() => 
            {
                afterimage.style.opacity = '0';
                setTimeout(() => 
                {
                    playableArea.removeChild(afterimage);
                }, 100); // Remove after 100ms

            }, 10); // Fade out after 10ms
        }, afterimageDelay * i);
    }

}


document.addEventListener('keydown', (event) => 
{
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open
    
    switch(event.key)
    {
        case "w":
        case 'ArrowUp':
            moving.up = true;
            if(!window.location.href.includes("experience.html"))
            {
                player.style.backgroundImage = playerSpriteUp;
            }
            break;

        case "s":
        case 'ArrowDown':
            moving.down = true;
            if(!window.location.href.includes("experience.html"))
            {
                player.style.backgroundImage = playerSpriteDown;
            }
            break;

        case "a":
        case 'ArrowLeft':
            moving.left = true;
            player.style.backgroundImage = playerSpriteLeft;
            break;

        case "d":
        case 'ArrowRight':
            moving.right = true;
            player.style.backgroundImage = playerSpriteRight;
            break;
    }
});

document.addEventListener('keyup', (event) => 
{
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open
    
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
    if (isInstructionsVisible) return;  // don't do anything if instructions are still open
    
    switch(event.key)
    {
        case " ": // when space bar is pressed, dash, or take portal
            
            if(window.location.href.includes("aboutMe.html"))
            {
                let collision = checkCollisionWithAnimals();
                if(collision.isColliding)
                {
                    switch(collision.collisionAnimal.id)
                    {
                        case "bear":
                            window.location.href = "Resume - Nick Ratner.pdf"
                            break
                        
                        case "squirrel":
                            window.location.href = "https://www.linkedin.com/in/nicholas-ratner/"
                            break

                        case "owl":
                            window.location.href = "https://github.com/NickRatner"
                            break
                    }
                }   
            }
        
            let collisions= checkCollisionWithPortal(); 
            // check for pressing space while touching a portal
            if(collisions.isColliding)
            {
                let collisionsPortal = collisions.collisionPortal;

                if(collisionsPortal.id == "sideProjectsPortal") 
                {
                    window.location.href = "sideProjects.html";
                }
                else if(collisionsPortal.id == "experiencePortal")
                {
                    window.location.href = "experience.html";
                }
                else if(collisionsPortal.id == "aboutMePortal")
                {
                    window.location.href = "aboutMe.html";
                }
                else if(collisionsPortal.id = "homePortal")
                {
                    window.location.href = "index.html";
                }
            }

            // otherwise dash
            if(canDash)
            {
                setDashSpeed();
                canDash = false;
                createAfterImages();

                setTimeout(() => 
                {
                    resetSpeed();
                }, 100); // reset speed after 100ms
            }
            break;
    }
});