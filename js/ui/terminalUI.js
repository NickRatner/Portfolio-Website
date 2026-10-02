import { setUIState } from "../game/gameState.js";


const terminal = document.getElementById(
    "terminal-ui"
);

const terminalOutput = document.getElementById(
    "terminal-output"
);

const terminalInput = document.getElementById(
    "terminal-input"
);

const closeButton = document.getElementById(
    "terminal-close"
);


// =============================================
// INITIALIZE
// =============================================

export function initializeTerminalUI() {

    terminalInput.addEventListener(
        "keydown",
        handleInput
    );


    closeButton.addEventListener(
        "click",
        closeTerminal
    );


    window.addEventListener(
        "open-terminal",
        openTerminal
    );


    printLine("NICK_OS TERMINAL");
    printLine('Type "help" for available commands.');
}


// =============================================
// OPEN
// =============================================

export function openTerminal() {

    terminal.classList.remove("hidden");

    setUIState(
        "terminalOpen",
        true
    );

    terminalInput.focus();
}


// =============================================
// CLOSE
// =============================================

export function closeTerminal() {

    terminal.classList.add("hidden");

    setUIState(
        "terminalOpen",
        false
    );
}


// =============================================
// INPUT
// =============================================

function handleInput(event) {

    if (event.key !== "Enter") {
        return;
    }

    const command =
        terminalInput.value
            .trim()
            .toLowerCase();

    terminalInput.value = "";

    if (!command) {
        return;
    }

    printLine(`> ${command}`);

    executeCommand(command);
}


// =============================================
// COMMANDS
// =============================================

function executeCommand(command) {

    switch (command) {

        // =====================================
        // PORTFOLIO
        // =====================================

        case "about":
            openSection("about");
            break;


        case "projects":
            openSection("projects");
            break;


        case "skills":
            openSection("skills");
            break;


        case "experience":
            openSection("experience");
            break;


        case "contact":
            openSection("contact");
            break;


        case "resume":
            window.open(
                "resume/resume.pdf",
                "_blank"
            );
            break;


        // =====================================
        // SYSTEM
        // =====================================

        case "help":
            printHelp();
            break;

        case "extra":
            printExtra();
            break;

        case "map":
            window.dispatchEvent(
                new CustomEvent("toggle-map")
            );
            break;


        case "whoami":
            printLine(
                "nick - software engineering student"
            );
            break;


        case "clear":
            terminalOutput.innerHTML = "";
            break;


        case "ls":
            printLine("about/");
            printLine("projects/");
            printLine("skills/");
            printLine("experience/");
            printLine("contact/");
            printLine("resume.pdf");
            break;


        case "pwd":
            printLine(
                "/home/nick/portfolio"
            );
            break;


        case "date":
            printLine(
                new Date().toString()
            );
            break;


        // =====================================
        // EXTRAS
        // =====================================

        case "robot":
            robot();
            break;

        case "status":
            status();
            break;

        case "party":
            party();
            break;

        case "rm *":
            rmAll();
            break;

        case "fortune":
            fortune();
            break;

        case "cat":
            cat();
            break;

        case "self-destruct":
            selfDestruct();
            break;

        case "coinflip":
            coinflip();
            break;

        case "inspiration":
            inspiration();
            break;

        case "pretty-help":
            prettyHelp();
            break;

        // =====================================
        // UNKNOWN
        // =====================================

        default:
            printLine(
                `Command not found: ${command}`
            );

            printLine(
                'Type "help" for available commands.'
            );
    }
}


// =============================================
// HELP
// =============================================

function printHelp() {

    printLine(
        "Available commands:"
    );

    printLine("• about");
    printLine("• projects");
    printLine("• skills");
    printLine("• experience");
    printLine("• contact");
    printLine("• resume");
    printLine("• map");
    
    
    printLine(" ");

    printLine(
        "System commands:"
    );

    printLine("• help");
    printLine("• ls");
    printLine("• clear");
    printLine("• whoami");
    printLine("• pwd");
    printLine("• date");

    printLine(" ");
    printLine("• extra");

    printLine(" ");
}


// =============================================
// Extra
// =============================================

function printExtra() {

    printLine(
        "Extra commands:"
    );

    printLine("• robot");
    printLine("• status");
    printLine("• party");
    printLine("• rm *");
    printLine("• fortune");
    printLine("• cat");
    printLine("• self-destruct");
    printLine("• coinflip");
    printLine("• inspiration");
    printLine("• pretty-help");
    
}


// =============================================
// Extra Command Functions
// =============================================

let statusIndex = 0;
let inspirationIndex = 0;
let rmIndex = 0;
let fortuneIndex = 0;
let catIndex = 0;


function robot() {
    printLine(`
             //                                               \\\\
           /'/                                                 \\\`\\
         [\\_/                                                   \\_/]
         I  |..,                                             ...|  I
         [__]-~                                               ~-[__]
         || H                                                   H ||
         || ||                    _________                    || ||
         ||  ||                  /  _   _  \\                  ||  ||
         ||  ||                 | |(_) (_)| |                 ||  ||
          L| /\\                 | |__   __| |                 /\\ L|
 _________|/'_ \\________________|___]___[___|________________/ _\\\`\\|_________
          | (_) |------[ ______               ______ ]------| (_) |
 ---...___I     \\\`\\______\\ ._ \\\`\\\`\\\`---.__ __.---''' _. /______/'     I___...---
          ~~~~----'~~~~/_\\  ^\\_       ~       _/^  /_\\~~~~\\\`----~~~~
                           \\  ~-.           .-~  /
                          /_\\    \\         /    /_\\
                              \\    \\     /    /
                             /_\\     \\_/     /_\\
                                \\___________/
                                / /       \\ \\
                              /' /         \\ \`\\
                            /'  /           \\  \`\\
                        __/____/__         __\\____\\__
                        \\  (_)  /           \\  (_)  /
                         |\\   /               \\   /|
                         ||\\/||               ||\\/||
                         ||  ||               ||  ||
                         ||  ||               ||  ||
                         |H  H|               |H  H|
                      .---H--H---.         .---H--H---.
                     /^\\__|__|__/^\\       /^\\__|__|__/^\\
                     |/'   \\/   \\\`|       |/'   \\/   \\\`|
    `);
}

function status() {
    const messages = [
        "All systems operational. Coffee levels: CRITICAL.",
        "Running smoothly. Probably.",
        "99.9% uptime. The other 0.1% was intentional.",
        "CPU: Fine\nRAM: Fine\nGPU: Fine\nMotivation: Questionable.",
        "Everything is working exactly as intended™.",
        "You're here so everything seems to be working...?",
        "No problems detected. Don't look too closely."
    ];

    printLine(
        messages[statusIndex % messages.length]
    );
    statusIndex++;
}

let partyAnimation = null;

function party() {
    if (partyAnimation) {
        return;
    }

    const frames = [
`
    🌟 \\(•_•)  🌟
        (  (>
        /   \\

       PARTY!
`,
`
    🌟  (•_•)/ 🌟
        <)  )
        /   \\

       PARTY!
`
    ];

    const animationLine =
        document.createElement("div");

    terminalOutput.appendChild(animationLine);

    let frame = 0;

    partyAnimation = setInterval(() => {
        animationLine.textContent =
            frames[frame];

        frame = (frame + 1) % 2;

        terminalOutput.scrollTop =
            terminalOutput.scrollHeight;

    }, 300);

    setTimeout(() => {
        clearInterval(partyAnimation);
        partyAnimation = null;

        animationLine.textContent =
            frames[0];

        terminalOutput.scrollTop =
            terminalOutput.scrollHeight;

    }, 5000);
}

function rmAll() {
    const rmMessages = [
        "rm: cannot remove '*': Permission denied 😅.",
        "Nice try.",
        "Woah Woah Woah, there's no need for that.",
        
    ];

    printLine(
        rmMessages[rmIndex % rmMessages.length]
    );
    rmIndex++;
}

function fortune() {
    const fortunes = [
        "You will soon find a bug you created three months ago.",
        "A successful git push is in your future (no merge conflicts 🥳).",
        "You will encounter a semicolon where you least expect it.",
        "Today is a good day to refactor something that already works.",
        "Your code will run on the first attempt.",
        "You will say 'I'll just make one small change' and regret it.",
        "A mysterious bug will appear when you add a print().",
        "Great things await you.",
        "Good things come to those who hire Nick Ratner.",
    ];

    printLine(
        fortunes[fortuneIndex % fortunes.length]
    );
    fortuneIndex++;
}

function cat() {
    const catArts = [
        `
             *     ,MMM8&&&.            *
                  MMMM88&&&&&    .
                 MMMM88&&&&&&&
     *           MMM88&&&&&&&&
                 MMM88&&&&&&&&
                 'MMM88&&&&&&'
                   'MMM8&&&'      *
          |\\___/|
          )     (             .              '
         =\\     /=
           )===(       *
          /     \\
          |     |
         /       \\
         \\       /
  _/\\_/\\_/\\__  _/_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_
  |  |  |  |( (  |  |  |  |  |  |  |  |  |  |
  |  |  |  | ) ) |  |  |  |  |  |  |  |  |  |
  |  |  |  |(_(  |  |  |  |  |  |  |  |  |  |
  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
        `,

        `
                   .               ,.
                  T."-._..---.._,-"/|
                  l|"-.  _.v._   (" |
                  [l /.'_ \\; _~"-.\`-t
                  Y " _(o} _{o)._ ^.|
                  j  T  ,-<v>-.  T  ]
                  \\  l ( /-^-\\ ) !  !
                   \\. \\.  "~"  ./  /c-..,__
                     ^r- .._ .- .-"  \`- .  ~"--.
                      > \\.                      \\
                      ]   ^.                     \\
                      3  .  ">            .       Y
         ,.__.--._   _j   \\ ~   .         ;       |
        (    ~"-._~"^._\\   ^.    ^._      I     . l
         "-._ ___ ~"-,_7    .Z-._   7"   Y      ;  \\        _
            /"   "~-(r r  _/_--._~-/    /      /,.--^-._   / Y
            "-._    '"~~~>-._~]>--^---./____,.^~        ^.^  !
                ~--._    '   Y---.                        \\./
                     ~~--._  l_   )                        \\
                           ~-._~~~---._,____..---           \\
                               ~----"~       \\
        `,
        `
    _                ___       _.--.
    \\\`.|\\..----...-'\`   \`-._.-'_.-'\`
    /  ' \`         ,       __.--'
    )/' _/     \\   \`-_,   /
    \`-'" \`"\\_  ,_.-;_.-\\_ ',
        _.-'_./   {_.'   ; /
       {_.-\`\`-'         {_/
        `,
    ];

    printLine(
        catArts[catIndex % catArts.length]
    );
    catIndex ++;
}

function selfDestruct() {
    printLine("⚠ SELF-DESTRUCT SEQUENCE INITIATED");
    printLine("");
    printLine("Cancelling all unnecessary processes...");

    setTimeout(() => {
        printLine("Removing portfolio...");
    }, 1000);

    setTimeout(() => {
        printLine("Deleting resume...");
    }, 2000);

    setTimeout(() => {
        printLine("Deleting projects...");
    }, 3000);

    setTimeout(() => {
        printLine("Deleting everything...");
    }, 4000);

    setTimeout(() => {
        printLine("");
        printLine("SELF-DESTRUCT IN:");
    }, 5000);

    setTimeout(() => {
        printLine("3...");
    }, 6000);

    setTimeout(() => {
        printLine("2...");
    }, 7000);

    setTimeout(() => {
        printLine("1...");
    }, 8000);

    setTimeout(() => {
        printLine("");
        printLine("💥 BOOM");
    }, 9000);

    setTimeout(() => {
        printLine("");
        printLine("Just kidding, I hope.");
    }, 10000);
}

function coinflip() {
    const result =
        Math.random() < 0.5
            ? "Heads"
            : "Tails";

    printLine(`🪙 ${result}!`);
}

function inspiration() {
    const messages = [
        "Don't fear the error message. It is trying to help.",
        "The best code is the code you understand six months later.",
        "It works on my machine. Surely it will work everywhere.",
        "Don't be afraid of bugs. They're just undocumented features.",
        "Progress is progress, even when the compiler disagrees.",
        "Today's impossible bug is tomorrow's favorite debugging story.",
        "Your code doesn't have to be perfect. It has to run.",
        "He who would climb the ladder must start at the bottom.",
    ];

    printLine(
        messages[inspirationIndex % messages.length]
    );
    inspirationIndex++;
}

function prettyHelp() {
    printLine(`
╔══════════════════════════════════════╗
║          ✨ NICK_OS HELP ✨         ║
╚══════════════════════════════════════╝

📁 PORTFOLIO
  👤 about
  💻 projects
  🧠 skills
  💼 experience
  📧 contact
  📄 resume
  🗺️  map

⚙ SYSTEM
  ❓ help
  📂 ls
  📍 pwd
  📅 date
  🧹 clear
  👨‍💻 whoami

🎮 FUN
  🤖 robot
  📊 status
  🎉 party
  💣 rm *
  🔮 fortune
  🐱 cat
  💥 self-destruct
  🪙 coinflip
  💡 inspiration
    `);
}

// =============================================
// OPEN PORTFOLIO SECTION
// =============================================

function openSection(section) {

    window.dispatchEvent(
        new CustomEvent(
            "open-portfolio-section",
            {
                detail: section
            }
        )
    );
}


// =============================================
// OUTPUT
// =============================================

function printLine(text) {

    const line =
        document.createElement("div");

    line.textContent = text;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;
}