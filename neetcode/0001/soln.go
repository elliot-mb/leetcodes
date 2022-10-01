package main

import (
	"fmt"
	"sort"
)

func twoSum(nums []int, target int) []int {
	l := 0
	r := len(nums) - 1
	sort.Ints(nums)
	for l < r {
		sum := nums[l] + nums[r]
		if sum < target {
			l++
		} else if sum > target {
			r--
		} else {
			return []int{l, r}
		}
	}
	return []int{l, r}
}

func main() {
	fmt.Println(twoSum([]int{1, 2, 3}, 5))
}
