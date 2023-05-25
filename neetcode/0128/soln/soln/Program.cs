using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace soln
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                Debug.WriteLine(args[0]);
            }

            int[] nums = { 100, 4, 200, 2, 2, 2, -102, 2341, 2, 123, -239932, 1, 3, 2 };

            Solution s = new Solution();

            Debug.WriteLine(s.LongestConsecutive(nums));
        }

        class Solution
        {
            public Solution()
            {

            }

            static readonly int BASE = 10;
            static readonly int MAX_DIGITS = 10;
            static readonly int RANGE_OFFSET = (int)Math.Pow(10, 9); //specified by leetcode question

            public int LongestConsecutive(int[] nums)
            {
                if (nums.Length == 0)
                {
                    return 0;
                }

                //sort the list (given bounds list data is unlikely to grow exponentially)
                List<int> numsList = new List<int>(nums);
                List<int> sortedNums = RadixSort(numsList);

                int currStreak = 1;
                int bestStreak = 1;
                for (int i = 1; i < sortedNums.Count; i++)
                {
                    int last = sortedNums[i - 1];
                    int curr = sortedNums[i];

                    if (curr - last > 1)
                    {
                        if (bestStreak < currStreak) bestStreak = currStreak;
                        currStreak = 1;
                    }
                    else if (curr - last == 1) //otherwise 0 or 1 are allowed
                    {
                        currStreak++;
                    }
                }

                if (bestStreak < currStreak) bestStreak = currStreak;

                return bestStreak;
            }

            private List<int> RadixSort(List<int> nums)
            {
                List<int> intermediate = new List<int>();

                //offset to eliminate sign 
                for (int i = 0; i < nums.Count; i++)
                    intermediate.Add(nums[i] + Solution.RANGE_OFFSET);

                int max = 0;
                for (int i = 0; i < nums.Count; i++)
                    if (max < intermediate[i]) max = intermediate[i];

                int maxDigits = (int)Math.Floor(Math.Log10(max)) + 1;

                //maxDigits rounds of countingsort
                for (int i = 0; i < maxDigits; i++)
                    intermediate = CountingSort(intermediate, i);

                //remove offset 
                for (int i = 0; i < nums.Count; i++)
                    intermediate[i] = intermediate[i] - Solution.RANGE_OFFSET;

                return intermediate;
            }

            //digit d
            private int GetDigit(int num, int d)
            {
                int divisor = (int)Math.Pow(Solution.BASE, d);
                return (num / divisor) % Solution.BASE;
            }

            //sorts the nth digit
            private List<int> CountingSort(List<int> nums, int d)
            {
                if (d < 0 || d >= Solution.MAX_DIGITS)
                    throw new Exception("NthDigits cannot find a digit beyond the " + Solution.MAX_DIGITS + "th digit or below the 1st");
                if (nums.Count == 0)
                    throw new ArgumentException("CountingSort the list not be empty");

                List<int> output = new List<int>(new int[nums.Count]);

                int[] count = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }; //a counter for each digit 
                //count our digits
                for (int i = 0; i < nums.Count; i++)
                    count[GetDigit(nums[i], d)]++;

                //prefix sum
                for (int i = 1; i < count.Length; i++)
                    count[i] += count[i - 1];

                //place in the output
                for (int i = nums.Count - 1; i >= 0; i--)
                {
                    int digit = GetDigit(nums[i], d);
                    output[count[digit] - 1] = nums[i]; //0 indexed so we subtract 1 from count
                    count[digit]--;

                }

                return output;
            }
        }
    }
}
