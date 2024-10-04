const portals = Array.from(document.querySelectorAll('.portal'));

const PressSpacePopUp = document.getElementById('PressSpacePopUp');


function checkCollisionWithPortal()
{
    const playerRect = player.getBoundingClientRect();
    
    let collisionPortal = null;
    portals.forEach(portal => 
    {
        const portalRect = portal.getBoundingClientRect();

        // Check if the player is colliding with the portal
        if (playerRect.right > portalRect.left &&
            playerRect.left < portalRect.right &&
            playerRect.bottom > portalRect.top &&
            playerRect.top < portalRect.bottom) 
        {
            collisionPortal = portal;
        }
    });
        
    let isColliding = (collisionPortal != null);
    return collisions = {isColliding: isColliding, collisionPortal: collisionPortal};
}

function enableSpacePopUp(portal)
{
    // enable pop ups when colliding

    let portalRect = portal.getBoundingClientRect();

    if(portal.id == "sideProjectsPortal")
    {   
        PressSpacePopUp.style.display = "block";
        PressSpacePopUp.style.left = portalRect.left + (portalRect.width / 2) - (PressSpacePopUp.offsetWidth / 2) + "px";
        PressSpacePopUp.style.top = portalRect.bottom + 10 + "px";
    }
    else
    {
        PressSpacePopUp.style.display = "block";
        PressSpacePopUp.style.left = portalRect.left + (portalRect.width / 2) - (PressSpacePopUp.offsetWidth / 2) + "px";
        PressSpacePopUp.style.top = portalRect.top - PressSpacePopUp.offsetHeight + "px";
    }
    
}


function disablePopUp()
{
    // disable pop ups when not colliding
    PressSpacePopUp.style.display = "none";
}