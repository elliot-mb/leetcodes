import javax.swing.*;
import java.util.*;
import java.util.stream.Collectors;

public class Solution {
//    public boolean makesquarer(int[] matchsticks) {
//        PriorityQueue<Integer> pq = new PriorityQueue<Integer>(matchsticks.length, (o1, o2) -> o2 - o1);
//        pq.addAll(Arrays.stream(matchsticks).boxed().toList());
//        List<Integer> ordered = new ArrayList<Integer>();
//        while(pq.size() > 0) { ordered.add(pq.poll()); } //creates ordered list through heap sort
//
//        //System.out.println(ordered);
//        while(ordered.size() > 0){
//            boolean foundFour = true; int current = -1;
//            int found = -1; int first = 0;
//            while(foundFour && ordered.size() > 0){ //takes as many groups of four identical numbers as possible
//                current = ordered.remove(first);
//                for(found = 1; found < 4 && ordered.size() > 0 && ordered.get(first).equals(current); found++){ ordered.remove(first); }
//                if(found < 4) { foundFour = false; }
//            }
//            int remaining = 4 - found;
//            System.out.println("we need " + remaining + " more " + current + "s");
//            System.out.println(ordered);
//            if(ordered.size() == 0 && remaining == 0) return true;
//            while(remaining > 0){
//                int total = 0; int i = 0;
//                while(total < current && i < ordered.size()){ //takes from list until satisfied or reached end
//                    if(total + ordered.get(i) > current) { i++; }
//                    else { total += ordered.remove(i); } //has the effect of increasing i
//                    System.out.println(ordered);
//                }
//                if(total == current) { remaining--; }
//                else{
//                    System.out.println("its false baybeee cant find " + current + ", got " + total);
//                    return false;
//                }
//            }
//        }
//        return true;
//    }


    public boolean makesquare(int[] matchsticks) {
        int sum = Arrays.stream(matchsticks).sum();
        if(sum % 4 != 0) return false;
        int sideLength = sum / 4;
        PriorityQueue<Integer> pq = new PriorityQueue<Integer>(matchsticks.length, (o1, o2) -> o2 - o1);
        pq.addAll(Arrays.stream(matchsticks).boxed().toList());
        List<Integer> ordered = new ArrayList<Integer>();
        while(pq.size() > 0) { ordered.add(pq.poll()); } //creates ordered list through heap sort
        System.out.println("MAKING " + sideLength);
        for(int i = 0; i < 4; i++){
            List<Integer> used = arraySum(ordered.stream().mapToInt(Integer::intValue).toArray(), sideLength);
            System.out.println(used + " | " + ordered);
            if(used.stream().reduce(0, Integer::sum) != sideLength) return false;
            for(Integer n : used){
                ordered.remove(n);
            }
        }

        return true;
    }

    public List<Integer> arraySum(int[] arr, int target){
        if(arr.length == 0) { return new ArrayList<Integer>(); }
        int arrLast = arr.length - 1;
        List<Integer> pointers = new ArrayList<Integer>();
        int sum = 0;
        boolean exit = false;
        while(!exit) {
            int last;
            boolean hasHitEnd = false;
            while (sum < target && !hasHitEnd) {
                pointers.add(arrLast);
                last = pointers.size() - 1;
                int i = arrLast;
                while(i >= (last - 1 < 0 ? 0 : pointers.get(last - 1) + 1) && sum + arr[pointers.get(last)] < target) {
                    //System.out.println("sheesh");
                    pointers.set(last, i);
                    i--;
                }
                sum += arr[pointers.get(last)];
                if(pointers.get(last) == arrLast) hasHitEnd = true;
                System.out.println(sum);

            }
            System.out.println("arr[pointers]> " + pointers.stream().map(x -> arr[x]).collect(Collectors.toList()));
            if (sum > target) {
                //reducible?
                boolean reduced = false;
                System.out.println("< "+pointers);
                while (!(reduced || exit)) {
                    last = pointers.size() - 1;
                    int current = pointers.get(last) + 1;
                    if (current < arrLast) {
                        while (current < arrLast && sum - arr[pointers.get(last)] + arr[current] + arr[arrLast] > target) {
                            current++;
                        }
                        //if there are no two lower elements which sum to lower than the old pointer
                        if (current == arrLast) {
                            sum -= arr[pointers.remove(last)];
                        } else {
                            sum -= arr[pointers.set(last, current)];
                            sum += arr[pointers.get(last)];
                            reduced = true;
                        }
                    } else { //last not reducible
                        sum -= arr[pointers.remove(last)];
                    }
                    if (pointers.size() == 0) {
                        exit = true;
                    }
                    System.out.println("~ " + pointers);
                }
                System.out.println("> " + pointers);
            }else{ exit = true; }
        }
        return pointers.stream().map(x -> arr[x]).collect(Collectors.toList());
    }

    public static void main(String[] args){
        Solution s = new Solution();
        //System.out.println(s.makesquare(new int[]{4}));
        //System.out.println(s.makesquare(new int[]{1,1,2,2,2}));
        //System.out.println(s.makesquare(new int[]{3,3,3,3,4}));
        //System.out.println(s.makesquare(new int[]{2,2,2,3,3,6,6}));
        //System.out.println(s.makesquare(new int[]{2,3,2,3,5,5}));
        System.out.println(s.makesquare(new int[]{20,13,19,19,4,15,10,5,5,15,14,11,3,20,11}));
        //System.out.println(s.arraySum(new int[]{9,6,5,3,2,2,1}, 28));
    }
}
