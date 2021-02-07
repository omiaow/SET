export const peopleState = {
  players: [],
  selected: undefined,
  time: undefined,
  previous: [],
  cycle: 0
}

export function generatePeople(number){
  for(let i=1; i<=number; i++){
    const given_name = document.querySelector('#Player-'+i);
    peopleState.players.push({
      name: given_name.value,
      points: 0
    });
  }
}

export function renderTable(){

  document.querySelector('#players_table').innerHTML = "";

  const table_header_row = document.createElement('tr');
  const table_header_name = document.createElement('th');
  table_header_name.innerHTML = "name";
  const table_header_points = document.createElement('th');
  table_header_points.innerHTML = "points";
  table_header_row.appendChild(table_header_name);
  table_header_row.appendChild(table_header_points);
  document.querySelector('#players_table').appendChild(table_header_row);

  for(let i=0; i<peopleState.players.length; i++){
    const row = document.createElement('tr');
    row.setAttribute('class', 'players_row');
    row.setAttribute('id', peopleState.players[i].name);
    row.addEventListener('click', function(){
      if(peopleState.selected == undefined && !peopleState.previous.includes(i)){
        peopleState.selected = i;
        peopleState.time = 10;
        document.querySelector('#timer').innerHTML = peopleState.time;
        renderTable();
      }
    });
    if(peopleState.selected == i){
      row.style.color = "red";
    }
    const name = document.createElement('td');
    name.innerHTML = peopleState.players[i].name;
    const points = document.createElement('td');
    points.innerHTML = peopleState.players[i].points;
    row.appendChild(name);
    row.appendChild(points);
    document.querySelector('#players_table').appendChild(row);
  }

}
