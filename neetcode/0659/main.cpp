#include <iostream>
#include <stdio.h>
#include <string>
#include <vector>

using namespace std;

#define SUCCESS 0

class Solution {
private:
    static const char CTRL = '#';
public:
    /*
     * @param strs: a list of strings
     * @return: encodes a list of strings to a single string.
     */
    string encode(vector<string> &strs) {
        string builder = "";
        for(string str : strs){
            builder += to_string(str.length()) + Solution::CTRL + str;
        }
        return builder;
    }

    /*
     * @param str: A string
     * @return: dcodes a single string to a list of strings
     */
    vector<string> decode(string &str) {
        
        vector<string> strs;
        int i = 0;
        while(i < str.length()) { 
            int j = i;
            while(str[j] != Solution::CTRL){
                j++;
            }
            //the number of characters to read is between i and j
            int wordSize = stoi(str.substr(i, j - i));
            strs.push_back(str.substr(j + 1, wordSize));
            i = j + wordSize + 1;
        }

        return strs;

        // string encoded = "" + str;
        // while(true){
        //     controlLocation = encoded.find('\1');

        //     if(controlLocation == string::npos){ return strs; }
            
        //     strs.push_back(encoded.substr(0, controlLocation));

        //     encoded = encoded.substr(controlLocation + 1);
        // }
    }
};

int main(int argc, char** args){
    vector<string> input;

    cout << "input = {" ;
    for(int i = 1; i < argc; i++){
        string arg = args[i];
        input.push_back(arg);
        cout << ((i == 1) ? arg : ", " + arg);
    }
    cout << "}\n";

    Solution s;
    
    string encoded = s.encode(input);
    vector<string> decoded = s.decode(encoded);

    cout << "encoded = " + encoded + "\n";

    cout << "decoded = ";
    for(string str : decoded) {
        cout << str + " ";
    }
    cout << "\n";

    return SUCCESS;
}