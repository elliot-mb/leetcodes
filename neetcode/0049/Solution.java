import java.util.*;
import java.util.stream.Collectors;

public class Solution {

    public List<List<String>> groupAnagrams(String[] strs) {
        List<String> strsCopy = new ArrayList<String>(Arrays.asList(strs));

        strsCopy = strsCopy.stream().map(s -> { //sorts each string individually
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            return Arrays.toString(chars);
        }).toList();

        Map<String, List<Integer>> groupMap = new HashMap<String, List<Integer>>();

        for(int i = 0; i < strsCopy.size(); i++){
            String str = strsCopy.get(i); //gets sorted string
            if(groupMap.containsKey(str)){
                groupMap.get(str).add(i); //adds to group if, when sorted, it's the same (anagram of the same letters)
            }else{
                groupMap.put(str, new ArrayList<Integer>(List.of(i)));
            }
        }
        List<List<String>> groups = new ArrayList<List<String>>();
        for(List<Integer> group : groupMap.values()){
            groups.add(group.stream().map(i -> strs[i]).toList());
        }
        return groups;
    }

    public static void main(String[] args){

    }
}

