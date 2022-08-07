#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

//doesnt mutate l
int length(struct ListNode* l){
    int len = 1;
    struct ListNode* copy = l;
    while(copy->next != NULL) { len++; copy = copy->next; }
    return len;
}

//doesnt mutate l, mutates arr
void toArray(struct ListNode* l, int8_t* arr, uint32_t length){
    struct ListNode* copy = l;
    for(int i = 0; i < length; i++){
        arr[i] = copy->val;
        copy = copy->next;
    }
}

//mutates l, doesnt mutate arr
void toList(struct ListNode* nodes, int8_t* arr, uint32_t length){
    for(int i = 0; i < length - 1; i++){
        nodes[i].val = arr[i];
        nodes[i].next = &nodes[i + 1];
    }
    nodes[length - 1].val = arr[length - 1];
}

//mutates l1 and l2
struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2){
    int len1 = length(l1);
    int len2 = length(l2);
    struct ListNode* last1 = l1;
    while(last1->next != NULL) { last1 = last1->next; }
    last1->next = l2; //links lists together to store our result
    int shortest = len1 < len2 ? len1 : len2;
    int longest  = shortest == len1 ? len2 : len1;
    int8_t arr1[len1];
    int8_t arr2[len2];
    toArray(l1, arr1, sizeof(arr1)/sizeof(arr1[0]));
    toArray(l2, arr2, sizeof(arr2)/sizeof(arr2[0]));
    struct ListNode* current = l1;
    struct ListNode* last = current;
    int8_t sum = 0;
    int8_t carry = 0;
    int i;
    for(i = 0; i < shortest; i++){
        sum = arr1[i] + arr2[i] + carry;
        current->val = sum % 10;
        carry = sum / 10;
        last = current;
        current = current->next; //linked list of both input lists will always have the space for their sum
    }
    int8_t* longestArr = longest == len1 ? arr1 : arr2;
    for(i; i < longest; i++){
        sum = longestArr[i] + carry;
        current->val = sum % 10;
        carry = sum / 10;
        last = current;
        current = current->next;
    }
    last->next = carry == 0 ? NULL : last->next;
    current->val = carry;
    current->next = NULL;
    return l1;
}

