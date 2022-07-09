import MaxHeap from "./solution-dp";

function test(hp : MaxHeap): boolean{
  let tests : boolean[] = [];

  //heapify
  hp.add(5);
  hp.add(4);
  hp.add(6);
  hp.heapify(0);
  tests.push([6,4,5] === hp.getArr());

  return tests.reduce((x, y) => x && y, true);
}

let heap : MaxHeap = new MaxHeap(10);
if(test(heap)){
  console.log("All tests pass.");
}else{ console.log("Not all tests pass."); }

  // public add(x : number): boolean{ //returns if the add was successful 
  //   if(this.items + 1 > this.arr.length) { return false; }
  //   if(this.items == 0){ this.arr[0] = x; this.items++; }
  //   else{
  //     let current : number = 0;

  //     while(this.hasBothChildren(current)){
  //       if(this.arr[current] <= x){ //put it on the right
  //         current = this.childrenOf(current).right;
  //       }else{ current = this.childrenOf(current).left; } //put it on the left
  //     }

  //     let oneOrLessChildren : {left: number, right: number} = this.childrenOf(current);
  //     if(this.arr[current] <= x){ //put it on the right
  //       if(this.arr[oneOrLessChildren.right] === undefined){
  //         this.arr[oneOrLessChildren.right] = x;
  //       }else{
  //         if(this.arr[oneOrLessChildren.right] <= x){
  //           this.arr[this.childrenOf(oneOrLessChildren.right).right] = x;
  //         }else{
  //           this.arr[this.childrenOf(oneOrLessChildren.right).left] = x;
  //         }
  //       }
  //     }else{  //put it on the left 
  //       if(this.arr[oneOrLessChildren.left] === undefined){
  //         this.arr[oneOrLessChildren.left] = x;
  //       }else{
  //         if(this.arr[oneOrLessChildren.left] <= x){
  //           this.arr[this.childrenOf(oneOrLessChildren.right).right] = x;
  //         }else{
  //           this.arr[this.childrenOf(oneOrLessChildren.right).left] = x;
  //         }
  //       }
  //     }
  //   }

  //   this.items++;
  //   return true;
  // }
