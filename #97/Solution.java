import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static boolean isInterleave(String s1, String s2, String s3) {
        int s1Top = 0; int s2Top = 0;
        boolean fromS1 = true; int subsequenceSize = 0;
        int swaps = 0;
        for(int i = 0; i < s3.length(); i++){
            char c = s3.charAt(i);
            if(fromS1){
                if(s1Top >= s1.length() || s1.charAt(s1Top) != c){
                    fromS1 = false;
                    if(subsequenceSize == 0 && swaps != 0) { return false; }
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
                    if(subsequenceSize == 0 && swaps != 0) { return false; }
                    subsequenceSize = 0;
                    i--;
                    swaps++;
                }else{
                    subsequenceSize++;
                    s2Top++;
                } //"take a character from s2
            }
        }
        return s1Top == s1.length() && s2Top == s2.length();
    }

    public static void main(String[] args){
        System.out.println(isInterleave("a", "b", "a"));
    }
}
