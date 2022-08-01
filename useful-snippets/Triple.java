public class Triple<T extends Comparable<T>, U extends Comparable<U>, V> implements Comparable<Triple<T, U, V>>{
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
