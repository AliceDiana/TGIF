let membersArray = data.results[0].members;

//code to get the number of members of each party
let statistics = {
  Democrats: 0,
  Republicans: 0,
  Independents: 0,
  Total: 0
};

for (var i = 0; i < membersArray.length; i++) {
  if (membersArray[i].party === "R") {
    //get the number of members in Rep party
    statistics.Republicans++;
  } else if (membersArray[i].party === "D") {
    //get the number of members in Democrat party
    statistics.Democrats++;
  } else {
    //get the number of members in Independent party
    statistics.Independents++;
  }
}

statistics.Total =
  statistics.Republicans + statistics.Democrats + statistics.Independents;

console.log(statistics);

// code to get the totale of vote % for each party

let sumOfPercentage = {
  Democrats: 0,
  Republicans: 0,
  Independents: 0,
  Total: 0
};

for (var i = 0; i < membersArray.length; i++) {
  if (membersArray[i].party === "R") {
    //get the sum of % in Democrat party
    sumOfPercentage.Republicans += membersArray[i].votes_with_party_pct;
  } else if (membersArray[i].party === "D") {
    //get the sum of % members in Democrat party
    sumOfPercentage.Democrats += membersArray[i].votes_with_party_pct;
  } else {
    //get the sum of % in Democrat party
    sumOfPercentage.Independents += membersArray[i].votes_with_party_pct;
  }
}

sumOfPercentage.Total =
  sumOfPercentage.Republicans +
  sumOfPercentage.Democrats +
  sumOfPercentage.Independents;

console.log(sumOfPercentage);

// code to get the averge of vote % for each party

var averageRepublicans = sumOfPercentage.Republicans / statistics.Republicans;
var averageDemocrats = sumOfPercentage.Democrats / statistics.Democrats;
var averageIndependents =
  sumOfPercentage.Independents / statistics.Independents;
var averageTotal = sumOfPercentage.Total / statistics.Total;

console.log(sumOfPercentage.Republicans);
console.log(statistics.Republicans);

console.log("The average vote of Republicans is:" + averageRepublicans + "%");
console.log("The average vote of Democrats is:" + averageDemocrats + "%");
console.log("The average vote of Independent is:" + averageIndependents + "%");
console.log("The average vote of Total is:" + averageTotal + "%");

// create the Senate glance table - ids to fill cell content

document.getElementById("sr").innerHTML = statistics.Republicans;
document.getElementById("sd").innerHTML = statistics.Democrats;
document.getElementById("si").innerHTML = statistics.Independents;
document.getElementById("st").innerHTML = statistics.Total;

document.getElementById("vr").innerHTML = averageRepublicans;
document.getElementById("vd").innerHTML = averageDemocrats;
document.getElementById("vi").innerHTML = averageIndependents;
document.getElementById("vt").innerHTML = averageTotal;

// Most Engaged (Top 10% Attendance)

//function to sort array from min to max missed vote %

var sortedList = membersArray.sort(function(a, b) {
  return a.missed_votes_pct - b.missed_votes_pct;
});

//function to select top 10% most engaged

let tenPercentage = Math.round((sortedList.length * 10) / 100);

console.log(tenPercentage);

let top10most = []; // i have to put an array as its like a box to populate
for (let i = 0; i < sortedList.length; i++) {
  if (i < tenPercentage) {
    top10most.push(sortedList[i]); // with the push I populate the top10least with my results
  } else if (
    top10most[top10most.length - 1].missed_votes_pct == // i want to compare the last one of the top10 with the followin one to check if its a duplicate
    sortedList[i].missed_votes_pct
  ) {
    top10most.push(sortedList[i]);
  } else {
    break; // once it find duplicate the loop has to stop running
  }
}
console.log(top10most);

// function to generate table

function generateTable(top10most) {
  var tbody = document.getElementById("mostengaged");

  for (var i = 0; i < top10most.length; i++) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let missed_votes = document.createElement("td");
    let missed_votes_pct = document.createElement("td");

    name.innerHTML = `<a href= "${top10most[i].url}" target= "_blank"> ${
      top10most[i].last_name
    }, ${top10most[i].first_name} ${top10most[i].middle_name || " "}</a>`;
    // || if there is no middle name display empty
    missed_votes.innerHTML = top10most[i].missed_votes;
    missed_votes_pct.innerHTML = top10most[i].missed_votes_pct + "%";

    row.append(name, missed_votes, missed_votes_pct);
    tbody.append(row);
  }
}
generateTable(top10most);

// Less Engaged (Top 10% Attendance)

var reversedList = sortedList.reverse();
console.log(reversedList);

let top10less = []; // i have to put an array as its like a box to populate
for (let i = 0; i < reversedList.length; i++) {
  if (i < tenPercentage) {
    top10less.push(reversedList[i]); // with the push I populate the top10least with my results
  } else if (
    top10less[top10less.length - 1].missed_votes_pct == // i want to compare the last one of the top10 with the followin one to check if its a duplicate
    reversedList[i].missed_votes_pct
  ) {
    top10less.push(reversedList[i]);
  } else {
    break; // once it find duplicate the loop has to stop running
  }
}
console.log(top10less);

function generateTable2(top10less) {
  var tbody = document.getElementById("lessengaged");

  for (var i = 0; i < top10less.length; i++) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let missed_votes = document.createElement("td");
    let missed_votes_pct = document.createElement("td");

    name.innerHTML = `<a href= "${top10less[i].url}" target= "_blank"> ${
      top10less[i].last_name
    }, ${top10less[i].first_name} ${top10less[i].middle_name || " "}</a>`;
    // || if there is no middle name display empty
    missed_votes.innerHTML = top10less[i].missed_votes;
    missed_votes_pct.innerHTML = top10less[i].missed_votes_pct + "%";

    row.append(name, missed_votes, missed_votes_pct);
    tbody.append(row);
  }
}
generateTable2(top10less);
