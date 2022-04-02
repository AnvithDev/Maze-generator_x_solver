
// 60 600 - Kids
// 40 600 - Easy
// 30 600 - Medium
// 20 600 - Hard
// 15 600 - Expert
// 10 600 - god


var rows,cols;
var w=30;
var grid = [];
var stack = [];
var count=0;

var current;

function setup(){
    createCanvas(600,600);
    rows= floor(height/w);
    cols= floor(width/w);
    frameRate(600);

    // Note i --> row , j --> column
    for(let i=0 ; i<rows; i++)
        for(let j=0;j<cols;j++){
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    current = grid[0];
    last_index = grid.length-1;
    last_cell = grid[last_index];
   
}

function draw(){
    background(0);
    for(let i=0 ; i<grid.length;i++){
        grid[i].show();
    }
    
    current.visited = true;
    current.highlight();

    // STEP 1
    var next = current.checkNeighbors();
    if(next){
        next.visited = true;

        // STEP 2
        stack.push(current)

        // STEP 3
        current.removeWalls(next);

        // STEP 4
        current = next;
    }else if(stack.length > 0){
        current = stack.pop() 
    }

    if(current.i==last_cell.i && current.j==last_cell.j){
        count++
    }

    if(count>0){
            var x = last_cell.j*w;
            var y = last_cell.i*w;
            noStroke();
            fill('red')
            rect(x,y,w,w)
    }
    // noLoop()
}


