public class Pair<T extends Comparable<T>, U> implements Comparable<Pair<T, U>> { //generic pair tuple for any types
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

