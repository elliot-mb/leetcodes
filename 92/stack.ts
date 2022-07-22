class Stack {
  private xs: number[]
  private top: number
  constructor(xs?: number[]){
    this.xs = (xs===undefined ? [] : xs);
    this.top = (xs===undefined ? -1 : xs.length - 1);
  }

  public push(x: number) : void{
    this.top++;
    this.xs[this.top] = x;
  }

  public pop() : number | null{
    if(this.isEmpty()) { return null; }
    this.top--;
    return this.xs[this.top + 1];
  }

  public isEmpty() : boolean {
    return this.top === -1;
  }

  public show() : string {
    return `${this.xs}`;
  }
}