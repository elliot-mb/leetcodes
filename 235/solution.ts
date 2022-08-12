
// * Definition for a binary tree node.
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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if(p === null || q === null || root === null) return null;
    let current : TreeNode = root;
    while(current.left !== null && current.right !== null){
        if(current.val === p.val || current.val === q.val) { return current; }
        let pLeft : boolean = current.val > p.val; //is p left of current node
        let qLeft : boolean = current.val > q.val; //is q left of current node
        if(pLeft !== qLeft){
            return current;
        }
        else{
            current = pLeft ? current.left : current.right;
        }
    }
    if(current.left !== null && (current.left.val === p.val || current.left.val === q.val)) return current;
    if(current.right !== null && (current.right.val === p.val || current.right.val === q.val)) return current;
    return null;
};