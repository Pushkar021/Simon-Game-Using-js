const topleft = document.querySelector(".top-left-circle");
const topright = document.querySelector(".top-right-circle");
const bottomleft = document.querySelector(".bottom-left-circle");
const bottomright = document.querySelector(".bottom-right-circle");
const pointstable = document.querySelector(".pointstable");
const startbtn = document.querySelector(".start");
const wrong01 = document.querySelector("#wrong");
let points = 0;
let flashesPerRound = 1;
let correctPanels = [];

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

  const correctIndex = correctPanels.indexOf(clickedPanel);

  if (correctIndex !== -1) {
    correctPanels.splice(correctIndex, 1);

    if (correctPanels.length === 0) {
      setTimeout(() => {
        points++;
        console.log("You win! Points:", points);
        pointstable.innerText = `POINTS : ${points} You Won!`;
        pointstable.style.boxShadow = "5px 2px 20px rgb(105, 239, 105)";
        setTimeout(() => {
          flashesPerRound++;
          console.log("Flashes per round:", flashesPerRound);

          playRound();
        }, 1000);
      }, 1);
    }
  } else {
    points = 0;
    correctPanels = [];
    console.log("You lost. Points:", points);
    pointstable.innerText = `POINTS : ${points} You Lost!`;
    pointstable.style.boxShadow = "5px 2px 20px red";
    wrong();
    playRound();
  }
};

const playRound = async () => {
  correctPanels = [];

  for (let i = 0; i < flashesPerRound; i++) {
    correctPanels.push(getRandomPanel());
  }

  for (let i = 0; i < flashesPerRound; i++) {
    await flash(correctPanels[i]);
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

// const playSound = (name) => {
//   var audio = new Audio("sounds_" + name + ".mp3");
//   audio.play();
// };

topleft.addEventListener("click", handlePanelClick);
topright.addEventListener("click", handlePanelClick);
bottomleft.addEventListener("click", handlePanelClick);
bottomright.addEventListener("click", handlePanelClick);

startbtn.addEventListener("click", () => {
  points = 0;
  flashesPerRound = 1;
  correctPanels = [];
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
  var audio = new Audio("sounds_" + name + ".mp3");
  audio.play();
}