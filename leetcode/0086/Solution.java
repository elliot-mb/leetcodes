import java.util.*;

public class Solution {
    public static void main(String[] args){
        Solution s = new Solution();
        System.out.println(s.countSmaller(new int[]{1,1}));
    }

    public List<Integer> countSmaller(int[] nums) {
        Comparator<Triple<Integer, Integer, Integer>> comparator = new Comparator<Triple<Integer, Integer, Integer>>(){
            @Override
            public int compare(Triple<Integer, Integer, Integer> o1, Triple<Integer, Integer, Integer> o2) {
                return -o1.compareTo(o2); //max pq/heap
            }
        };
                           // value  less-thans  index
        PriorityQueue<Triple<Integer, Integer, Integer>> pq = new PriorityQueue<Triple<Integer, Integer, Integer>>(nums.length, comparator);
        pq.add(new Triple<Integer, Integer, Integer>(nums[nums.length - 1], 0, nums.length - 1)); //there are no integers on the right of the last element
        List<Triple<Integer, Integer, Integer>> popped = new ArrayList<Triple<Integer, Integer, Integer>>();
        int current;
        for(int i = nums.length - 2; i >= 0; i--){
            current = nums[i];
            popped.clear();
            while(!pq.isEmpty() && (popped.size() == 0 || popped.get(popped.size() - 1).fst() > current)){
                //there is now another element smaller, but dont increment because its on the left
                popped.add(pq.poll());
            }
            int last = popped.size() - 1;
            int smallers = popped.get(last).fst() >= current ? 0 : 1; // if our value is equal, there are no extra smaller elements to the right
            Triple<Integer, Integer, Integer> currentPair = new Triple<Integer, Integer, Integer>(current, popped.get(last).snd() + smallers, i); //
            popped.add(currentPair);
            pq.addAll(popped);
        }
        //System.out.println(pq);

        List<Integer> result = new ArrayList<Integer>(Collections.nCopies(nums.length, 0));
        while(!pq.isEmpty()) {
            Triple<Integer, Integer, Integer> polled = pq.poll();
            result.set(polled.trd(), polled.snd()); //third encodes the index, second is the count of smallers to the right
        }

        return result;
    }

    private class Pair<T extends Comparable<T>, U> implements Comparable<Pair<T, U>> { //generic pair tuple for any types
        private final T a;
        private final U b;

        Pair(T a, U b){
            this.a = a;
            this.b = b;
        }

        public T fst(){
            return a;
        }

        public U snd(){
            return b;
        }

        public String toString(){
            return "Pair " + fst() + " " + snd();
        }

        @Override
        public int compareTo(Pair<T, U> o) { //pairs are ordered on their first value
            return a.compareTo(o.fst());
        }
    }

    private class Triple<T extends Comparable<T>, U extends Comparable<U>, V> implements Comparable<Triple<T, U, V>>{
        private final Pair<T, Pair<U, V>> t;

        Triple(T a, U b, V c){
            this.t = new Pair<T, Pair<U, V>>(a, new Pair<U, V>(b, c));
        }

        public T fst(){
            return t.fst();
        }

        public U snd(){
            return t.snd().fst();
        }

        public V trd(){
            return t.snd().snd();
        }

        public String toString(){
            return "Triple " + fst() + " " + snd() + " " + trd();
        }

        @Override
        public int compareTo(Triple<T, U, V> o) { //comparison still happens on the first element
            return fst().compareTo(o.fst());
        }
    }
}
