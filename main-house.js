let members = data.results[0].members;

function generateTable(membersArray) {
  var tbody = document.getElementById("house-data");

  for (var i = 0; i < membersArray.length; i++) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let party = document.createElement("td");
    let state = document.createElement("td");
    let years = document.createElement("td");
    let votes = document.createElement("td");

    name.innerHTML = `<a href= "${membersArray[i].url}" target= "_blank"> ${
      membersArray[i].last_name
    }, ${membersArray[i].first_name} ${membersArray[i].middle_name || " "}</a>`;
    // || if there is no middle name display empty
    party.innerHTML = membersArray[i].party;
    state.innerHTML = membersArray[i].state;
    years.innerHTML = membersArray[i].seniority;
    votes.innerHTML = membersArray[i].votes_with_party_pct + "%";
    row.setAttribute("data-party", membersArray[i].party);
    row.append(name, party, state, years, votes);
    tbody.append(row);
  }
}

generateTable(members);

// checkboxes to filter per party

var itemsToFilter = document.querySelectorAll("[data-party]"); //  I get all of our list items
var checkBoxes = document.querySelectorAll("input.party-checkbox"); //setup click event handlers on checkboxes

let checkboxDemocrat = document.getElementById("Democrats");
let checkboxRepublicans = document.getElementById("Republicans");
let checkboxIndependents = document.getElementById("Independents");

checkboxRepublicans.addEventListener("click", filterItems);
checkboxDemocrat.addEventListener("click", filterItems);
checkboxIndependents.addEventListener("click", filterItems);

function filterItems() {
  for (var i = 0; i < itemsToFilter.length; i++) {
    if (
      !checkboxRepublicans.checked &&
      itemsToFilter[i].getAttribute("data-party") == "R"
    ) {
      itemsToFilter[i].style.display = "none";
    } else if (
      checkboxRepublicans.checked &&
      itemsToFilter[i].getAttribute("data-party") == "R"
    ) {
      itemsToFilter[i].style.display = "table-row";
    } else if (
      !checkboxDemocrat.checked &&
      itemsToFilter[i].getAttribute("data-party") == "D"
    ) {
      itemsToFilter[i].style.display = "none";
    } else if (
      checkboxDemocrat.checked &&
      itemsToFilter[i].getAttribute("data-party") == "D"
    ) {
      itemsToFilter[i].style.display = "table-row";
    } else if (
      !checkboxIndependents.checked &&
      itemsToFilter[i].getAttribute("data-party") == "I"
    ) {
      itemsToFilter[i].style.display = "none";
    } else if (
      checkboxIndependents.checked &&
      itemsToFilter[i].getAttribute("data-party") == "I"
    ) {
      itemsToFilter[i].style.display = "table-row";
    }
  }
}
