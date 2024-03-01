// // script.js

// let topleft = document.querySelector(".top-left-circle");
// let topright = document.querySelector(".top-right-circle");
// let bottomleft = document.querySelector(".bottom-left-circle");
// let bottomright = document.querySelector(".bottom-right-circle");
// function randidx() {
//   const arr = [topleft, topright, bottomright, bottomleft];
//   let comp = arr[parseInt(Math.random() * arr.length)];
//   console.log(comp);
//   return comp;
// }
// const array = [randidx()];

// const flash = (panel) => {
//   return new Promise((resolve, reject) => {
//     panel.classList.add("white-circle"); // Add the white-circle class
//     setTimeout(() => {
//       panel.classList.remove("white-circle"); // Remove the white-circle class
//       setTimeout(() => {
//         resolve();
//       }, 500);
//     }, 1000);
//   });
// };

// canclick = false;
// const main = async () => {
//   for (let panel of array) {
//     await flash(panel);
//   }
//   canclick = true;
// };
// main();

// function userclick(e) {
//   if (!canclick) return;

//   topleft.addEventListener("click", () => {
//     console.log(event.currentTarget);
//   });
//   topright.addEventListener("click", () => {
//     console.log(event.currentTarget);
//   });
//   bottomleft.addEventListener("click", () => {
//     console.log(event.currentTarget);
//   });
//   bottomright.addEventListener("click", () => {
//     console.log(event.currentTarget);
//   });
// }
// main().then(() => userclick());
// function gamescore(randidx, userclick) {
//   console.log(comp);
// }

// script.js

const topleft = document.querySelector(".top-left-circle");
const topright = document.querySelector(".top-right-circle");
const bottomleft = document.querySelector(".bottom-left-circle");
const bottomright = document.querySelector(".bottom-right-circle");

function randidx() {
  const arr = [topleft, topright, bottomright, bottomleft];
  const selectedPanel = arr[parseInt(Math.random() * arr.length)]; // Corrected naming
  console.log(selectedPanel);
  return selectedPanel;
}
const sequence = [randidx()];
let sequencetoguess = [...sequence];
const array = [randidx()]; // Generate the initial random panel

const flash = (panel) => {
  return new Promise((resolve, reject) => {
    panel.classList.add("white-circle"); // Add the white-circle class
    setTimeout(() => {
      panel.classList.remove("white-circle"); // Remove the white-circle class
      setTimeout(() => {
        resolve();
      }, 500);
    }, 1000);
  });
};

let canclick = false;
const main = async () => {
  for (let panel of array) {
    await flash(panel);
  }
  canclick = true;
};

const click = (click) => {
  const expectedpanel = sequencetoguess.shift();
  if (expectedpanel === click) {
    if (sequencetoguess.length === 0) {
      console.log("won!");
    } else {
      alert("game over");
    }
  }
};

main().then(() => click());
