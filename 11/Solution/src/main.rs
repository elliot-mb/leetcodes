use std::cmp;
fn main() { //my first ever rust program
    let xs: Vec<i32> = vec![1,8,6,2,5,4,8,3,7];
    print!("Input {:?} -> ", xs); 
    let result: i32  = max_area(xs);
    print!("{result}\n");
}

fn max_area(height: Vec<i32>) -> i32 {
    let mut max: i32 = 0;
    let mut l = 0;
    let mut r = height.len() - 1;
    while l < r {
        max = cmp::max(max, cmp::min(height[l], height[r]) * (r - l) as i32);

        if(height[l] < height[r]){ //incrementing right would only make it smaller 
            l = l + 1;
        }else{
            r = r - 1;
        }
    }
    
    max
}