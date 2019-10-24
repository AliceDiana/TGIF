let pageURL = document.URL;
let membersArray = [];

if (pageURL.includes("house")) {
  //if my URL includes the word house, I want to fetch the House.endpoint
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
} else if (pageURL.includes("senate")) {
  //if my URL includes the word senate, I want to fetch the Senate.endpoint
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else {
  console.log("no data to fetch");
}
let statistics = {
  // I will populate this  objects with the results of the statistic function to get the number of members in each party
  Democrats: 0,
  Republicans: 0,
  Independents: 0,
  Total: 0
};

let sumOfPercentage = {
  // I will populate this object with the sum of percentage for each party
  Democrats: 0,
  Republicans: 0,
  Independents: 0,
  Total: 0
};

loaderShow(); // I call my loader function to show the loader, then when the data will finish loading I will call the function to hide the loader

fetch(url, {
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
    throw new Error(response.statusText); // if it is not ok, give me the error
  })

  .then(data => {
    // I get the data I need
    membersArray = data.results[0].members; // I give the directions on how to acess the specific member array
    init(); // I call the init, which basically is linked the init function
  })
  .catch(error => {
    // i collect here the errors
    console.log(error);
  });

function init() {
  // I am calling here all the function I need
  loaderHide();
  partyMembers();
  totalPercentage();
  averagePercentage();
  tableAtGlance();
  lessLoyal();
  generateTable(top10less, tableLessPosition); // I tell which results I need, and in which of the two tables to position them
  mostLoyal();
  generateTable(top10most, tableMostPosition); // I tell which results I need, and in which of the two tables to position them
}

function loaderShow() {
  document.querySelector("main").style.display = "none"; //I select my main conten, and I want to hide it while the loader is on
  document.getElementById("spinner"); // I want the loader to appear
}

function loaderHide() {
  document.getElementById("spinner").style.display = "none"; // as the data have been loaded, I want to loader to disappear

  document.querySelector("main").style.display = "block"; // and I want the main content to show
}

function partyMembers() {
  //code to get the number of members of each party

  for (var i = 0; i < membersArray.length; i++) {
    // I want the loop to run for the whole list of members
    if (membersArray[i].party === "R") {
      // and get the number of members in Rep party, and push them in the object above
      statistics.Republicans++; // I need the ++ in order to keep adding them
    } else if (membersArray[i].party === "D") {
      statistics.Democrats++;
    } else {
      statistics.Independents++;
    }
  }
  statistics.Total = // I want to get the total of members
    statistics.Republicans + statistics.Democrats + statistics.Independents;
}

// code to get the averge of vote % for each party

function totalPercentage() {
  // code to get the total of the vote % for each party

  for (var i = 0; i < membersArray.length; i++) {
    if (membersArray[i].party === "R") {
      // if the value party equals to R, then sum the votes_with_party and give them to me in the object above
      //get the sum of % in Democrat party
      sumOfPercentage.Republicans += membersArray[i].votes_with_party_pct;
    } else if (membersArray[i].party === "D") {
      sumOfPercentage.Democrats += membersArray[i].votes_with_party_pct;
    } else {
      sumOfPercentage.Independents += membersArray[i].votes_with_party_pct;
    }
  }
  sumOfPercentage.Total = // for the republicans, the average vote% is equal to the total percenage for Republicans / the number of republican members
    sumOfPercentage.Republicans +
    sumOfPercentage.Democrats +
    sumOfPercentage.Independents;
}

// find average percentage
function averagePercentage() {
  averageRepublicans = sumOfPercentage.Republicans / statistics.Republicans;
  averageDemocrats = sumOfPercentage.Democrats / statistics.Democrats;
  averageTotal = sumOfPercentage.Total / statistics.Total;
  averageIndependent = 0;
}

function tableAtGlance() {
  // create the Senate glance table without a for loop  but I need the ids to fill cell content

  document.getElementById("sr").innerHTML = statistics.Republicans;
  document.getElementById("sd").innerHTML = statistics.Democrats;
  document.getElementById("si").innerHTML = statistics.Independents;
  document.getElementById("st").innerHTML = statistics.Total;

  document.getElementById("vr").innerHTML = averageRepublicans.toFixed(2) + "%"; //two fixed gives me back only two decimals
  document.getElementById("vd").innerHTML = averageDemocrats.toFixed(2) + "%";
  document.getElementById("vi").innerHTML = averageIndependent.toFixed(2) + "%";
  document.getElementById("vt").innerHTML = averageTotal.toFixed(2) + "%";
}

const tableMostPosition = document.getElementById("mostloyal"); // this data need to populate the mostengaged section on HTML
const tableLessPosition = document.getElementById("leastloyal"); // this data need to popu

function generateTable(top10list, tbody) {
  // the generateTable function creates the HTML table  with a for loop for the top10less and top10most and populates it with the values that i want
  for (var i = 0; i < top10list.length; i++) {
    let row = document.createElement("tr"); // I create first the row
    let name = document.createElement("td"); // I create three cells
    let total_votes = document.createElement("td");
    let votes_with_party_pct = document.createElement("td");

    name.innerHTML = `<a href= "${top10list[i].url}" target= "_blank"> ${
      top10list[i].last_name // I use ${} to link the respective url to the memebers
    }, ${top10list[i].first_name} ${top10list[i].middle_name || " "}</a>`;
    // ||  means that if there is no middle name display empty
    total_votes.innerHTML = top10list[i].total_votes;
    votes_with_party_pct.innerHTML = top10list[i].votes_with_party_pct + "%"; // I mean that  I want to populate the cell missed votes with the missed vote values

    row.append(name, total_votes, votes_with_party_pct); // I need to assemble the cells to the row
    tbody.append(row); // I need to put link the row to the body
  }
}

let top10less = []; // i have to put an array as i want to populate it with the results of my function lessLoyal

function lessLoyal() {
  let sortedListLoyalty = membersArray.sort(function(a, b) {
    // I have my membersarray and I sort it from min to max
    return a.votes_with_party_pct - b.votes_with_party_pct;
  });

  let tenPercentage = Math.round((sortedListLoyalty.length * 10) / 100); // I define the 10% of my aray

  for (let i = 0; i < sortedListLoyalty.length; i++) {
    if (i < tenPercentage) {
      // with only the 10%  of my list into account
      top10less.push(sortedListLoyalty[i]); // push the selected members in my array called top10most
    } else if (
      top10less[top10less.length - 1].votes_with_party_pct == // I want to compare the last one of the top10less with the following one to check if there is a missed vote value duplicate
      sortedListLoyalty[i].votes_with_party_pct
    ) {
      top10less.push(sortedListLoyalty[i]); // if you find a duplicate missed vote value, then include it in the top10less array
    } else {
      break; // once it finds all the duplicates, the loop has to stop running
    }
  }
}

let top10most = []; // i have to put an array as i want to populate it with the results of my function mostLoyal

function mostLoyal() {
  //same logic as function above
  let sortedListLoyalty = membersArray.sort(function(a, b) {
    return a.votes_with_party_pct - b.votes_with_party_pct;
  });
  let reversedListLoyalty = sortedListLoyalty.reverse();

  let tenPercentage = Math.round((sortedListLoyalty.length * 10) / 100);

  for (let i = 0; i < reversedListLoyalty.length; i++) {
    if (i < tenPercentage) {
      top10most.push(reversedListLoyalty[i]);
    } else if (
      top10most[top10most.length - 1].votes_with_party_pct ==
      reversedListLoyalty[i].votes_with_party_pct
    ) {
      top10most.push(reversedListLoyalty[i]);
    } else {
      break;
    }
  }
}
