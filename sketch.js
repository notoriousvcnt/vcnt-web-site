let Nx = 50;
let Ny = Nx;
let dx; let dy;
let cells = [];
let estados;
let button = [];
let flag = false;
let gen = 0;
let texto;

function setup() {
  createCanvas(windowWidth*0.8, windowHeight * 0.8);
  frameRate(30);
  
  button[0] = createButton('Play');
  button[0].position(0, height);
  button[0].mousePressed(startGoL);
  
  button[1] = createButton('Pause');
  button[1].position(0+45, height);
  button[1].mousePressed(stopGoL);
  
  button[2] = createButton('Clean');
  button[2].position(0+102, height);
  button[2].mousePressed(restartGoL);
  
  button[2] = createButton('Random Gen');
  button[2].position(0+155, height);
  button[2].mousePressed(randomStatus);
  
  texto = createSpan();
  texto.position(260,height);
  texto.html('Generation: '+str(gen));
  
  
  
  
  dx = width/Nx;
  dy = height/Ny;
  //print(estados);
  for (let i = 0; i < Nx*Ny; i++){
    //cells[i] = new Cell(dx*(i%Nx),dy*(int(i/Nx)),estados[i],dx);
    cells[i] = new Cell(dx*(i%Nx),dy*(int(i/Nx)),0,dx);
    
  
  }
 
}

function draw() {
  texto.html('Generation: '+str(gen));
  background(240);
  stroke(200);
  for (let i = 0; i < Nx; i++){
      line(dx*i,0,dx*i,height);
  }
  for (let j = 0; j < Ny; j++){
    line(0,dy*j,width,dy*j);
  
  }
  for (let n = 0; n < cells.length; n++){
    cells[n].show();
  }
  if (frameCount % 2 == 0 && flag == true){
    //print('checkeando vecinos...')
    checkNeighbors();
    gen += 1;
    
  }
}

class Cell {
  // constructor
  constructor(temp_x,temp_y,temp_status,temp_size) {
   this.x = temp_x;
   this.y = temp_y;
   this.status = temp_status;
   this.xsize = temp_size;
   this.ysize = temp_size;
 
 }

  checkArea(mouseVector){
    if ((mouseVector.x > this.x && mouseVector.x < this.x+this.xsize) && (mouseVector.y > this.y && mouseVector.y < this.y+this.ysize)) {
    this.status+=1;
  }
}
  
  //funcion show 
  show(){ 
  fill((this.status%2)*255);
  rect(this.x,this.y,this.xsize,this.ysize);
  }
  

}

function mousePressed() {
    for (let n = 0; n < cells.length; n++){
    cells[n].checkArea(createVector(mouseX,mouseY));
  }
}


function checkNeighbors(){
  // para el primer y último del array son casos especiales
  for (let n = 0; n < cells.length; n++){
    let counter = 0;
    let neighbors = [n+1,n-1,n-Nx,n+Nx,n-Nx-1,n-Nx+1,n+Nx+1,n+Nx-1];
    
    for (let i = 0;i < neighbors.length; i++){
      if(neighbors[i] >= 0 && neighbors[i] < cells.length){
        vecino = neighbors[i];
        counter+= cells[vecino].status % 2 ;
      }
    }
    
    if (cells[n].status % 2 == 0){
        // condiciones si la celula no está viva
      if (counter == 3){
        cells[n].status = 1;
      }
    } else if (cells[n].status % 2 == 1){
    //condiciones si la celula está viva
      if (counter > 3 || counter < 2){
         cells[n].status = 0; 
      }  
    }
  }
}

function decidePercent(N,percent){

  let probArray = [];
  let counter = 0;
  let num;
  let max1s = int(N*(percent/100));

  for (let i = 0; i < N; i++){
    if (counter < max1s){
      val = round(random(0,1));
      if (val == 1){
        counter += 1;
      } 
    } else {
      val = 0;
    }
    probArray[i] = val;
  }
  return probArray;
}

function startGoL(){
   flag = true; 
}

function stopGoL(){
   flag = false; 
}

function restartGoL(){
   flag = false;
   gen = 0;
   for (let i = 0; i < cells.length; i++){
       cells[i].status = 0;
   }
}

function randomStatus(){
  flag = 1;
  estados = decidePercent(Nx*Ny,20);
   for (let i = 0; i < cells.length; i++){
       cells[i].status = estados[i];
   }
  
}
