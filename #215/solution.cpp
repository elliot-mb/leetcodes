#include <vector>
#include <stdio.h>
#include <iostream>
#include <cmath>
using namespace std;

class Solution {
public:
  int findKthLargest(vector<int>& nums, int k) {
    vector<int> sortedNums(sort(nums));
    return sortedNums[sortedNums.size() - k];
  }
// private:
//   template<typename T> void showVect(vector<T>& vect){
//     for (T x : vect)
//       cout << x << " ";
//   }
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
};

int main(int argc, char** args){
  Solution sol;
  vector<int> vect{3,2,3,1,2,4,5,5,6};
  printf("%d\n", sol.findKthLargest(vect, 4));
  return 0;
}
