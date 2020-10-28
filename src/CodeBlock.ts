

export class CodeBlock {
  private static readonly NAMED_ARGUMENT = /\$(?<argumentName>[\w_]+):(?<typeChar>[\w]).*/;
  private static readonly LOWER_CASE = /[a-z]+[\w_]*/;

  readonly formatParts: string[];
  readonly args: any[];

  constructor(input: { formatParts: string[], args: any[] }) {
    this.formatParts = input.formatParts;
    this.args = input.args;
  }


}