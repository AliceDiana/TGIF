let membersArray = [];
let statistics = {
  Democrats: 0,
  Republicans: 0,
  Independents: 0,
  Total: 0
};

let sumOfPercentage = {
  Democrats: 0,
  Republicans: 0,
  Independents: 0,
  Total: 0
};

let averageRepublicans = [];
let averageDemocrats = [];
let averageTotal = [];
let averageIndependent = 0;

loaderShow();

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
  method: "GET",
  headers: {
    "X-API-Key": "iUvnlxO3YZhcfijhBrBHJoe2QlC3BLkN4bVMJixG"
  }
})
  .then(response => {
    //catch response of the server
    if (response.ok) {
      return response.json(); //transform the response from server into json
    }
    throw new Error(response.statusText);
  })

  .then(data => {
    membersArray = data.results[0].members;
    init();
  })

  .catch(error => {
    console.log(error);
  });

function init() {
  loaderHide();
  partyMembers();
  totalPercentage();
  averagePercentage();
  tableAtGlance();
  lessLoyal();
  generateTable(top10less, tableLessPosition);
  mostLoyal();
  generateTable(top10most, tableMostPosition);
}

function loaderShow() {
  document.querySelector("main").style.display = "none";
  document.getElementById("spinner");
}
function loaderHide() {
  document.getElementById("spinner").style.display = "none";

  document.querySelector("main").style.display = "block";
}

function partyMembers() {
  //code to get the number of members of each party

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
}

function totalPercentage() {
  // code to get the totale of vote % for each party

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
}

function averagePercentage() {
  // find average percentage
  averageRepublicans.push(sumOfPercentage.Republicans / statistics.Republicans);
  averageDemocrats.push(sumOfPercentage.Democrats / statistics.Democrats);
  averageTotal.push(sumOfPercentage.Total / statistics.Total);
  averageIndependent = 0;
}

function tableAtGlance() {
  // create the Senate glance table - ids to fill cell content
  document.getElementById("sr").innerHTML = statistics.Republicans;
  document.getElementById("sd").innerHTML = statistics.Democrats;
  document.getElementById("si").innerHTML = statistics.Independents;
  document.getElementById("st").innerHTML = statistics.Total;

  document.getElementById("vr").innerHTML = averageRepublicans;
  document.getElementById("vd").innerHTML = averageDemocrats;
  document.getElementById("vi").innerHTML = 0;
  document.getElementById("vt").innerHTML = averageTotal;
}

const tableMostPosition = document.getElementById("mostloyal"); // this data need to populate the mostengaged section on HTML
const tableLessPosition = document.getElementById("leastloyal"); // this data need to popu

let top10less = []; // i have to put an array as its like a box to populate

function lessLoyal() {
  //function to select  10%  least loyal

  let sortedListLoyalty = membersArray.sort(function(a, b) {
    return a.votes_with_party_pct - b.votes_with_party_pct;
  });

  let tenPercentage = Math.round((sortedListLoyalty.length * 10) / 100);

  for (let i = 0; i < sortedListLoyalty.length; i++) {
    if (i < tenPercentage) {
      top10less.push(sortedListLoyalty[i]); // with the push I populate the top10least with my results
    } else if (
      top10less[top10less.length - 1].votes_with_party_pct == // i want to compare the last one of the top10 with the followin one to check if its a duplicate
      sortedListLoyalty[i].votes_with_party_pct
    ) {
      top10less.push(sortedListLoyalty[i]);
    } else {
      break; // once it find duplicate the loop has to stop running
    }
  }
}

// Most Loyal (top 10% Loyalty)

let top10most = []; // i have to put an array as its like a box to populate

function mostLoyal() {
  let sortedListLoyalty = membersArray.sort(function(a, b) {
    return a.votes_with_party_pct - b.votes_with_party_pct;
  });
  let reversedListLoyalty = sortedListLoyalty.reverse();

  let tenPercentage = Math.round((sortedListLoyalty.length * 10) / 100);

  for (let i = 0; i < reversedListLoyalty.length; i++) {
    if (i < tenPercentage) {
      top10most.push(reversedListLoyalty[i]); // with the push I populate the top10least with my results
    } else if (
      top10most[top10most.length - 1].votes_with_party_pct == // i want to compare the last one of the top10 with the followin one to check if its a duplicate
      reversedListLoyalty[i].votes_with_party_pct
    ) {
      top10most.push(reversedListLoyalty[i]);
    } else {
      break; // once it find duplicate the loop has to stop running
    }
  }
}

function generateTable(top10list, tbody) {
  for (var i = 0; i < top10list.length; i++) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let total_votes = document.createElement("td");
    let votes_with_party_pct = document.createElement("td");

    name.innerHTML = `<a href= "${top10list[i].url}" target= "_blank"> ${
      top10list[i].last_name
    }, ${top10list[i].first_name} ${top10list[i].middle_name || " "}</a>`;
    // || if there is no middle name display empty
    total_votes.innerHTML = top10list[i].total_votes;
    votes_with_party_pct.innerHTML = top10list[i].votes_with_party_pct + "%";

    row.append(name, total_votes, votes_with_party_pct);
    tbody.append(row);
  }
}
