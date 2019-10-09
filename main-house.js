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

    row.append(name, party, state, years, votes);
    tbody.append(row);
  }
}

generateTable(members);
