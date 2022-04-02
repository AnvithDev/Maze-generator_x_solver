

class Cell{
    constructor(i,j){
        this.i=i;
        this.j=j;
        this.walls = [true,true,true,true]  // top,right,bottom,left
        this.visited = false;
    }

    highlight(){
        var x = this.j*w;
        var y = this.i*w;
        noStroke();
        fill(0,255,0)
        rect(x,y,w,w)
    }

    index(i,j){
        if(i<0 || j<0 || i > rows -1 || j> cols-1){
            return -1;
        }
        return i*cols + j;
    }

    checkNeighbors(){
        var neighbors = [];
        var i = this.i;
        var j = this.j;

        var top = grid[this.index(i-1,j)]

        var right = grid[this.index(i,j+1)]
       
        var bottom = grid[this.index(i+1,j)]
        
        var left = grid[this.index(i,j-1)]
     
        // Doesn't work for some reason
        // switch(true){
        //    case (top && !top.visited) : neighbors.push(top);
        //    case (right && !right.visited) : neighbors.push(right);
        //    case (bottom && !bottom.visited ): neighbors.push(bottom);
        //    case (left && !left.visited) : neighbors.push(left);
        // }

        if(top && !top.visited) {neighbors.push(top)}
        if(right && !right.visited) {neighbors.push(right)}
        if(bottom && !bottom.visited) {neighbors.push(bottom)}
        if(left && !left.visited) {neighbors.push(left)}

        if( neighbors.length > 0 ){
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        }else{
            return undefined;
        }
        
    }

    removeWalls(next){
        
        // remove current's left wall and next's right wall if diff is 1 and vice versa if diff is -1
        let X_diff = next.j - this.j;
        if(X_diff === 1){
            this.walls[1] = false;
            next.walls[3] = false;
        }else if(X_diff === -1){
            this.walls[3] = false;
            next.walls[1] = false;
        }

        // remove current's bottom wall and next's top wall if diff is 1 and vice versa if diff is -1
        let Y_diff = next.i - this.i;
        if(Y_diff === 1){
            this.walls[2] = false;
            next.walls[0] = false;
        }else if(Y_diff === -1){
            this.walls[0] = false;
            next.walls[2] = false;
        }
    }

    show(){
        var x = this.j*w;
        var y = this.i*w;
        stroke(255);

        // For some reason this doesn't work as well
        // switch(true){
        //     case this.walls[0] : line(x,y,x+w,y) ;  

        //     case this.walls[1] : line(x+w,y,x+w,y+w)  

        //     case this.walls[2] : line(x+w,y+w,x,y+w)  

        //     case this.walls[3] : line(x,y+w,x,y)      
        // }

        if(this.walls[0]){line(x,y,x+w,y)}   // left to right i.e top part
        if(this.walls[1]){line(x+w,y,x+w,y+w) }  // top to bottom i.e right part
        if(this.walls[2]){line(x+w,y+w,x,y+w) }   // right to left i.e bottom part
        if(this.walls[3]){line(x,y+w,x,y) }   // bottom to top i.e left part
        
        if(this.visited){
            noStroke();
            fill(255,0,255,50);
            rect(x,y,w,w);
        }
    }
}