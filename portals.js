const sideProjectsPortal = document.getElementById('sideProjectsPortal');
const experiencePortal = document.getElementById('experiencePortal');
const aboutMePortal = document.getElementById('aboutMePortal');

const sideProjectsPortalRect = sideProjectsPortal.getBoundingClientRect();
const experiencePortalRect = experiencePortal.getBoundingClientRect();
const aboutMePortalRect = aboutMePortal.getBoundingClientRect();


const sideProjectsPopUp = document.getElementById('sideProjectsPopUp');
const experiencePopUp = document.getElementById('experiencePopUp');
const aboutMePopUp = document.getElementById('aboutMePopUp');


function checkCollisionWithPortal()
{
    const playerRect = player.getBoundingClientRect();

    // Check if the rectangles overlap
    const isCollidingSideProjects = (
        playerRect.x < sideProjectsPortalRect.x + sideProjectsPortalRect.width &&
        playerRect.x + playerRect.width > sideProjectsPortalRect.x &&
        playerRect.y < sideProjectsPortalRect.y + sideProjectsPortalRect.height &&
        playerRect.y + playerRect.height > sideProjectsPortalRect.y
    );

    const isCollidingExperience = (
        playerRect.x < experiencePortalRect.x + experiencePortalRect.width &&
        playerRect.x + playerRect.width > experiencePortalRect.x &&
        playerRect.y < experiencePortalRect.y + experiencePortalRect.height &&
        playerRect.y + playerRect.height > experiencePortalRect.y
    );

    const isCollidingAboutMe = (
        playerRect.x < aboutMePortalRect.x + aboutMePortalRect.width &&
        playerRect.x + playerRect.width > aboutMePortalRect.x &&
        playerRect.y < aboutMePortalRect.y + aboutMePortalRect.height &&
        playerRect.y + playerRect.height > aboutMePortalRect.y
    );

    let isColliding = (isCollidingSideProjects || isCollidingExperience || isCollidingAboutMe)
    return collisions = {isColliding: isColliding, collidingWithSideProjects: isCollidingSideProjects, collidingWithExperience: isCollidingExperience, collidingWithAboutMe: isCollidingAboutMe};
}


function enableSpacePopUp(collisions)
{
    // enable pop ups when colliding

    if(collisions.collidingWithSideProjects)
    {   
        sideProjectsPopUp.style.display = "block";
        sideProjectsPopUp.style.left = sideProjectsPortalRect.left + (sideProjectsPortalRect.width / 2) - (sideProjectsPopUp.offsetWidth / 2) + "px";
        sideProjectsPopUp.style.top = sideProjectsPortalRect.bottom + 10 + "px";
    }
    else if(collisions.collidingWithExperience)
    {
        experiencePopUp.style.display = "block";
        experiencePopUp.style.left = experiencePortalRect.left + (experiencePortalRect.width / 2) - (experiencePopUp.offsetWidth / 2) + "px";
        experiencePopUp.style.top = experiencePortalRect.top - experiencePopUp.offsetHeight + "px";
    }
    else if(collisions.collidingWithAboutMe)
    {
        aboutMePopUp.style.display = "block";
        aboutMePopUp.style.left = aboutMePortalRect.left + (aboutMePortalRect.width / 2) - (aboutMePopUp.offsetWidth / 2) + "px";
        aboutMePopUp.style.top = aboutMePortalRect.top - aboutMePopUp.offsetHeight + "px";
    }
}

function disablePopUp(collisions)
{
    // disable pop ups when not colliding

    if(!collisions.collidingWithSideProjects)
    {
        sideProjectsPopUp.style.display = "none";
    }
    
    if(!collisions.collidingWithExperience)
    {
        experiencePopUp.style.display = "none";
    }
    
    if(!collisions.collidingWithAboutMe)
    {
        aboutMePopUp.style.display = "none";
    }


}