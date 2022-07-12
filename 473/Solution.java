import java.util.*;
import java.util.stream.Collectors;

public class Solution {
    public boolean makesquarer(int[] matchsticks) {
        PriorityQueue<Integer> pq = new PriorityQueue<Integer>(matchsticks.length, (o1, o2) -> o2 - o1);
        pq.addAll(Arrays.stream(matchsticks).boxed().toList());
        List<Integer> ordered = new ArrayList<Integer>();
        while(pq.size() > 0) { ordered.add(pq.poll()); } //creates ordered list through heap sort

        //System.out.println(ordered);
        while(ordered.size() > 0){
            boolean foundFour = true; int current = -1;
            int found = -1; int first = 0;
            while(foundFour && ordered.size() > 0){ //takes as many groups of four identical numbers as possible
                current = ordered.remove(first);
                for(found = 1; found < 4 && ordered.size() > 0 && ordered.get(first).equals(current); found++){ ordered.remove(first); }
                if(found < 4) { foundFour = false; }
            }
            int remaining = 4 - found;
            System.out.println("we need " + remaining + " more " + current + "s");
            System.out.println(ordered);
            if(ordered.size() == 0 && remaining == 0) return true;
            while(remaining > 0){
                int total = 0; int i = 0;
                while(total < current && i < ordered.size()){ //takes from list until satisfied or reached end
                    if(total + ordered.get(i) > current) { i++; }
                    else { total += ordered.remove(i); } //has the effect of increasing i
                    System.out.println(ordered);
                }
                if(total == current) { remaining--; }
                else{
                    System.out.println("its false baybeee cant find " + current + ", got " + total);
                    return false;
                }
            }
        }
        return true;
    }


    public boolean makesquare(int[] matchsticks) {
        int sum = Arrays.stream(matchsticks).sum(); if(sum % 4 != 0) { return false; }
        int sideLength = sum / 4;

        return false;
    }


    public static void main(String[] args){
        Solution s = new Solution();
        //System.out.println(s.makesquare(new int[]{4}));
        System.out.println(s.makesquare(new int[]{1,1,2,2,2}));
        System.out.println(s.makesquare(new int[]{3,3,3,3,4}));
        System.out.println(s.makesquare(new int[]{2,2,2,3,3,6,6}));
        System.out.println(s.makesquare(new int[]{2,3,2,3,5,5}));
        System.out.println(s.makesquare(new int[]{10,6,5,5,5,3,3,3,2,2,2,2}));
    }
}
