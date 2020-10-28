export default class StringBuilder {
  private strings: string[] = [];

  public append(val: string): StringBuilder {
    this.strings.push(val);
    return this;
  }

  public toString(): string {
    return this.strings.join("");
  }
}