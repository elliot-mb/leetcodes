import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static boolean isInterleave(String s1, String s2, String s3) {
        return surrogate(s1, s2, s3) || surrogate(s2, s1, s3);
    }

    private static boolean surrogate(String s1, String s2, String s3) {
        int s1Top = 0; int s2Top = 0;
        boolean fromS1 = true; int subsequenceSize = 0;
        int swaps = 0;
        List<Integer> subsequenceSizes = new ArrayList<Integer>();
        int i;
        for(i = 0; i < s3.length(); i++){
            char c = s3.charAt(i);
            if(fromS1){
                if(s1Top >= s1.length() || s1.charAt(s1Top) != c){
                    fromS1 = false;
                    subsequenceSizes.add(subsequenceSize);
                    if(subsequenceSize == 0 && swaps != 0) { i = Integer.MAX_VALUE; }
                    subsequenceSize = 0;
                    i--;
                    swaps++;
                }else{
                    subsequenceSize++;
                    s1Top++;
                } //"take" a character from s1
            }else{
                if(s2Top >= s2.length() || s2.charAt(s2Top) != c){
                    fromS1 = true;
                    subsequenceSizes.add(subsequenceSize);
                    if(subsequenceSize == 0 && swaps != 0) { i = Integer.MAX_VALUE; }
                    subsequenceSize = 0;
                    i--;
                    swaps++;
                }else{
                    subsequenceSize++;
                    s2Top++;
                } //"take a character from s2
            }
        }
        if(i != Integer.MAX_VALUE){ subsequenceSizes.add(subsequenceSize); }
        //System.out.println(subsequenceSizes);
        int lastIndex = subsequenceSizes.size() - 1;
        if(subsequenceSizes.get(lastIndex) == 0 && lastIndex > 0) {
            boolean s1First = true;
            boolean[] results = new boolean[subsequenceSizes.size() - 1];
            int s1Ptr = 0, s2Ptr = 0;
            int j = 0;
            for(int s : subsequenceSizes){
                s1First = !s1First; //first subsequence requires a new process which __Doesnt__ take s1 first
                if(!s1First){
                    s1Ptr += s;
                }else{
                    s2Ptr += s;
                }
                if(s > 1){
                    String s1Cut;
                    String s2Cut;
                    String s3Cut;
                    // if any of the recursive calls are true, the function returns true
                    if(s1First){
                        for(int k = 1; k < s2Ptr; k++){
                            s1Cut = s1.substring(s1Ptr);
                            s2Cut = s2.substring(s2Ptr - k);
                            s3Cut = s3.substring(s1Ptr + s2Ptr - k);
                            results[j] = isInterleave(s1Cut, s2Cut, s3Cut);
                        }
                    }else{
                        for(int k = 1; k < s1Ptr; k++){
                            s1Cut = s1.substring(s1Ptr - k);
                            s2Cut = s2.substring(s2Ptr);
                            s3Cut = s3.substring(s1Ptr + s2Ptr - k);
                            results[j] = isInterleave(s2Cut, s1Cut, s3Cut);
                        }
                    }
                }
                j++;
            }
            for(boolean r : results) { if (r) { return true; } }
            return false;
        }else if (s1Top == s1.length() && s2Top == s2.length()){
            return true;
        }
        return false;
    }

    public static void main(String[] args){
        //tests
//        System.out.println(isInterleave("aa", "ab", "aaba"));
//        System.out.println(isInterleave("aabcc", "dbbca", "aadbbcbcac"));
//        System.out.println(isInterleave("aabcc", "dbbca", "aadbbcbccc"));
        System.out.println(isInterleave("aadaaeaaf", "aabaac", "aadaaeaabaafaac"));
    }
}
