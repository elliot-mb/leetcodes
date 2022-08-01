class NumArray {

    private final int[] nums;
    private int lastSum = 0;
    private final int[] lastRange = {0, -1};

    public NumArray(int[] nums) {
        this.nums = nums;
    }

    public void update(int index, int val) {
        if(index >= lastRange[0] && index <= lastRange[1]){
            lastSum += val - nums[index]; //update last sum
        }
        nums[index] = val;
    }

    public int sumRange(int left, int right) {
        if(lastRange[0] > lastRange[1]) { //havent summed before or input is malformed
            for(int i = left; i <= right; i++) lastSum+=nums[i];
        }else{
            int diffLeft = left - lastRange[0];
            int diffRight = right - lastRange[1];
            if(diffLeft < 0){ //adding to range
                for(int i = -1; i >= diffLeft; i--){
                    lastSum += nums[lastRange[0] + i];
                }
            }else{ //subtracting from range
                for(int i = 0; i < diffLeft; i++){
                    lastSum -= nums[lastRange[0] + i];
                }
            }
            if(diffRight > 0){ //adding to range
                for(int i = 1; i <= diffRight; i++){
                    lastSum += nums[lastRange[1] + i];
                }
            }else{ //subtracting
                for(int i = 0; i > diffRight; i--){
                    lastSum -= nums[lastRange[1] + i];
                }
            }
        }
        lastRange[0] = left; lastRange[1] = right;
        return lastSum;
    }

    public static void main(String[] args){
        NumArray n = new NumArray(new int[]{1, 2, 3, 4, 5});
        System.out.println(n.sumRange(0, 4));
        System.out.println(n.sumRange(1, 3));
        System.out.println(n.sumRange(0, 0));
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray obj = new NumArray(nums);
 * obj.update(index,val);
 * int param_2 = obj.sumRange(left,right);
 */