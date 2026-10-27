//
const table = document.querySelector(".main")
const second = document.querySelector(".second")
  // [["0","3"],["0","2"],["0","1"],["1","0"],["3","0"],["2","0"],["5","0"],["6","0"],["8","2"],["4","1"],["4","2"],["4","3"],["5","4"],["6","4"],["7","4"],["7","0"],["8","1"],["8","3"],["4","0"],["1","4"]]

// 2026 - js
// 01/

function createTable(a, b) {
  let str = "<table>";
  for (let i = 0; i < a; i++){
    // <table><tr><td></td></tr></table>
    str = str + "<tr>"
    for (let j = 0; j < b; j++){
      str = str + `<td data-i=${i} data-j=${j} ></td>`
    }
    str = str + '</tr>'
  }
  str = str + "</table>"

  return str

}
function createClickableTable(el, width, height) {
  let array = [];
  let object = {};


  el.innerHTML = createTable(width, height)
  el.innerHTML += "<button>SAVE</button><input>"


  const btn = el.querySelector("button")
  const input = el.querySelector("input")
  btn.addEventListener("click", function (e) {
    object[input.value] = JSON.stringify(array)
    console.log(object)
  })
  el.addEventListener("click", function (e) {
    if (e.target.tagName.toLowerCase() != "td") {
      return
    }
    let q = e.target.dataset;
    let i = q.i;
    let j = q.j;
    if (!array.find(function (item) {
      return item[0] == i && item[1] == j
    })) {
      array.push([i, j])
      e.target.className = "marked"
    } else {
      e.target.className = "";
      array = array.filter(function (item) {
        return item[0] != i || item[1] != j
      })
    }
    console.log(JSON.stringify(array))

  }
  )
}

createClickableTable(table, 3, 4)
createClickableTable(second, 9, 5)
let now = new Date();

console.log(now);
let hours = now.getHours();
let minutes = now.getMinutes();

console.log("Часы:", hours);
console.log("Минуты:", minutes);

let hourFirst = Math.floor(hours / 10);
let hourSecond = hours % 10;

console.log("Первая цифра часа:", hourFirst);
console.log("Вторая цифра часа:", hourSecond);

let minuteFirst = Math.floor(minutes / 10);
let minuteSecond = minutes % 10;

console.log("Первая цифра минут:", minuteFirst);
console.log("Вторая цифра минут:", minuteSecond);

let digits = {
    "0": "[[\"0\",\"0\"],[\"1\",\"0\"],[\"2\",\"0\"],[\"3\",\"0\"],[\"4\",\"0\"],[\"5\",\"0\"],[\"6\",\"0\"],[\"7\",\"0\"],[\"8\",\"0\"],[\"8\",\"1\"],[\"8\",\"2\"],[\"8\",\"3\"],[\"8\",\"4\"],[\"7\",\"4\"],[\"6\",\"4\"],[\"5\",\"4\"],[\"4\",\"4\"],[\"3\",\"4\"],[\"2\",\"4\"],[\"1\",\"4\"],[\"0\",\"4\"],[\"0\",\"3\"],[\"0\",\"2\"],[\"0\",\"1\"]]",
    "1": "[[\"8\",\"0\"],[\"8\",\"1\"],[\"8\",\"2\"],[\"8\",\"3\"],[\"8\",\"4\"],[\"7\",\"2\"],[\"6\",\"2\"],[\"5\",\"2\"],[\"4\",\"2\"],[\"3\",\"2\"],[\"2\",\"2\"],[\"1\",\"2\"],[\"0\",\"2\"],[\"1\",\"1\"],[\"3\",\"0\"],[\"2\",\"0\"]]",
    "2": "[[\"8\",\"0\"],[\"8\",\"1\"],[\"8\",\"2\"],[\"8\",\"3\"],[\"8\",\"4\"],[\"1\",\"0\"],[\"0\",\"1\"],[\"0\",\"2\"],[\"0\",\"3\"],[\"1\",\"4\"],[\"2\",\"4\"],[\"3\",\"3\"],[\"4\",\"2\"],[\"5\",\"1\"],[\"6\",\"0\"],[\"7\",\"0\"]]",
    "3": "[[\"1\",\"0\"],[\"0\",\"1\"],[\"0\",\"2\"],[\"0\",\"3\"],[\"1\",\"4\"],[\"2\",\"4\"],[\"3\",\"3\"],[\"4\",\"3\"],[\"4\",\"2\"],[\"5\",\"4\"],[\"6\",\"4\"],[\"7\",\"4\"],[\"7\",\"0\"],[\"8\",\"3\"],[\"8\",\"2\"],[\"8\",\"1\"]]",
    "4": "[[\"0\",\"0\"],[\"1\",\"0\"],[\"2\",\"0\"],[\"3\",\"0\"],[\"4\",\"0\"],[\"4\",\"1\"],[\"4\",\"2\"],[\"4\",\"3\"],[\"4\",\"4\"],[\"2\",\"4\"],[\"0\",\"4\"],[\"1\",\"4\"],[\"3\",\"4\"],[\"5\",\"4\"],[\"6\",\"4\"],[\"8\",\"4\"],[\"7\",\"4\"]]",
    "5": "[[\"0\",\"4\"],[\"0\",\"3\"],[\"0\",\"2\"],[\"0\",\"1\"],[\"0\",\"0\"],[\"1\",\"0\"],[\"2\",\"0\"],[\"3\",\"0\"],[\"4\",\"0\"],[\"4\",\"1\"],[\"4\",\"2\"],[\"4\",\"3\"],[\"4\",\"4\"],[\"5\",\"4\"],[\"6\",\"4\"],[\"7\",\"4\"],[\"8\",\"4\"],[\"8\",\"3\"],[\"8\",\"0\"],[\"8\",\"1\"],[\"8\",\"2\"]]",
    "6": "[[\"0\",\"4\"],[\"0\",\"3\"],[\"0\",\"2\"],[\"0\",\"1\"],[\"0\",\"0\"],[\"1\",\"0\"],[\"2\",\"0\"],[\"3\",\"0\"],[\"4\",\"0\"],[\"4\",\"1\"],[\"4\",\"2\"],[\"4\",\"3\"],[\"4\",\"4\"],[\"5\",\"4\"],[\"6\",\"4\"],[\"7\",\"4\"],[\"8\",\"4\"],[\"8\",\"3\"],[\"8\",\"0\"],[\"8\",\"1\"],[\"8\",\"2\"],[\"5\",\"0\"],[\"6\",\"0\"],[\"7\",\"0\"]]",
    "7": "[[\"0\",\"4\"],[\"0\",\"3\"],[\"0\",\"2\"],[\"0\",\"1\"],[\"0\",\"0\"],[\"4\",\"4\"],[\"5\",\"4\"],[\"6\",\"4\"],[\"7\",\"4\"],[\"8\",\"4\"],[\"3\",\"4\"],[\"2\",\"4\"],[\"1\",\"4\"]]",
    "8": "[[\"0\",\"4\"],[\"0\",\"3\"],[\"0\",\"2\"],[\"0\",\"1\"],[\"0\",\"0\"],[\"4\",\"4\"],[\"5\",\"4\"],[\"6\",\"4\"],[\"7\",\"4\"],[\"8\",\"4\"],[\"3\",\"4\"],[\"2\",\"4\"],[\"1\",\"4\"],[\"1\",\"0\"],[\"2\",\"0\"],[\"3\",\"0\"],[\"4\",\"0\"],[\"4\",\"1\"],[\"4\",\"3\"],[\"4\",\"2\"],[\"5\",\"0\"],[\"6\",\"0\"],[\"7\",\"0\"],[\"8\",\"0\"],[\"8\",\"2\"],[\"8\",\"1\"],[\"8\",\"3\"]]",
    "9": "[[\"0\",\"4\"],[\"0\",\"0\"],[\"4\",\"4\"],[\"5\",\"4\"],[\"6\",\"4\"],[\"7\",\"4\"],[\"8\",\"4\"],[\"3\",\"4\"],[\"2\",\"4\"],[\"1\",\"4\"],[\"1\",\"0\"],[\"2\",\"0\"],[\"3\",\"0\"],[\"4\",\"0\"],[\"8\",\"2\"],[\"8\",\"3\"],[\"0\",\"3\"],[\"0\",\"2\"],[\"0\",\"1\"],[\"4\",\"3\"],[\"4\",\"2\"],[\"4\",\"1\"],[\"8\",\"1\"],[\"8\",\"0\"]]"
}

let firstDigit = JSON.parse(digits[hourFirst]);

console.log(firstDigit);

let clock = document.querySelector(".clock");

for (let i = 0; i < 4; i++) {
  clock.innerHTML += createTable(9, 5);
}

let tables = clock.querySelectorAll("table");

function drawDigit(table, coordinates) {
  for (let i = 0; i < coordinates.length; i++) {
    let row = coordinates[i][0];
    let column = coordinates[i][1];

    let cell = table.querySelector(
      `td[data-i="${row}"][data-j="${column}"]`
    );

    cell.className = "marked";
  }
}
drawDigit(tables[0], firstDigit);

let secondDigit = JSON.parse(digits[hourSecond]);
drawDigit(tables[1], secondDigit);

let thirdDigit = JSON.parse(digits[minuteFirst]);
drawDigit(tables[2], thirdDigit);

let fourthDigit = JSON.parse(digits[minuteSecond]);
drawDigit(tables[3], fourthDigit);

console.log(tables);