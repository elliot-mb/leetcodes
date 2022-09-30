
//Definition for a binary tree node.
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

function sortedArrayToBST(nums: number[]): TreeNode | null {
    let step : number = Math.floor(nums.length / 2);
    let root : TreeNode = new TreeNode(nums[step]);
    let centres : [TreeNode, number][] = [[root, step]];
    step = Math.floor(step / 2);
    while(step >= 1){
        let count : number = centres.length;
        let i : number = 0;
        while(i < count){
            let [node, iNode] : [TreeNode, number] = centres[0];
            let left : [TreeNode, number] = [new TreeNode(nums[iNode - step]), iNode - step];
            let right : [TreeNode, number] = [new TreeNode(nums[iNode + step]), iNode + step];
            node.left = left[0];
            node.right = right[0];
            centres.splice(0, 1); //remove current centre
            centres.push(left); centres.push(right);
            i++;
        }
        step = Math.floor(step / 2);
    }
    return root;
};

function main() : void{
    console.log(sortedArrayToBST([1,2,3,4,5,6,7]));
}