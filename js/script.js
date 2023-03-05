let addBtn = document.getElementById('add-btn');
let removeBtn = document.getElementById('remove-btn');
let average = document.querySelectorAll("#average");
let totalDays = document.querySelectorAll(".days");
let totalLessons = document.querySelectorAll(".lessons");
let totalAverageMark = document.querySelectorAll(".mark");
let studentAmount = document.querySelectorAll(".students");
let scores = document.querySelectorAll(".rowheight .score");
let days = document.querySelectorAll(".thname");
let presentDays = document.querySelector('.present');
let dateNameRow = document.querySelector("#dateName");
let studentRows = document.querySelectorAll('.rowheight');
let table = document.querySelector('table');
let newTd
let newTh
let td 
let present = [];
let nextDate = new Date();
let totalMissedLessons = 30;
let allDays = 3;

document.querySelector('.students').textContent = "Total Students " + studentRows.length; 
document.querySelector(".lessons").textContent = "Missed Lessons " + totalMissedLessons;
document.querySelector('.days').textContent = "Total Days " + allDays;



function countMissedLessons(scores, present) {
  document.querySelector(".lessons").textContent = "Missed Lessons " + (totalMissedLessons - present.length);
}

console.log(present)

function addRows(studentRows){
  for(let i = 0; i < studentRows.length; i++){
    const newTd = document.createElement('td');
    newTd.classList.add('score');
    newTd.textContent = 0;
    studentRows[i].appendChild(newTd);
  }
}

while (nextDate.getDay() !== 1) {
  nextDate.setDate(nextDate.getDate() + 1);
}

addBtn.addEventListener("click", () => {
  const newTh = document.createElement('th');
  newTh.classList.add('thname');
  const options = {weekday: 'short', day: 'numeric', month: 'short'};
  newTh.textContent = nextDate.toLocaleDateString('en-US', options);
  dateNameRow.appendChild(newTh);
  do {
    nextDate.setDate(nextDate.getDate() + 2);
  } while (nextDate.getDay() % 2 !== 0 || nextDate.getDay() === 0);
  totalMissedLessons += 10;
  allDays += 1;
  document.querySelector(".lessons").textContent = "Missed Lessons " + totalMissedLessons;
  document.querySelector('.days').textContent = "Total Days " + allDays;
  addRows(studentRows);
  calculateAverage(td.parentElement);
  countMissedLessons(scores, present);
});

removeBtn.addEventListener("click", () => {
  let ths = dateNameRow.querySelectorAll('th.thname');
  let lastTh = ths[ths.length - 1];
  lastTh.parentNode.removeChild(lastTh);
  for (let i = 0; i < studentRows.length; i++){
    let td = studentRows[i].querySelectorAll('td.score')[studentRows[i].querySelectorAll('td.score').length - 1];
    td.parentNode.removeChild(td);
  }

  totalMissedLessons -= 10;
  allDays -= 1;
  document.querySelector(".lessons").textContent = "Missed Lessons " + totalMissedLessons;
  document.querySelector('.days').textContent = "Total Days " + allDays;
  let rows = document.querySelectorAll("tbody tr");

  for (let i = 0; i < rows.length; i++) {
    calculateAverage(rows[i]);
  }

  if (document.querySelectorAll('td.score').length === 0) {
    document.querySelector(".mark").textContent = "Average Mark 0";
  }
});

table.addEventListener("click", (e) => {
  if (e.target.classList.contains('score')) {
    var score = prompt("Enter score:");
    if (score != null && score >= 0 && score <= 5) {
      var td = e.target;
      td.textContent = score;
      td.classList.add('present');
      present.push(td);
      calculateAverage(td.parentElement);
      countMissedLessons(scores, present);
    }
  }
});

function calculateAverage(row) {
    var total = 0;
    var count = 0;
    var tds = row.getElementsByTagName("td");
    for (var i = 2; i < tds.length; i++) {
      var score = parseInt(tds[i].textContent);
      if (!isNaN(score)) {
        total += score;
        count++;
      }
    }
    var average = 0;
    if (count > 0) {
      average = total / count;
    }
    row.querySelector("#average").textContent = average.toFixed(1);

    var totalAverage = 0;
    var rows = document.querySelectorAll("tbody tr");
    for (var i = 0; i < rows.length; i++) {
      var rowAverage = parseFloat(rows[i].querySelector("#average").textContent);
      if(!isNaN(rowAverage)){
        totalAverage += rowAverage;
      }
    }
    var averageOfAverages = 0;
    if (rows.length > 0) {
      averageOfAverages = totalAverage / rows.length;
    }
    document.querySelector(".mark").textContent = "Average Mark " + averageOfAverages.toFixed(1);
};
