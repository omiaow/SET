import { state, generateGameTable, createDeck, getCadsFromDeck, generateCardStyle, renderCards, checkSet } from './properties.js';
import { peopleState, generatePeople, renderTable } from './people.js';
import { settings_state, show_multiplayer_score, show_advanced_score, show_starter_score } from './settings.js';

let players_number = document.querySelector("#players");

players_number.addEventListener("change", function(){
  if(this.value != undefined && this.value != null && this.value != "" && (this.value <= 10 && this.value > 0)){
    document.querySelector('#input_names').innerHTML = "";
    for(let i=1; i<=this.value; i++){
      const div = document.createElement("div");
      div.setAttribute('class', 'options');
      const label = document.createElement("label");
      label.innerHTML = "Player-" + i + ": ";
      const input = document.createElement("input");
      input.setAttribute('id', "Player-" + i);
      input.setAttribute('value', "Player-" + i);
      input.setAttribute('type', "text");
      div.appendChild(label);
      div.appendChild(input);
      document.querySelector('#input_names').appendChild(div);
    }
  }else{
    alert("please change the number of players (0 < PLAYERS <= 10)");
  }
});

document.querySelector("#start").addEventListener("click", startHandle);
document.querySelector("#start_button_settings").addEventListener("click", startHandle);
document.querySelector("#settings_button_menu").addEventListener("click", display_settings_and_reset);
document.querySelector("#menu_button_settings").addEventListener("click", display_menu_and_reset);

function startHandle(){
  document.querySelector('#message').innerHTML = "Message!";
  let difficulty = document.querySelector("#difficulty").value;
  let players = document.querySelector("#players").value;
  let game_mode = document.querySelector("#game_mode").value;
  if(players > 10 || players < 1){
    alert("Please change the number of people!");
  }else{
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#settings_page").style.display = "none";
    document.querySelector("#game_page").style.display = "block";


    document.querySelector("#hint_exist").addEventListener('click', function(){
      if(!state.over && peopleState.selected != undefined && document.querySelector("#game_mode").value != "competitive"){
        if(checkSet(state.cards)){
          document.querySelector("#message").innerHTML = "Yes, there is at least one set!";
        }else{
          document.querySelector("#message").innerHTML = "No, there is no set!";
        }
      }
    });

    document.querySelector("#hint_show").addEventListener('click', function(){
      if(!state.over && peopleState.selected != undefined && document.querySelector("#game_mode").value != "competitive"){
        try{
          checkSet(state.cards, true);
        }catch(e){ /* Ignore */ }
      }
    });

    document.querySelector("#hint_get").addEventListener('click', function(){
      if(!state.over && peopleState.selected != undefined && ((peopleState.cycle >= peopleState.players.length && state.deck.length > 0) || !checkSet(state.cards))){
        peopleState.cycle = 0;

        for(let i=1; i<=3; i++){
          state.cards.push({
            id: "extra"+(state.cards.length-12+1),
            data: undefined
          });
        }

        for(let i=0; i<state.cards.length; i++){
          if(state.cards[i].data === undefined && state.deck.length > 0){
            state.cards[i].data = state.deck[0];
            state.deck.splice(0, 1);
          }
        }

        generateGameTable();
        renderCards();

      }else if(!state.over && peopleState.cycle < peopleState.players.length){
        document.querySelector('#message').innerHTML = "You can not use until all players loose!";
      }else if(!state.over && state.deck.length == 0){
        document.querySelector('#message').innerHTML = "The deck is empty!";
      }
    });


    // generate people
    generatePeople(players);

    //generating game table
    generateGameTable();

    // show 12 card places
    createDeck(difficulty);

    // display cards
    getCadsFromDeck();

    if(players == 1){
      peopleState.selected = 0;
      peopleState.time = 1;
      startSinglePlayerGame(players);
    }else{
      startMultiPlayerGame(players);
    }


  }
}

function startSinglePlayerGame(players){

  renderTable();
  renderCards();

  let time = setInterval(function(){
    if(state.over){
      clearInterval(time);
      if(document.querySelector("#difficulty").value == "starter"){
        // condition checks if score is better than previous
        if(settings_state.starter_score.length > 0 && settings_state.starter_score[settings_state.starter_score.length-1].points > peopleState.players[0].points){
          if(settings_state.starter_score.length <= 10){
            settings_state.starter_score.push({name: peopleState.players[0].name, time: peopleState.time, points: peopleState.players[0].points});
          }else{
            settings_state.starter_score.shift();
            settings_state.starter_score.push({name: peopleState.players[0].name, time: peopleState.time, points: peopleState.players[0].points});
          }
        }else if(settings_state.starter_score.length == 0){
          settings_state.starter_score.push({name: peopleState.players[0].name, time: peopleState.time, points: peopleState.players[0].points});
        }
      }else{
        // condition checks if score is better than previous
        if(settings_state.advanced_score.length > 0 && settings_state.advanced_score[settings_state.advanced_score.length-1].points > peopleState.players[0].points){
          if(settings_state.advanced_score.length <= 10){
            settings_state.advanced_score.push({name: peopleState.players[0].name, time: peopleState.time, points: peopleState.players[0].points});
          }else{
            settings_state.advanced_score.shift();
            settings_state.advanced_score.push({name: peopleState.players[0].name, time: peopleState.time, points: peopleState.players[0].points});
          }
        }else if(settings_state.advanced_score.length == 0){
          settings_state.advanced_score.push({name: peopleState.players[0].name, time: peopleState.time, points: peopleState.players[0].points});
        }
      }
    }else{
      document.querySelector('#timer').innerHTML = peopleState.time;
      peopleState.time += 1;
    }
  }, 1000);

  document.querySelector("#menu_button").addEventListener('click', function(){
      clearInterval(time);
      display_menu_and_reset();
  });

  document.querySelector("#settings_button").addEventListener("click", function(){
      clearInterval(time);
      display_settings_and_reset();
  });
}

function startMultiPlayerGame(players){

  renderTable();
  renderCards();

  let time = setInterval(function(){
    if(state.over){
      clearInterval(time);
      let total = 0;
      for(let i=0; i<peopleState.players.length; i++){
        total += peopleState.players[i].points;
      }
      if(settings_state.multiplayer_score.length <= 10){
        settings_state.multiplayer_score.push(total);
      }else{
        settings_state.multiplayer_score.shift();
        settings_state.multiplayer_score.push(total);
      }
    }else{
      if(peopleState.selected != undefined){
        document.querySelector('#timer').innerHTML = peopleState.time;
        peopleState.time -= 1;

        if(peopleState.time < 0){
          peopleState.previous.push(peopleState.selected);
          if(peopleState.previous.length == peopleState.players.length){
            peopleState.previous.shift();
          }
          peopleState.cycle += 1;
          peopleState.selected = undefined;
        }
      }
    }
  }, 1000);

  document.querySelector("#menu_button").addEventListener('click', function(){
      clearInterval(time);
      display_menu_and_reset();
  });

  document.querySelector("#settings_button").addEventListener("click", function(){
      clearInterval(time);
      display_settings_and_reset();
  });
}

function display_menu_and_reset(){
  document.querySelector("#game_page").style.display = "none";
  document.querySelector("#settings_page").style.display = "none";
  document.querySelector("#menu").style.display = "block";
  document.querySelector("#timer").innerHTML = "0";

  reset();
}

function display_settings_and_reset(){
  document.querySelector("#game_page").style.display = "none";
  document.querySelector("#settings_page").style.display = "block";
  document.querySelector("#menu").style.display = "none";
  document.querySelector("#timer").innerHTML = "0";

  document.querySelector("#starter_scores_button").addEventListener('click', show_starter_score);
  document.querySelector("#advanced_scores_button").addEventListener('click', show_advanced_score);
  document.querySelector("#multiplayer_scores_button").addEventListener('click', show_multiplayer_score);

  reset();
}

function reset(){
  peopleState.players = [];
  peopleState.selected = undefined;
  peopleState.time = undefined;
  peopleState.previous = [];

  state.cards = [{id: 'card1', data: undefined}, {id: 'card2', data: undefined}, {id: 'card3', data: undefined}, {id: 'card4', data: undefined}, {id: 'card5', data: undefined}, {id: 'card6', data: undefined}, {id: 'card7', data: undefined}, {id: 'card8', data: undefined}, {id: 'card9', data: undefined}, {id: 'card10', data: undefined}, {id: 'card11', data: undefined}, {id: 'card12', data: undefined}];
  state.set = [];
  state.deck = [];
  state.over = false;
}











// e
