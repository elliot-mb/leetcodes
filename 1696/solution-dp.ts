function maxResult(nums: number[], k: number): number {
  // optimal way to reach i within k of current position 
  let dpQueue : number[] = [nums[0]];

  for(let i : number = 1; i < nums.length; i++){
    if(dpQueue.length > k) { dpQueue.splice(0, 1); }
    let best : number = -Infinity;
    for(let j : number = 0; j < dpQueue.length; j++){
      best = best < dpQueue[j] ? dpQueue[j] : best; 
    }
    dpQueue.push(best + nums[i]);
  }

  return dpQueue[dpQueue.length - 1];
};

export default class MaxHeap {
  arr : number[]; //tree interpretation of an array (max heap)
  items : number;
  capacity : number;

  constructor(_capacity){ //must start empty 
    this.arr = [];
    this.items = 0;
    this.capacity = _capacity;
  }

  private childrenOf(i : number): {left: number, right: number}{
    return {left: (2 * (i + 1)) - 1, right: (2 * (i + 1))};
  }

  private hasBothChildren(i : number): boolean{
    return (this.arr[this.childrenOf(i).left] !== undefined) && (this.arr[this.childrenOf(i).right] !== undefined);
  }

  private hasNoChildren(i : number): boolean{
    return (this.arr[this.childrenOf(i).left] === undefined) && (this.arr[this.childrenOf(i).right] === undefined);
  }

  private parentOf(i : number): number{
    return Math.floor((i + 1) / 2) - 1;
  }

  public add(x : number): boolean{
    if(this.items + 1 > this.capacity) { return false; }
    this.arr.push(x);
    return true;
  }

  private swap(a : number, b : number): void{
    //swap our two values
    this.arr[a] += this.arr[b];
    this.arr[b] = this.arr[a] - this.arr[b];
    this.arr[a] -= this.arr[b];
  }

  public heapify(i : number): void{
    this.show();
    let left : number = this.childrenOf(i).left;
    let right : number = this.childrenOf(i).right;
    if(this.hasNoChildren(i)){ return; } //no children
    if(!this.hasBothChildren(i)){ //exactly one child
      if(this.arr[left] !== undefined && this.arr[left] > this.arr[i]){ //left larger
        this.swap(i, left);
        this.heapify(left);
      }else if(this.arr[right] !== undefined && this.arr[right] > this.arr[i]){ //right larger
        this.swap(i, right);
        this.heapify(right);
      }else{ return; } //both children smaller
    }
    let maxChild : number = this.arr[left] >= this.arr[right] ? left : right;
    if(this.arr[maxChild] > this.arr[i]){ // is largest child larger than parent? 
      this.swap(i, maxChild);
      this.heapify(maxChild);
    }
    return;
  }

  public buildHeap(): void{
    
  }

  public getArr(): number[]{
    return this.arr;
  }

  public show() : void{
    console.log(`MaxHeap: ${this.arr}`);
  }
}

let hp : MaxHeap = new MaxHeap(17);
// pq.add(5);
// pq.show();
// pq.add(10);
// pq.show();
// pq.add(11);
// pq.show();
// pq.add(9);
// pq.show();
// pq.add(3);
// pq.add(2);
// pq.add(4);
// pq.show();
hp.add(5);
hp.add(4);
hp.add(6);
hp.add(2);
hp.add(5);
hp.add(3);
hp.add(1);
hp.show();
hp.heapify(0);
//hp.show();
//console.log(maxResult([0,-1,-2,-3,1], 2));