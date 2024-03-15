const topleft = document.querySelector(".top-left-circle");
const topright = document.querySelector(".top-right-circle");
const bottomleft = document.querySelector(".bottom-left-circle");
const bottomright = document.querySelector(".bottom-right-circle");
const pointstable = document.querySelector(".pointstable");
const startbtn = document.querySelector(".start");
const wrong01 = document.querySelector("#wrong");
let points = 0;
let level = 1;
let flashesPerRound = 1;
let correctPanels = [];
let gamePattern = [];

const flash = (panel) => {
  return new Promise((resolve) => {
    const soundName = getSoundName(panel);
    playSound(soundName);

    panel.classList.add("white-circle");

    setTimeout(() => {
      panel.classList.remove("white-circle");
      resolve();
    }, 700);
  });
};

const handlePanelClick = (event) => {
  const clickedPanel = event.target;

  if (clickedPanel === correctPanels[0]) {
    correctPanels.shift();

    if (correctPanels.length === 0) {
      setTimeout(() => {
        points++;
        console.log("You win! Points:", points);
        pointstable.innerText = `POINTS : ${points} You Won!`;
        pointstable.style.boxShadow = "5px 2px 20px rgb(105, 239, 105)";
        setTimeout(() => {
          level++;
          flashesPerRound++;
          console.log("Level:", level);
          console.log("Flashes per round:", flashesPerRound);

          playRound();
        }, 1000);
      }, 1);
    }
  } else {
    points = 0;
    level = 1;
    correctPanels = [];
    gamePattern = [];
    console.log("You lost. Points:", points);
    pointstable.innerText = `POINTS : ${points} You Lost!`;
    pointstable.style.boxShadow = "5px 2px 20px red";
    wrong();
  }
};

const playRound = async () => {
  gamePattern.push(getRandomPanel());

  correctPanels = gamePattern.slice();

  for (const panel of gamePattern) {
    await flash(panel);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

const getRandomPanel = () => {
  const panels = [topleft, topright, bottomright, bottomleft];
  const randomIndex = Math.floor(Math.random() * panels.length);
  return panels[randomIndex];
};

const getSoundName = (panel) => {
  const panelId = panel.className;
  if (panelId.includes("top-right")) return "red";
  if (panelId.includes("top-left")) return "green";
  if (panelId.includes("bottom-left")) return "yellow";
  if (panelId.includes("bottom-right")) return "blue";
  return "";
};

topleft.addEventListener("click", handlePanelClick);
topright.addEventListener("click", handlePanelClick);
bottomleft.addEventListener("click", handlePanelClick);
bottomright.addEventListener("click", handlePanelClick);

startbtn.addEventListener("click", () => {
  points = 0;
  level = 1;
  flashesPerRound = 1;
  correctPanels = [];
  gamePattern = [];
  playRound();
});

const wrong = () => {
  wrong01.play();
};

topright.addEventListener("click", () => {
  playSound("red");
});

topleft.addEventListener("click", () => {
  playSound("green");
});

bottomright.addEventListener("click", () => {
  playSound("blue");
});

bottomleft.addEventListener("click", () => {
  playSound("yellow");
});

function playSound(name) {
  let audio = new Audio("sounds_" + name + ".mp3");
  audio.play();
}


function toggleDarkMode() {
  const body = document.querySelector("body");
  const darkModeButton = document.querySelector(".dark-mode-button");

  body.classList.toggle("dark-mode");
  darkModeButton.textContent = body.classList.contains("dark-mode")
    ? "Dark Mode"
    : "Light Mode";
}
