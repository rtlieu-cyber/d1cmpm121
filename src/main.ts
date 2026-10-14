// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
//import tileUrl from "./assets/tile.svg?no-inline";
import orange from "./assets/orange.png";
import fundraiser from "./assets/fundraiser.png";
import conspiracy from "./assets/conspiracy1.png";
import newspaper from "./assets/newspaper.png";

//create counter var (our money system)
let propaganda: number = 0;
let prop_per_sec: number = 0;

//make the upgrade interface
interface upgrade {
  label: string;
  cost: number;
  level: number; //how many of the upgrade you have
  costmultiplier: number; //how more expensive it gets after you buy
  propaganda_gen: number; //this is per second btw
}

//clock for counting
function clock() {
  const _time = setInterval(() => {
    propaganda += prop_per_sec;
    updateCounter();
  }, 1000);
}

const upgrade_buttons: HTMLButtonElement[] = [];

const upgrades: upgrade[] = [{
  label: "fundraiser",
  cost: 10,
  level: 0,
  costmultiplier: 1.3,
  propaganda_gen: 1,
}, {
  label: "conspiracy theorist",
  cost: 25,
  level: 0,
  costmultiplier: 1.1,
  propaganda_gen: 2,
}, {
  label: "newspaper",
  cost: 100,
  level: 0,
  costmultiplier: 1.6,
  propaganda_gen: 5,
}];

//html

//  <h1 font-family="Rubik Pixels", color: "white", style="text-align: center;">PROPAGANDA MACHINE</h1>
document.body.innerHTML = `
  <h1 style="font-family: 'Rubik Pixels'; color: black; text-align: center;">PROPAGANDA MACHINE</h1>
  <img style="display: block; margin: 0 auto;" src="${orange}" alt="Orange Man">
  <p style="text-align: center;">propaganda generated: <span id="propaganda">0</span></p>
  <p style="text-align: center;">propaganda per second: <span id="prop_per_sec">0</span></p>
  <button style="display: block; margin: 0 auto;" id="increment">generate propaganda!</button>
  <div id="upgrade_container" style="text-align: center;"></div>
  <img style="display: inline;" src="${fundraiser}" alt="Fundraiser Stand">
  <img style="display: inline;" src="${conspiracy}" alt="Conspiracy Theorist">
  <img style="display: inline;" src="${newspaper}" alt="Newspaper Boy">

`;

clock();

//button & updating logic
const button = document.getElementById("increment")!;
const propaganda_display = document.getElementById("propaganda")!;
const prop_per_sec_display = document.getElementById("prop_per_sec")!;
const upgradecontainer = document.getElementById("upgrade_container");

//updating upgrades
if (upgradecontainer) {
  upgrades.forEach((upgrade) => {
    const button = document.createElement("button");
    button.innerText =
      `${upgrade.label} (cost: ${upgrade.cost} | adds ${upgrade.propaganda_gen}/s)`;

    if (propaganda < upgrade.cost) {
      button.disabled = true;
    }

    button.addEventListener("click", () => {
      buy(upgrade, button);
    });

    upgrade_buttons.push(button);
    upgradecontainer.appendChild(button);
  });
}

function buy(upgrade: upgrade, buttonElement: HTMLButtonElement): void {
  upgrade.level++;
  propaganda -= upgrade.cost;
  prop_per_sec += upgrade.propaganda_gen;
  upgrade.cost = Math.floor(upgrade.cost * upgrade.costmultiplier);
  updateCounter();
  buttonElement.innerText =
    `${upgrade.label} (cost: ${upgrade.cost} | adds ${upgrade.propaganda_gen}/s)`;
}

function updateCounter() {
  propaganda_display.textContent = propaganda.toString();
  prop_per_sec_display.textContent = prop_per_sec.toString();
  upgrades.forEach((upgrade, index) => {
    upgrade_buttons[index].disabled = propaganda < upgrade.cost;
  });
}

//click handler
button.addEventListener("click", () => {
  propaganda++;
  updateCounter();
});

//changing background color
document.body.style.backgroundColor = "#f6e7e6";
