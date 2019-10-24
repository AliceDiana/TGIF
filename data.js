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
    membersArray = data.results[0].members; // I give the directions on how to access the specific member array
    init(); // I call the init, which basically is linked the init function
  })
  .catch(error => {
    // i collect here the errors
    console.log(error);
  });

function init() {
  // I am calling here all the function I need
  loaderHide();
  generateTable(membersArray);
  dropdownfilter(membersArray);
  changecountry();
}

function loaderShow() {
  document.querySelector("main").style.display = "none"; //I select my main content, and I want to hide it while the loader is on
  document.getElementById("spinner"); // I want the loader to appear
}

function loaderHide() {
  document.querySelector("main").style.display = "block"; // as the data have been loaded, I want to loader to disappear
  document.getElementById("spinner").style.display = "none"; // and I want the main content to show
}

function generateTable(membersArray) {
  var tbody = document.getElementById("data"); // I want to build my table inside the html with id=name

  for (var i = 0; i < membersArray.length; i++) {
    // create the row and cells for the whole length of my membersarray
    let row = document.createElement("tr"); // create one row
    let name = document.createElement("td"); //create 5 cells
    let party = document.createElement("td");
    let state = document.createElement("td");
    let years = document.createElement("td");
    let votes = document.createElement("td");

    name.innerHTML = `<a href= "${membersArray[i].url}" target= "_blank"> ${
      membersArray[i].last_name
    }, ${membersArray[i].first_name} ${membersArray[i].middle_name || " "}</a>`;
    // I use ${} to link the respective url to the members
    //  ||  means that if there is no middle name display empty
    party.innerHTML = membersArray[i].party; // populate this cell with the values party
    state.innerHTML = membersArray[i].state;
    years.innerHTML = membersArray[i].seniority;
    votes.innerHTML = membersArray[i].votes_with_party_pct + "%";
    row.setAttribute("data-party", membersArray[i].party); // I assign the party value an attribute "data-party"
    row.setAttribute("data-state", membersArray[i].state); // I assign the state value an attribute "data-state"
    row.append(name, party, state, years, votes);
    tbody.append(row);
  }
}

function filterItems(itemsToFilter) {
  // the function filterItems is my secondary function, and aims at budiling and using the checkboxes for the party filter

  // let checkBoxes = document.querySelectorAll("input.party-checkbox");
  let checkboxDemocrat = document.getElementById("Democrats"); //  create some variables to know at which part (ids) of my HTML i am referring to
  let checkboxRepublicans = document.getElementById("Republicans");
  let checkboxIndependents = document.getElementById("Independents");

  checkboxRepublicans.addEventListener("click", changecountry); // I add the event click to my checkbox and with "changecountry" I link the checkboxes to my primary function for countrylist
  checkboxDemocrat.addEventListener("click", changecountry); //  (it is like a chain, I have to link the filters only to the primary function)
  checkboxIndependents.addEventListener("click", changecountry);

  for (var i = 0; i < itemsToFilter.length; i++) {
    itemsToFilter[i].style.display = "none"; // I do not want to have the row exposed, at first everything is blanked
    // then, when a checkbox is checked,
    if (
      checkboxRepublicans.checked && // if my checkboxRepublicans is checked, and the data-party attribute is equal to R
      itemsToFilter[i].getAttribute("data-party") == "R"
    ) {
      itemsToFilter[i].style.display = "table-row"; //display the respective results in the table
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
  let countryList = []; // I create  a new array to be populated with loop results

  for (let i = 0; i < members.length; i++) {
    //for the whole list of members
    countryList.push(members[i].state); //push into the countrylist array, the state value
  }

  let uniqueCountryArray = [...new Set(countryList)].sort(); // I have an Array with the whole list of states, but I only want the unique states without duplicates
  // With new Set I get the unique values. However if I use Set I have to transform the array into a readable by JavaScript.
  // Therefore I use [...] to create a new array and the dots to copy the content

  let select = document.getElementById("countrydropdown"); // I define where in my html i want to insert my list (id countrydropdown)

  for (i = 0; i < uniqueCountryArray.length; i++) {
    // I build my dropdown in HTMl. For the whole length of my state array, I want to create rows in my dropdown list
    let option = document.createElement("option");

    option.setAttribute("value", uniqueCountryArray[i]); // I want to set an attribute  "value" to my options and name the value with the state
    option.innerHTML = uniqueCountryArray[i]; // I want to write in options the states

    select.appendChild(option); // I assemble together my options with the select
  }
}

function changecountry() {
  // connect the dropdown list with the table to filter by country
  let filterdropdown = document.getElementById("countrydropdown"); //define which is the dropdown list
  let tabletofilter = document.querySelectorAll("[data-state]"); //define which is the table i want to filter by the data-state attribute that i have defined above
  filterdropdown.addEventListener("change", changecountry); // add change event to  the dropdown list filter

  let stateList = [];

  for (var i = 0; i < tabletofilter.length; i++) {
    if (filterdropdown.value === tabletofilter[i].getAttribute("data-state")) {
      //if the value changed on the dropdown equals the value of the table raw, push the list into the new array.

      stateList.push(tabletofilter[i]); //I push everything not just the data-state value, so later the other function can also fin the party value to compare
    } else if (countrydropdown.value === "all") {
      stateList.push(tabletofilter[i]);
    } else {
      tabletofilter[i].style.display = "none"; // if the value are not === to value or All, then do not display them
    }
  }
  filterItems(stateList); // i call the secondary function inside the primary one to connect them.
} //  (it is like a chain, I have to link the filters to the primary function, and the second function to the primary function)
