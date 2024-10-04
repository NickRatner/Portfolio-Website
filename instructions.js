const instructionsScreen = document.getElementById('instructionsScreen');

let isInstructionsVisible = true;

window.onload = function() {
    // Check if instructions have already been seen this session
    if (sessionStorage.getItem('instructionsSeen')) 
    {
        // Show the instructions if this is the first time in this session
        document.getElementById('instructionsScreen').style.display = 'none';
        isInstructionsVisible = false;
    }
};

function instructionsClicked() {

    isInstructionsVisible = false;
    document.getElementById('instructionsScreen').style.display = 'none';
    
    // Mark instructions as seen in sessionStorage
    sessionStorage.setItem('instructionsSeen', 'true');
}