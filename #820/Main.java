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
        String[] words = {"time", "me"};
        // sort by length descending
        int length = words.length;
        String encoding = "#";
        //List<Integer> theseIndices = new ArrayList<Integer>();
        while(length > 0){
            String word = words[0];
            int thisLength = word.length();
            for(int i = 0; i < thisLength; i++){ //for all letters in these words
                char letter = word.charAt(thisLength - i - 1);
                for(int j = 0; j < length; j++){ //for all words
                    if(words[j].length() - i > 0){
                        char theirLetter = words[j].charAt(words[j].length() - i);
                        if(letter == theirLetter){
                            System.out.println("Common letter '" + theirLetter + "'.");
                        }
                    }
                }
            }
            length = 0;
        }
    }
}
