let membersArray = [];

loaderShow();

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
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
  generateTable(membersArray);
  dropdownfilter(membersArray);
  changecountry();
}

function loaderShow() {
  document.querySelector("main").style.display = "none";
  document.getElementById("spinner");
}

function loaderHide() {
  document.getElementById("spinner").style.display = "none";

  document.querySelector("main").style.display = "block";
}

function generateTable(membersArray) {
  var tbody = document.getElementById("senate-data");

  for (var i = 0; i < membersArray.length; i++) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let party = document.createElement("td");
    let state = document.createElement("td");
    let years = document.createElement("td");
    let votes = document.createElement("td");

    // name.innerHTML =
    //   "<a href='" +
    //   membersArray[i].url +
    //   "' target='_blank'>" +
    //   membersArray[i].last_name +
    //   ", " +
    //   membersArray[i].first_name +
    //   " " +
    //   (membersArray[i].middle_name || " ") +
    //   "</a>";

    name.innerHTML = `<a href= "${membersArray[i].url}" target= "_blank"> ${
      membersArray[i].last_name
    }, ${membersArray[i].first_name} ${membersArray[i].middle_name || " "}</a>`; // || if there is no middle name display empty
    party.innerHTML = membersArray[i].party;
    state.innerHTML = membersArray[i].state;
    years.innerHTML = membersArray[i].seniority;
    votes.innerHTML = membersArray[i].votes_with_party_pct + "%";
    row.setAttribute("data-party", membersArray[i].party);
    row.setAttribute("data-state", membersArray[i].state);
    row.append(name, party, state, years, votes);
    tbody.append(row);
  }
}

function filterItems(itemsToFilter) {
  // let checkBoxes = document.querySelectorAll("input.party-checkbox");

  let checkboxDemocrat = document.getElementById("Democrats");
  let checkboxRepublicans = document.getElementById("Republicans");
  let checkboxIndependents = document.getElementById("Independents");

  checkboxRepublicans.addEventListener("click", changecountry); // i link the chckboxes to my primary function,  (it is like a chain, I have to link the filters to the primary function, and the second function to the primary function)
  checkboxDemocrat.addEventListener("click", changecountry);
  checkboxIndependents.addEventListener("click", changecountry);

  for (var i = 0; i < itemsToFilter.length; i++) {
    itemsToFilter[i].style.display = "none"; // i start not displaying results

    if (
      checkboxRepublicans.checked && // if checkbox R is checkd, I want to display R in  a table row
      itemsToFilter[i].getAttribute("data-party") == "R"
    ) {
      itemsToFilter[i].style.display = "table-row";
    }
    if (
      checkboxDemocrat.checked &&
      itemsToFilter[i].getAttribute("data-party") == "D"
    ) {
      itemsToFilter[i].style.display = "table-row";
    }
    if (
      checkboxIndependents.checked &&
      itemsToFilter[i].getAttribute("data-party") == "I"
    ) {
      itemsToFilter[i].style.display = "table-row";
    }
  }
}

function dropdownfilter(members) {
  let countryList = []; // new array to be populated with loop results

  for (let i = 0; i < members.length; i++) {
    // I build my  State dropdown
    countryList.push(members[i].state);
  } // with the push I populate the countryList with my results

  let uniqueCountryArray = [...new Set(countryList)].sort(); // with Set I get a new Array of unique values
  // with [...] I create a new array which is acceoted by js and I copy the array content into the new one

  // I build my dropdown in HTMl
  let select = document.getElementById("countrydropdown");

  for (i = 0; i < uniqueCountryArray.length; i++) {
    let option = document.createElement("option");

    option.setAttribute("value", uniqueCountryArray[i]);
    option.innerHTML = uniqueCountryArray[i];

    select.appendChild(option);
  }
}

function changecountry() {
  let filterdropdown = document.getElementById("countrydropdown"); //define dropdown list
  let tabletofilter = document.querySelectorAll("[data-state]"); //
  filterdropdown.addEventListener("change", changecountry); // add change event to  the dropdown filter
  // connect the dropdown list with the table to filter by country

  let stateList = [];

  for (var i = 0; i < tabletofilter.length; i++) {
    if (countrydropdown.value === tabletofilter[i].getAttribute("data-state")) {
      //if the value changed on the dropdown equals the value of the table raw, push the list into the new array. I push everything not just the data-state value, so later the other function can also fin the party value to compare

      stateList.push(tabletofilter[i]);
    } else if (countrydropdown.value === "all") {
      stateList.push(tabletofilter[i]);
    } else {
      tabletofilter[i].style.display = "none"; // if the value are not === to value or All, then do not display them
    }
  }
  filterItems(stateList); // i call the secondary function inside the primary one to connect them
}
