import java.util.ArrayList;
import java.util.List;

public class Main{
    public static void main(String[] args){
        /*
        thoughts
        time me bell
        time#bell#

        try ryan's sizable cheddar-cheese
        tryan'sizable#cheddar-cheese

        brain likes estonia tonaight!
        brain#likestoniaght!# 

        brain tree in internet rain
        brain#tree#internet#
        (brain, in, rain)#(tree)#(internet)#
        brain
        */
        String[] words = {"time", "bell", "me"};
        int[] lengths = {4, 4, 2};
        // sort by length descending
        int length = words.length;
        String encoding = "#";
        //List<Integer> theseIndices = new ArrayList<Integer>();
        while(length > 0){
            String word = words[0];
            int thisLength = lengths[0];
            for(int i = 0; i < thisLength; i++){ //for all letters in these words
                char letter = word.charAt(thisLength - i);
                for(int j = 0; j < length; j++){ //for all words
                    if(lengths[j] >= thisLength){
                        char theirLetter = words[j].charAt(lengths[j] - thisLength);

                    }
                }
            }
        }
    }
}
