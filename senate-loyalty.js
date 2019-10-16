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
console.log(sumOfPercentage.Republicans);

sumOfPercentage.Total =
  sumOfPercentage.Republicans +
  sumOfPercentage.Democrats +
  sumOfPercentage.Independents;

// code to get the averge of vote % for each party

var averageRepublicans = sumOfPercentage.Republicans / statistics.Republicans;

var averageDemocrats = sumOfPercentage.Democrats / statistics.Democrats;
var averageTotal = sumOfPercentage.Total / statistics.Total;
var averageIndependent = 0;

console.log("The average vote of Republicans is:" + averageRepublicans + "%");

// create the Senate glance table - ids to fill cell content

document.getElementById("sr").innerHTML = statistics.Republicans;
document.getElementById("sd").innerHTML = statistics.Democrats;
document.getElementById("si").innerHTML = statistics.Independents;
document.getElementById("st").innerHTML = statistics.Total;

document.getElementById("vr").innerHTML = averageRepublicans;
document.getElementById("vd").innerHTML = averageDemocrats;
document.getElementById("vi").innerHTML = 0;
document.getElementById("vt").innerHTML = averageTotal;

// Most Loyal (Top 10% )

//function to sort array from min to max % of party votes

var sortedListLoyalty = membersArray.sort(function(a, b) {
  return a.votes_with_party_pct - b.votes_with_party_pct;
});
console.log(sortedListLoyalty);

//function to select  10%  least loyal

let tenPercentage = Math.round((sortedListLoyalty.length * 10) / 100);

console.log(tenPercentage);

let top10most = []; // i have to put an array as its like a box to populate
for (let i = 0; i < sortedListLoyalty.length; i++) {
  if (i < tenPercentage) {
    top10most.push(sortedListLoyalty[i]); // with the push I populate the top10least with my results
  } else if (
    top10most[top10most.length - 1].votes_with_party_pct == // i want to compare the last one of the top10 with the followin one to check if its a duplicate
    sortedListLoyalty[i].votes_with_party_pct
  ) {
    top10most.push(sortedListLoyalty[i]);
  } else {
    break; // once it find duplicate the loop has to stop running
  }
}
console.log(top10most);

// function to generate table

function generateTable3(top10most) {
  var tbody = document.getElementById("leastloyal");

  for (var i = 0; i < top10most.length; i++) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let total_votes = document.createElement("td");
    let votes_with_party_pct = document.createElement("td");

    name.innerHTML = `<a href= "${top10most[i].url}" target= "_blank"> ${
      top10most[i].last_name
    }, ${top10most[i].first_name} ${top10most[i].middle_name || " "}</a>`;
    // || if there is no middle name display empty
    total_votes.innerHTML = top10most[i].total_votes;
    votes_with_party_pct.innerHTML = top10most[i].votes_with_party_pct + "%";

    row.append(name, total_votes, votes_with_party_pct);
    tbody.append(row);
  }
}
generateTable3(top10most);

// Most Loyal (top 10% Loyalty)

var reversedListLoyalty = sortedListLoyalty.reverse();
console.log(reversedListLoyalty);

let top10less = []; // i have to put an array as its like a box to populate
for (let i = 0; i < reversedListLoyalty.length; i++) {
  if (i < tenPercentage) {
    top10less.push(reversedListLoyalty[i]); // with the push I populate the top10least with my results
  } else if (
    top10less[top10less.length - 1].votes_with_party_pct == // i want to compare the last one of the top10 with the followin one to check if its a duplicate
    reversedListLoyalty[i].votes_with_party_pct
  ) {
    top10less.push(reversedListLoyalty[i]);
  } else {
    break; // once it find duplicate the loop has to stop running
  }
}
console.log(top10less);

function generateTable4(top10less) {
  var tbody = document.getElementById("mostloyal");

  for (var i = 0; i < top10less.length; i++) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let total_votes = document.createElement("td");
    let votes_with_party_pct = document.createElement("td");

    name.innerHTML = `<a href= "${top10less[i].url}" target= "_blank"> ${
      top10less[i].last_name
    }, ${top10less[i].first_name} ${top10less[i].middle_name || " "}</a>`;
    // || if there is no middle name display empty
    total_votes.innerHTML = top10less[i].total_votes;
    votes_with_party_pct.innerHTML = top10less[i].votes_with_party_pct + "%";

    row.append(name, total_votes, votes_with_party_pct);
    tbody.append(row);
  }
}
generateTable4(top10less);
