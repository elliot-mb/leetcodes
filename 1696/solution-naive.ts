function maxResultt(nums: number[], k: number): number {
  let i : number = 0, max : number = -Infinity, jump : number; 
  let score : number = nums[0];
  while(i < nums.length - 1){
    jump = 1;
    let positiveFound : boolean = false;
    while(nums[i + jump] < 0 && jump < k && i + jump < nums.length){ //check closest positive number
      positiveFound = positiveFound ? positiveFound : nums[i + jump] >= 0;
      console.log(`${positiveFound} for ${nums[i + jump]}`);
      jump++;
    }
    positiveFound = positiveFound ? positiveFound : nums[i + jump] >= 0;
    console.log(`${positiveFound} for ${nums[i + jump]}`);
    if(!positiveFound){
      console.log("cant see the positive side");
      //search for largest negative (prefer a jump to -1 over -2, for example)
      max = -Infinity;
      for(let n : number = 1; n <= k && i + n < nums.length; n++){
        if(max < nums[i + n]){
          jump = n;
          max = nums[i + n];
        } 
      }
    }
    i += jump;
    console.log(nums[i]);
    score += nums[i] === NaN || nums[i] === undefined ? 0 : nums[i];
  }
  return score; 
};

console.log(maxResultt([0,-1,-2,-3,1], 2));