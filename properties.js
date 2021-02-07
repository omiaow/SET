import { peopleState, renderTable } from './people.js';

export const state = {
  cards: [{id: 'card1', data: undefined}, {id: 'card2', data: undefined}, {id: 'card3', data: undefined}, {id: 'card4', data: undefined}, {id: 'card5', data: undefined}, {id: 'card6', data: undefined}, {id: 'card7', data: undefined}, {id: 'card8', data: undefined}, {id: 'card9', data: undefined}, {id: 'card10', data: undefined}, {id: 'card11', data: undefined}, {id: 'card12', data: undefined}],
  set: [],
  deck: [],
  over: false
}

export function generateGameTable(){
  document.querySelector("#card_area").style.width = (170*(state.cards.length/3))+"px";
  document.querySelector("#card_area").innerHTML = '';
  state.cards.forEach((i) => {
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', i.id);
    canvas.setAttribute('width', '160');
    canvas.setAttribute('height', '200');
    canvas.style.backgroundColor = "white";

    canvas.addEventListener('click', function(){
      if(peopleState.selected != undefined){

        let selected = state.cards.find(el => el.id == i.id);

        if(this.style.backgroundColor != "grey"){
          this.style.backgroundColor = "grey";
          if(state.set.length < 2){
            state.set.push(selected);
          }else{

            document.querySelector('#message').innerHTML = "Message!";

            state.set.push(selected);
            if(checkSet(state.set)){

              peopleState.players[peopleState.selected].points++;
              if(peopleState.players.length > 1){
                peopleState.time = 10;
                document.querySelector('#timer').innerHTML = peopleState.time;
              }

              state.set.forEach((k) => {
                state.cards.forEach((j) => {
                  if(k.id == j.id){
                    j.data = undefined;
                  }
                });
              });
              state.set = [];
              getCadsFromDeck();
              generateGameTable();
              renderCards();
              renderTable();

              // check if game over
              if(!checkSet(state.cards)){
                let total_cards = [];
                for(let i=0; i<state.cards.length; i++){
                  total_cards.push(state.cards[i]);
                }
                for(let i=0; i<state.deck.length; i++){
                  total_cards.push({data: state.deck[i]});
                }
                if(!checkSet(total_cards)){
                  state.over = true;
                  document.querySelector("#message").innerHTML = "Game Over!";
                }
              }



            }else{

              // subtract point but didn't specified if point 0
              peopleState.players[peopleState.selected].points -= 1;

              peopleState.cycle += 1;

              if(peopleState.players.length > 1){
                peopleState.previous.push(peopleState.selected);
                if(peopleState.previous.length == peopleState.players.length){
                  peopleState.previous.shift();
                }
                peopleState.selected = undefined;
              }

              state.set = [];
              generateGameTable();
              renderCards();
              renderTable();

            }
          }
        }else{
          this.style.backgroundColor = "white"
          state.set.splice(state.set.findIndex(el => el.id == i.id), 1);
        }

      }
    });

    document.getElementById('card_area').appendChild(canvas);

  });
}

export function createDeck(difficulty){

  let properties = {
    colors: ["red", "purple", "green"],
    shapes: ["oval", "squiggle", "diamond"],
    numbers: [1, 2, 3],
    shadings: ["solid", "striped", "outlined"]
  }

  if(difficulty === "starter"){
    properties.colors.forEach((color) => {
      properties.shapes.forEach((shape) => {
        properties.numbers.forEach((number) => {
          state.deck.push({
            color: color,
            shape: shape,
            number: number
          });
        });
      });
    });
  }else if(difficulty === "advanced"){
    properties.colors.forEach((color) => {
      properties.shapes.forEach((shape) => {
        properties.numbers.forEach((number) => {
          properties.shadings.forEach((shading) => {
            state.deck.push({
              color: color,
              shape: shape,
              number: number,
              shading: shading
            });
          });
        });
      });
    });
  }else{
    alert("error, can't choose difficulty!");
  }

  //shuffle
  state.deck.sort(() => Math.random() - 0.5);

  console.log(state.deck);

}

export function getCadsFromDeck(){
  if(state.cards.length <= 12){
    for(let i=0; i<state.cards.length; i++){
      if(state.cards[i].data === undefined && state.deck.length > 0){
        state.cards[i].data = state.deck[0];
        state.deck.splice(0, 1);
      }
    }
  }else{
    for(let i=0; i<state.cards.length; i++){
      if(state.cards[i].data === undefined){
        state.cards.splice(i, 1);
        i--;
      }
    }

    let new_cards = [];
    for(let i=1; i<=12; i++){
      new_cards.push({
        id: "card"+i,
        data: state.cards[0].data
      });
      state.cards.shift();
    }

    for(let i=0; i<state.cards.length; i++){
      new_cards.push({
        id: "extra"+(i+1),
        data: state.cards[i].data
      });
    }

    state.cards = new_cards;
  }
}

export function generateCardStyle(id, data){

  let canvas = document.getElementById(id);
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = data.color;

  function create_diamond(x, y){
    ctx.moveTo(x+5, y+30);
    ctx.lineTo(x+60, y+5);
    ctx.lineTo(x+115, y+30);
    ctx.lineTo(x+60, y+55);
    ctx.lineTo(x+5, y+30);
  }

  function create_oval(x, y){
    ctx.moveTo(x + 30, y + 5);
    ctx.lineTo(x + 90, y + 5);
    ctx.arc(x + 90, y + 30, 25, ((3*Math.PI)/2), (Math.PI/2));
    ctx.lineTo(x + 30, y + 55);
    ctx.arc(x + 30, y + 30, 25, (Math.PI/2), ((3*Math.PI)/2));
  }

  function create_squiggle(x, y){
    ctx.moveTo(x + (20-(Math.sqrt(225/2))), y + 20);

    ctx.bezierCurveTo(x + (20-(Math.sqrt(225/2))) + 20, y,
                       x + (20-(Math.sqrt(225/2))) + 60, y + 35,
                       x + (20-(Math.sqrt(225/2))) + 80, y + 20);

    ctx.arc(x + 100, y + ((Math.sqrt(225/2))+20), 15, ((5*Math.PI)/4), (Math.PI/4));

    ctx.bezierCurveTo(x + (20+(Math.sqrt(225/2))) + 60, y + (2*(Math.sqrt(225/2))+10) + 30,
                       x + (20+(Math.sqrt(225/2))) + 20, y + (2*(Math.sqrt(225/2))+10) - 5,
                       x + (20+(Math.sqrt(225/2))), y + (2*(Math.sqrt(225/2))+20));

    ctx.arc(x + 20, y + ((Math.sqrt(225/2))+20), 15, (Math.PI/4), ((5*Math.PI)/4));
  }

  //define shapes and numbers
  if(data.number == 1){
    if(data.shape == "diamond"){
      create_diamond(20, 70);
    }else if(data.shape == "oval"){
      create_oval(20, 70);
    }else if(data.shape == "squiggle"){
      create_squiggle(20, 70);
    }
  }else if(data.number == 2){
    if(data.shape == "diamond"){
      create_diamond(20, 40);
      create_diamond(20, 100);
    }else if(data.shape == "oval"){
      create_oval(20, 40);
      create_oval(20, 100);
    }else if(data.shape == "squiggle"){
      create_squiggle(20, 40);
      create_squiggle(20, 100);
    }
  }else if(data.number == 3){
    if(data.shape == "diamond"){
      create_diamond(20, 10);
      create_diamond(20, 70);
      create_diamond(20, 130);
    }else if(data.shape == "oval"){
      create_oval(20, 10);
      create_oval(20, 70);
      create_oval(20, 130);
    }else if(data.shape == "squiggle"){
      create_squiggle(20, 10);
      create_squiggle(20, 70);
      create_squiggle(20, 130);
    }
  }

  //define shadings
  if(data.shading == undefined || data.shading == "solid"){
    ctx.fillStyle = data.color;
    ctx.fill();
  }else if(data.shading == "striped"){
    ctx.clip();
    let k=0;
    while(k<canvas.offsetWidth){
      ctx.moveTo(k, 0);
      ctx.lineTo(k, 200);
      k+=10;
    }
  }

  ctx.stroke();

}

export function renderCards(){
  state.cards.forEach(el => {
    if(el.data != undefined){
      generateCardStyle(el.id, el.data);
    }else{
      try{
        const listItem = document.getElementById(el.id);
        const newItem = document.createElement('div');
        listItem.parentNode.replaceChild(newItem, listItem);
      }catch(e){ /* Ignore */ }
    }
  });
}

export function checkSet(list, show){

  function checkIfExist(a, b, c){
    if( ((a.color == b.color && b.color == c.color) || (a.color != b.color && a.color != c.color && b.color != c.color)) &&
        ((a.shape == b.shape && b.shape == c.shape) || (a.shape != b.shape && a.shape != c.shape && b.shape != c.shape)) &&
        ((a.number == b.number && b.number == c.number) || (a.number != b.number && a.number != c.number && b.number != c.number)) &&
        ((a.shading == undefined && b.shading == undefined && c.shading == undefined) || (a.shading == b.shading && b.shading == c.shading) || (a.shading != b.shading && a.shading != c.shading && b.shading != c.shading)) ){
          return true;
    }else{
      return false;
    }
  }

  for(let i=0; i<list.length-2; i++){
    for(let j=i+1; j<list.length-1; j++){
      for(let k=j+1; k<list.length; k++){
        if(show != undefined && show == true && (list[i].data != undefined && list[j].data != undefined && list[k].data != undefined && checkIfExist(list[i].data, list[j].data, list[k].data))){
            document.querySelector('#'+list[i].id).style.backgroundColor = "#FFAEAE";
            document.querySelector('#'+list[j].id).style.backgroundColor = "#FFAEAE";
            document.querySelector('#'+list[k].id).style.backgroundColor = "#FFAEAE";
          return true;
        }else if(list[i].data != undefined && list[j].data != undefined && list[k].data != undefined && checkIfExist(list[i].data, list[j].data, list[k].data)){
          return true;
        }
      }
    }
  }

  return false;

}









// e
