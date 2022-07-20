#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// #define wordsSizeIn 4

int numMatchingSubseq(char * s, char ** words, int wordsSize){
  int count = 0;
  int len = strlen(s);

  //RLE compress s 
  int changes = 0;
  for(int i = 0; i < len - 1; i++){
    if(s[i] != s[i + 1]) { changes++; }
  }

  int sRLE[changes + 1]; //there are 26 lowercase english letters
  for(int i = 0; i < changes + 1; i++){ sRLE[i] = 0; }

  int current = 0;
  for(int i = 0; i < len; i++){
    sRLE[current]++; //increment corresponding char 
    if(i < len - 1 && s[i] != s[i + 1]){ current++; }
  }

  for(int i = 0; i < wordsSize; i++){
    char *sPtr = s;
    char *word = words[i];
    char *wPtr = word;
    int subLen = strlen(word);

    int indexRLE = 0;
    int increments = 0;
    while(sPtr - s < len && wPtr - word < subLen){
      char wNext = *(wPtr + 1);
      if(*sPtr == *wPtr){
        wPtr++;
      }
      if(*sPtr == wNext){
        increments++;
        sPtr++;
      }else{
        sPtr += sRLE[indexRLE] - increments;
        indexRLE++;
        increments = 0;
      }
    }

    if(wPtr - word == subLen){
      count++;
    }
  }

  return count;
}

// int main(int argc, char** args){

//   char s[] = "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwk";
//   int wordSize = strlen(s);
//   char xs[wordsSizeIn][3] = {"wk","wk","wk","wk"};
//   char *xsRows[wordsSizeIn] = {xs[0], xs[1], xs[2], xs[3]};
//   char **xsPtr = xsRows;

//   printf("returns %d\n", numMatchingSubseq(&s[0], xsPtr, wordsSizeIn));

//   return 0;
// }