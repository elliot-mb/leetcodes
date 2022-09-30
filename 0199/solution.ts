class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function rightSideView(root: TreeNode | null): number[] {
  if(root === null) { return []; }

  let visibleNodes : TreeNode[] = []; 
  let isUnexplored : boolean = true;
  let current : TreeNode = root;
  let currentPath : TreeNode[] = [];
  let maxDepth : number = 0;
  let nodeDict : object = {};

  while(isUnexplored){
    let downRightPath : TreeNode[] = pathToBottomRight(current); //goes right by going down
    currentPath = [...currentPath, ...downRightPath];
    //console.log(currentPath);
    let depth : number = currentPath.length;
    let deltaDepth : number = depth - maxDepth; //depth below max
    deltaDepth = deltaDepth < 0 ? 0 : deltaDepth; //how much further down are we? 
      
    visibleNodes = [...visibleNodes, ...currentPath.slice(maxDepth < 0 ? 0 : maxDepth)];
    maxDepth = depth > maxDepth ? depth : maxDepth; 
    let i : number = depth - 1;
    for(i; i >= 0; i--){ //we know last has no left child, start at penultimate node
      let node : TreeNode = currentPath[i];
      if(!(node.left !== null && node.right === null) && node.left !== null && (nodeDict[`${node.val},${currentPath.length}`] === undefined)){ //not (just a left edge) and (has a left edge)
        isUnexplored = true;
        nodeDict[`${node.val},${currentPath.length}`] = "left"; 
        current = node.left;
        break; //break out
      }
      currentPath.pop();
      isUnexplored = false; //in case of no left node at all 
    }
  }

  return visibleNodes.map((x : TreeNode) : number => {return x.val;});
};

function pathToBottomRight(root: TreeNode | null): TreeNode[] { //generates the path furthest down and to the right 
  if(root === null) { return []; }
  return [...[root], ...pathToBottomRight(root.right === null ? root.left : root.right)];
};