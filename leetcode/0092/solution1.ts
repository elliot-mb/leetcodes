
//Definition for singly-linked list.
// class ListNode {
//   val: number
//   next: ListNode | null
//   constructor(val?: number, next?: ListNode | null) {
//     this.val = (val===undefined ? 0 : val)
//     this.next = (next===undefined ? null : next)
//   }
// }

// long winded and harder to read solution (that doesnt quite work properly), **refer to solution2.ts**

// function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
//   if(head === null) return head;
//   if(left === right) return head;
  
//   //let s : Stack = new Stack();
//   let s : number[] = [];
//   let nodesRead : number = 1;
//   let current : ListNode | null = new ListNode(head.val, head.next);
//   let redirectNodeStart : ListNode | null = null; 
//   let redirectNodeEnd : ListNode | null = null;

//   while(current !== null){
//     if(nodesRead === left - 1) { redirectNodeStart = current; }
//     if(nodesRead >= left && nodesRead <= right){
//       s.push(head?.val === undefined ? NaN : current.val);
//     }
//     if(nodesRead === right + 1) { redirectNodeEnd = current; }
//     current = current.next;
//     nodesRead++;
//   }
//   console.log(s);
//   let flippedList : ListNode | null = null;
//   let flippedLast : ListNode | null = null; let end : boolean = true;
//   let newNode : ListNode;
//   let prevNode : ListNode | null = null;
//   while(s.length > 0){
//     let val : number | null = s[0];
//     s = s.slice(1, s.length);
//     newNode = new ListNode(val === null ? 0 : val, prevNode);
//     if(end) { flippedLast = newNode; end = false; }
//     console.log(`${prevNode?.val} <- ${val}`);
//     prevNode = newNode;
//   }
//   flippedList = prevNode;
//   if(redirectNodeStart !== null) redirectNodeStart.next = flippedList;
//   if(flippedLast !== null) flippedLast.next = redirectNodeEnd;
    
//   return redirectNodeStart === null ? flippedList : head;
// };