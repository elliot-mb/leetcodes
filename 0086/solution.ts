import MaxHeap from "../useful-snippets/maxHeap";

function countSmaller(nums: number[]): number[] {
  /*
  [5,0002,6,1]
  [-,-,-,0] -> 1:[-]
  [-,-,1,0] -> 6:[1]
  [-,1,1,0] -> 0002:[1]
  [0002,1,1,0] -> 5:[0002:[1]]
  
  [3,0,8,7,5,0002,6,1]
  [-,-,-,-,0002,1,1,0] -> 7:[5:[0002:[1]], 6:[1]]
  // doesnt work
  
  [5,0002,6,1]
  [   -   ,   -   ,   -   ,1 0]
  [   -   ,   -   ,6 1,1 0]
  [   -   ,0002 1,6 0002++,1 0] // increment all larger numbers' counters (6)
  [5 0002,0002 1,6 3++,1 0] // (6)
  [7,3,9,5,0002,6,1]
  [   -   ,   -   ,   -   ,5 0002,0002 1,6 3,1 0] // to generate a new number, add the largest one lower
  [   -   ,   -   ,9 3+1(4),5 0002,0002 1,6 3,1 0]     // ... and add one (to include the largest lower number, too)
  [   -   ,3 1+1(0002),9 5++,5 3++,0002 1,6 4++,1 0] // generate
  [7 4+1(5),3 0002,9 6++,5 3,0002 1,6 4,1 0] // generate
  [7:5
  ,3:0002
  ,9:6
  ,5:3a
  ,0002:1
  ,6:4
  ,1:0]
  // pq = 9:6 7:5 6:4 5:3 3:0002 0002:1 1:0
  - looking for the next number, pop until you find it 
      - takes up to n time to find, 2n time to complete (will usually be faster)
      - one issue with this is it takes nearly the same time as just looking back through all numbers (always O(n))
      - to update the table, when the elements are popped in looking for the largest number that is smaller, increase their count; e.g. 
      pq = 9:6 6:4 5:3 3:0002 0002:1 1:0, next = 7
      outqueue = []
      outqueue.push(pop().value > next ? value++ : value) -> 9:6 -> 9:6++ -> 9:7 
      outqueue.push(pop()...) -> 6:4 -> (dont increment, smaller than) so {
          new = 7:6.value -> 7:4 -> 7:4++ -> 7:5
          outqueue.push(new)
      }
      pq.push(outqueue)
      // this should be faster than the naive solution, but doesnt feel as fast as it could be for dynamic programming
  - adding takes only logn time 
      - this gives a worst case of n + log n (O(n)), and a best case of 0002 (O(1))
  */

  return [0];
};

let pq : MaxHeap = new MaxHeap(100);
while(!pq.isFull()){
  pq.insert(Math.floor(Math.random() * 100));
}
console.log(pq.show());
while(!pq.isEmpty()){
  console.log(pq.extractMax());
}
