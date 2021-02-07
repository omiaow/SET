export const settings_state = {
  starter_score: [],
  advanced_score: [],
  multiplayer_score: []
}

export function show_starter_score(){

  if(document.querySelector('#starter_scores').innerHTML != undefined && document.querySelector('#starter_scores').innerHTML != null && document.querySelector('#starter_scores').innerHTML == ""){
    document.querySelector('#advanced_scores').innerHTML = "";
    document.querySelector('#multiplayer_scores').innerHTML = "";
    if(settings_state.starter_score.length > 0){
      const table_header_row = document.createElement('tr');
      const table_header_name = document.createElement('th');
      table_header_name.innerHTML = "name";
      const table_header_points = document.createElement('th');
      table_header_points.innerHTML = "points";
      const table_header_time = document.createElement('th');
      table_header_time.innerHTML = "time";
      table_header_row.appendChild(table_header_name);
      table_header_row.appendChild(table_header_points);
      table_header_row.appendChild(table_header_time);
      document.querySelector('#starter_scores').appendChild(table_header_row);

      for(let i=0; i<settings_state.starter_score.length; i++){
        const row = document.createElement('tr');
        const name = document.createElement('td');
        name.innerHTML = settings_state.starter_score[i].name;
        const points = document.createElement('td');
        points.innerHTML = settings_state.starter_score[i].points;
        const time = document.createElement('td');
        time.innerHTML = settings_state.starter_score[i].time;
        row.appendChild(name);
        row.appendChild(points);
        row.appendChild(time);
        document.querySelector('#starter_scores').appendChild(row);
      }
    }
  }else{
    document.querySelector('#starter_scores').innerHTML = "";
  }
}

export function show_advanced_score(){

  if(document.querySelector('#advanced_scores').innerHTML != undefined && document.querySelector('#advanced_scores').innerHTML != null && document.querySelector('#advanced_scores').innerHTML == ""){
    document.querySelector('#starter_scores').innerHTML = "";
    document.querySelector('#multiplayer_scores').innerHTML = "";
    if(settings_state.advanced_score.length > 0){
      const table_header_row = document.createElement('tr');
      const table_header_name = document.createElement('th');
      table_header_name.innerHTML = "name";
      const table_header_points = document.createElement('th');
      table_header_points.innerHTML = "points";
      const table_header_time = document.createElement('th');
      table_header_time.innerHTML = "time";
      table_header_row.appendChild(table_header_name);
      table_header_row.appendChild(table_header_points);
      table_header_row.appendChild(table_header_time);
      document.querySelector('#advanced_scores').appendChild(table_header_row);

      for(let i=0; i<settings_state.advanced_score.length; i++){
        const row = document.createElement('tr');
        const name = document.createElement('td');
        name.innerHTML = settings_state.advanced_score[i].name;
        const points = document.createElement('td');
        points.innerHTML = settings_state.advanced_score[i].points;
        const time = document.createElement('td');
        time.innerHTML = settings_state.advanced_score[i].time;
        row.appendChild(name);
        row.appendChild(points);
        row.appendChild(time);
        document.querySelector('#advanced_scores').appendChild(row);
      }
    }
  }else{
    document.querySelector('#advanced_scores').innerHTML = "";
  }
}

export function show_multiplayer_score(){

  if(document.querySelector('#multiplayer_scores').innerHTML != undefined && document.querySelector('#multiplayer_scores').innerHTML != null && document.querySelector('#multiplayer_scores').innerHTML == ""){
    document.querySelector('#starter_scores').innerHTML = "";
    document.querySelector('#advanced_scores').innerHTML = "";
    if(settings_state.multiplayer_score.length > 0){
      const table_header_row = document.createElement('tr');
      const table_header_game = document.createElement('th');
      table_header_game.innerHTML = "game";
      const table_header_points = document.createElement('th');
      table_header_points.innerHTML = "total points";
      table_header_row.appendChild(table_header_game);
      table_header_row.appendChild(table_header_points);
      document.querySelector('#multiplayer_scores').appendChild(table_header_row);

      for(let i=0; i<settings_state.multiplayer_score.length; i++){
        const row = document.createElement('tr');
        const game = document.createElement('td');
        game.innerHTML = i+1;
        const points = document.createElement('td');
        points.innerHTML = settings_state.multiplayer_score[i];
        row.appendChild(game);
        row.appendChild(points);
        document.querySelector('#multiplayer_scores').appendChild(row);
      }
    }
  }else{
    document.querySelector('#multiplayer_scores').innerHTML = "";
  }
}
