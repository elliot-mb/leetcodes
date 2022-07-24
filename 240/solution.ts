function lookup(ptr: {x:number, y:number}, matrix: number[][]) : number | null{
  if(ptr.x < 0 || ptr.y < 0 || ptr.x > matrix[0].length - 1 || ptr.y > matrix.length - 1) { return null; } //isn't indexed in range
  return matrix[ptr.y][ptr.x];
}

function searchMatrix(matrix: number[][], target: number): boolean {
  let dim : {x:number, y:number} = {x:matrix[0].length, y:matrix.length};
  let ptr : {x:number, y:number} = {x:dim.x - 1, y:0}; // pointers begins in the top right corner 
  let current = lookup(ptr, matrix);
  while(true){
    //console.log(ptr);
    if(current === target) break;
    let left : number | null = lookup({x:ptr.x - 1, y:ptr.y}, matrix);
    let down : number | null = lookup({x:ptr.x, y:ptr.y + 1}, matrix);
    if(left === null && down === null) { break; }
    else if(left === null) { ptr.y++; }
    else if(down === null) { ptr.x--; }
    else if(left >= target) { ptr.x--; } //check left
    else if(down > target) { ptr.x--; ptr.y++; } //left < target
    else { ptr.y++; } //left < target && down <= target
    current = lookup(ptr, matrix);
  }

  return current === target;
};
let m : number[][] = [[1,4,7,11,15]
                     ,[2,5,8,12,19]
                     ,[3,6,9,16,22]
                     ,[10,13,14,17,24]
                     ,[18,21,23,26,30]
                     ];

console.log(searchMatrix(m, 18));