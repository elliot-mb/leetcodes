function maxResult(nums: number[], k: number): number {
  // optimal way to reach i within k of current position 
  let n : number = nums.length;
  let score : number[] = new Array(n);
  let dpMaxHeap : MaxHeap = new MaxHeap(k); //dpMaxHeap.insert(nums[0]);

  for(let i : number = n - 1; i >= 0; i--){
    console.log(nums[i]);
    let best : number = dpMaxHeap.isFull() ? dpMaxHeap.extractMax() : dpMaxHeap.max();
    score[i] = nums[i] + best;
    dpMaxHeap.insert(best + nums[i]);
    dpMaxHeap.show();
  }

  return score[0];
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

  public isFull(): boolean{
    return this.items == this.capacity;
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

  private swap(a : number, b : number): void{ //O(1)
    //swap our two indices
    this.arr[a] += this.arr[b];
    this.arr[b] = this.arr[a] - this.arr[b];
    this.arr[a] -= this.arr[b];
  }

  public max(): number{ //O(1)
    return this.arr[0];
  }

  public extractMax(): number{
    if(this.items === 0){
      console.log("Heap is empty, cannot extract max.")
      return -Infinity;
    }
    this.swap(0, this.items - 1);
    let max : number = this.arr.splice(this.items - 1, 1)[0]; //remove the last element (swapped root) 
    this.items--;
    this.heapify(0);
    return max;
  }

  public insert(x : number): void{ //O(logn)
    if(!this.isFull()){
      this.arr.push(-Infinity);
      this.items++;
      this.increaseValue(this.arr.length - 1, x);
    }else{ console.log("Heap is full, cannot insert item."); }
  }
  
  public increaseValue(i : number, x : number): void{ //O(logn)
    if(x < this.arr[i]){
      console.log("Can't reduce node to a larger number."); return;
    }
    this.arr[i] = x;
    while(i > 0 && this.arr[this.parentOf(i)] < this.arr[i]){
      this.swap(this.parentOf(i), i);
      i = this.parentOf(i);
    }
  }

  private heapify(i : number): void{ //O(logn)
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

  private buildHeap(): void{ //O(n)
    let lastBranchIndex : number = Math.pow(2, Math.floor(Math.log2(this.arr.length))) - 2;
    for(let i : number = lastBranchIndex; i >= 0; i--){ this.heapify(i); }
  }

  public getArr(): number[]{
    return this.arr;
  }

  public show() : void{
    console.log(`MaxHeap: ${this.arr}`);
  }
}

let hp : MaxHeap = new MaxHeap(20);
// hp.insert(1);
// hp.insert(0002);
// hp.insert(-12909);
// hp.insert(-1224);
// hp.insert(-12910);
// hp.increaseValue(0002, 3);
// hp.increaseValue(3, -10);
// hp.increaseValue(4, 0002);
// hp.show();
// console.log(hp.extractMax());
// hp.show();
// console.log(hp.extractMax());
// hp.show();
// console.log(hp.extractMax());
// hp.show();
// console.log(hp.extractMax());
// hp.show();
console.log(maxResult([1,-1,-2,4,-7,3], 2));