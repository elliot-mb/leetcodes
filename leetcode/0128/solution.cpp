#include <vector>
#include <stdio.h>
#include <iostream>
#include <cmath>
using namespace std;

class Solution {
public:
  int longestConsecutive(vector<int>& nums) {
    if(nums.size() < 1){
      return 0;
    }
    vector<int> sorteds(sort(nums));
    showVect<int>(sorteds); printf("\n");
    int longest = 0, current = 1;
    for(int i = 0; i < sorteds.size() - 1; i++){
      if(sorteds[i + 1] - sorteds[i] == 1 || sorteds[i + 1] - sorteds[i] == 0){
        current++;
      }else{
        longest = longest > current ? longest : current;
        current = 1;
      }
    }
    return longest < current ? current : longest;
  }
private:
  template<typename T> void showVect(vector<T>& vect){
    for (T x : vect)
      cout << x << " ";
  }
  private:
  template<typename T> pair<vector<T>, vector<T>> split(vector<T>& v){
    auto first = v.begin();
    auto middle = first + ceil((double) v.size() / 2);
    auto last = v.end();
    vector<T> v1(first, middle);
    vector<T> v2(middle, last);
    return pair<vector<T>, vector<T>>(v1, v2);
  }
private:
  vector<int> sort(vector<int>& v){ //merge sort 
    if(v.size() <= 1){ return v; } 
    pair<vector<int>, vector<int>> halves(split(v));
    vector<int> v1(sort(halves.first)); int p1 = 0;
    vector<int> v2(sort(halves.second)); int p2 = 0;
    vector<int> result;
    while(v1.size() > p1 && v2.size() > p2){
      int smallest = v1[p1] <= v2[p2] ? v1[p1] : v2[p2];
      if(v1[p1] <= v2[p2]) { p1++; } else { p2++; }
      result.push_back(smallest);
    }
    for(int i = p1; i < v1.size(); i++){ result.push_back(v1[i]); }
    for(int i = p2; i < v2.size(); i++){ result.push_back(v2[i]); }
    return result;
  }
// private:
//   vector<int>& qsort(vector<int>& nums){ //ascending order
//     printf("qsorting "); showVect<int>(nums); printf("\n");
//     if(nums.size() <= 1){
//       return nums;
//     }
//     int stationary = 0;
//     int mobile     = nums.size() - 1;
//     int direction  = -1; 
//     while(stationary * direction > mobile * direction){
//       showVect(nums);
//       printf("st: %d, mv: %d, swap if %d %s %d\n", stationary, mobile, nums[stationary], direction == -1 ? ">" : "<", nums[mobile]);
//       if(nums[stationary] * direction < nums[mobile] * direction){ //out of order
//         //swap
//         nums[stationary] += nums[mobile];
//         nums[mobile]      = nums[stationary] - nums[mobile];
//         nums[stationary] -= nums[mobile];
//         stationary += mobile;
//         mobile      = stationary - mobile;
//         stationary -= mobile - direction; 
//         direction  *= -1;
//       }
//       mobile += direction; 
//     }
//     //if(stationary == 0) { return nums; } //no swaps 
//     //printf("pivot info: mv = %d, st = %d\n", mobile, stationary);
//     int pivot = stationary;
//     printf("pivot: %d\n", pivot);
//     return nums;
//   }
};

int main(int argc, char** args){
  Solution sol;
  vector<int> vect{1,2,0,1};
  printf("result %d\n", sol.longestConsecutive(vect));
  return 0;
}