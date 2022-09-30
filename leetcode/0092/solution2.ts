class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
}

//simpler and more elegant solution 
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  let init : number[] = []; 
  let reverse : number[] = [];
  let tail : number[] = [];
  let count : number = 1;
  while(head !== null){
    if(count < left){ init[init.length] = head.val; }
    if(count >= left && count <= right){ reverse[right - count] = head.val; }
    if(count > right) { tail[tail.length] = head.val; }
    count++;
    head = head.next;
  }
  
  let values : number[] = init.concat(reverse, tail);
  let current : ListNode;
  let last : ListNode | null = head;
  for(let i : number = values.length - 1; i >= 0; i--){
    let x : number = values[i];
    current = new ListNode(x, last);
    last = current;
  }
  return last;
};