const digits = {
  "0": ["11111", "10001", "10001", "10001", "10001", "10001", "10001", "10001", "11111"],
  "1": ["00100", "01100", "10100", "10100", "00100", "00100", "00100", "00100", "11111"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "10000", "10000", "11111"],
  "3": ["01110", "10001", "00001", "00010", "00110", "00001", "00001", "10001", "01110"],
  "4": ["10001", "10001", "10001", "10001", "11111", "00001", "00001", "00001", "00001"],
  "5": ["11111", "10000", "10000", "10000", "11111", "00001", "00001", "00001", "11111"],
  "6": ["11111", "10000", "10000", "10000", "11111", "10001", "10001", "10001", "11111"],
  "7": ["11111", "00001", "00001", "00001", "00001", "00001", "00001", "00001", "00001"],
  "8": ["11111", "10001", "10001", "10001", "11111", "10001", "10001", "10001", "11111"],
  "9": ["11111", "10001", "10001", "10001", "11111", "00001", "00001", "00001", "11111"]
};

const region = document.querySelector("#region");
const addButton = document.querySelector("#add-clock");
const clockList = document.querySelector("#clocks");
const clocks = new Map();

function updateAddButton() {
  addButton.disabled = clocks.has(region.value);
}

function createDigit() {
  const digit = document.createElement("span");
  digit.className = "digit";

  for (let i = 0; i < 45; i++) {
    digit.append(document.createElement("span"));
  }

  return digit;
}

function updateClock(clock, now) {
  const time = clock.formatter.format(now);
  if (clock.time.dateTime === time) return;

  clock.time.dateTime = time;
  clock.time.setAttribute("aria-label", time);
  const numbers = time.replaceAll(":", "");

  clock.digits.forEach((digit, index) => {
    const pattern = digits[numbers[index]].join("");
    Array.from(digit.children).forEach((cell, position) => {
      cell.classList.toggle("marked", pattern[position] === "1");
    });
  });
}

function addClock(option) {
  const zone = option.value;
  if (clocks.has(zone)) return;

  const block = document.createElement("details");
  block.open = true;

  const title = document.createElement("summary");
  title.textContent = option.textContent;
  block.append(title);

  const row = document.createElement("div");
  row.className = "clock-row";

  const time = document.createElement("time");
  time.className = "clock";
  const clockDigits = Array.from({ length: 6 }, createDigit);
  clockDigits.forEach(digit => digit.setAttribute("aria-hidden", "true"));
  time.append(...clockDigits);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-clock";
  removeButton.textContent = "−";
  removeButton.setAttribute("aria-label", `Удалить часы: ${option.textContent}`);
  removeButton.addEventListener("click", () => {
    clocks.delete(zone);
    block.remove();
    updateAddButton();
    region.focus();
  });

  row.append(time, removeButton);
  block.append(row);
  clockList.append(block);

  const formatter = new Intl.DateTimeFormat("ru-RU", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });

  const clock = { time, digits: clockDigits, formatter };
  clocks.set(zone, clock);
  updateClock(clock, new Date());
  updateAddButton();
}

document.querySelector("#clock-controls").addEventListener("submit", event => {
  event.preventDefault();
  addClock(region.selectedOptions[0]);
});
region.addEventListener("change", updateAddButton);

region.value = "Asia/Yekaterinburg";
addClock(region.selectedOptions[0]);

setInterval(() => {
  const now = new Date();
  clocks.forEach(clock => updateClock(clock, now));
}, 250);
