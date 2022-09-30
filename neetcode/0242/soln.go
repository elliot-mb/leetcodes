package main

import (
	"fmt"
)

func isAnagram(s string, t string) bool {
	// strings are the same length so always been anagrams of each other.
	// if they are not we early return false.
	// my first idea is to make a map/dict of characters to integers for s.
	// this will act as a counter for letters with O(1) access time.
	// once it has tallied up letters from s, it will decrement counters in the dict as it
	// discovers letters in t. if a letter is found in t that has no key, we can return
	// false early, and if a counter ever decrements below zero we can return false early.
	// if neither of these events occur, that means every letter in t must have decremented
	// its corresponding entry. we can use this to conclude it is an anagram without checking
	// the dictionary counters to be zero, saving computation.
	if len(s) != len(t) {
		return false
	}
	sMap := make(map[int32]int) //maps chars to count
	for _, c := range s {
		_, present := sMap[c]
		if present { //update
			sMap[c]++
		} else { //create
			sMap[c] = 1
		}
	}
	//fmt.Println(sMap)
	// check against t
	for _, c := range t {
		count, present := sMap[c]
		if present {
			if count == 0 {
				return false
			}
			sMap[c]--
		} else {
			return false
		}
	}
	return true
}

func main() {
	fmt.Println(isAnagram("racecar", "acerda"))
	fmt.Println("")
}
