
//find factors of the number at the specified index 
//xs must be distinct integers sorted in ascending order
//returns the indices of the factors in xs
function factorPairs(xs: number[], i : number): [number, number][]{
    if(xs.length === 0 || i <= 0 || i > xs.length) { return []; } //ignoring case of 1^2 (not helpful for this problem)
    let targ : number = xs[i];
    let l : number = 0;
    let r : number = i - 1; //ignores case 1 * xs[i] (not helpful for this problem)
    let pairs : [number, number][] = [];
    while(l <= r){
        let prod : number = xs[l] * xs[r];
        if(prod === targ){ 
            pairs.push([l, r]);
            //exclude both multiples
            l++; 
            r--;
        }else if(prod < targ){
            l++;
        }else{
            r--;
        }
    }
    return pairs;
}

function numFactoredBinaryTrees(arr: number[]): number {
    let trees : number[] = []; //trees[i] is # of trees arr[i] has below it (our dynamic programming array)
    arr.sort((a, b) => a - b);
    arr.forEach((x, i) =>{
        let factPairs : [number, number][] = factorPairs(arr, i);
        if(factPairs.length === 0){ trees[i] = 1; }
        else {
            trees[i] = 1;
            factPairs.forEach((pair) => {
                trees[i] += trees[pair[0]] * trees[pair[1]] * (pair[0] !== pair[1] ? 2 : 1); //can the pairs be flipped to make a new tree?
            });
        }
    });
    return trees.reduce((x, y) => x + y, 0) % (Math.pow(10, 9) + 7);
};

function main(): void{
    console.log(numFactoredBinaryTrees([2,4]));
    console.log(numFactoredBinaryTrees([2,4,5,10]));
    console.log(numFactoredBinaryTrees([2,4,8,15,16]));
    console.log(factorPairs([2,3,4,5,6,7,8,9,10,11,12], 8));
}

main();