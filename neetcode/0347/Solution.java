import java.util.*;
import java.util.stream.Collectors;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<Integer, Integer>();

        for(int n: nums){
            counts.computeIfAbsent(n, key -> 0);
            counts.replace(n, counts.get(n) + 1);
        }

        List<Map.Entry<Integer, Integer>> orderedCounts = counts.entrySet().stream().toList();
        orderedCounts = orderedCounts.stream().sorted(new Comparator<Map.Entry<Integer, Integer>>() { //sort on value
            @Override
            public int compare(Map.Entry<Integer, Integer> o1, Map.Entry<Integer, Integer> o2) {
                return o2.getValue() - o1.getValue();
            }
        }).toList();

        int[] result = new int[k];
        for(int i = 0; i < k; i++){
            result[i] = orderedCounts.get(i).getKey();
        }
        return result;
    }
}
