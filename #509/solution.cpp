using namespace std;

class Solution {
public:
  int fib(int n) {
    int fibs[31] = {};
    fibs[0] = 0; fibs[1] = 1;
    for(int i = 2; i <= n; i++){
      fibs[i] = fibs[i - 2] + fibs[i - 1];
    }
    return fibs[n];
  }
};