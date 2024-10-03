const instructionsScreen = document.getElementById('instructionsScreen');

let isInstructionsVisible = true;


function instructionsClicked()
{
    isInstructionsVisible = false;
    instructionsScreen.remove();
}