import StringBuilder from "./StringBuilder";

type FlushType = 'wrap' | 'space' | 'empty';

export default class LineWrapper {
  private readonly out: RecordingStringBuilder;
  private readonly indent: string;
  private readonly columnLimit: bigint;
  private closed: boolean;

  private buffer: string[] = [];
  private column: number = 0;
  private indentLevel: number = -1;
  private nextFlush: FlushType;

  constructor(out: StringBuilder, indent: string, columnLimit: bigint) {
    if (!out) {
      throw new Error('out == null');
    }
    this.out = new RecordingStringBuilder(out);
    this.indent = indent;
    this.columnLimit = this.columnLimit;
  }

  lastChar(): string {
    return this.out.lastChar;
  }

  append(s: string) {
    if (closed) throw new Error('closed');

    if (this.nextFlush !== null) {
      const nextNewLine = s.indexOf('\n');
      if (nextNewLine === -1 && this.column + s.length <= this.columnLimit) {
        this.buffer.push(s);
        this.column += s.length;
        return;
      }
      const wrap = nextNewLine === -1 || this.column + nextNewLine > this.columnLimit;
      this.flush(wrap ? 'wrap' : this.nextFlush);
    }
    this.out.append(s);
    const lastNewLine = s.lastIndexOf('\n');
    this.column = lastNewLine !== -1 ? s.length - lastNewLine - 1 : this.column + s.length;
  }

  wrappingSpace(indentLevel: number) {
    if (closed) throw new Error('closed');

    if (this.nextFlush) {
      this.flush(this.nextFlush);
    }
    this.column++;
    this.nextFlush = 'space';
    this.indentLevel = indentLevel;
  }

  zeroWidthSpace(indentLevel: number) {
    if (closed) throw new Error('closed');

    if (this.column === 0) {
      return;
    }
    if (this.nextFlush) {
      this.flush(this.nextFlush);
    }
    this.indentLevel = indentLevel;
  }

  close() {
    if (this.nextFlush) {
      this.flush(this.nextFlush);
    }
    this.closed = true;
  }

  private flush(flushType: FlushType) {
    switch (flushType) {
      case 'wrap': {

      }
    }
  }
}

class RecordingStringBuilder {
  lastChar: string = '';
  delegate: StringBuilder;

  constructor(delegate: StringBuilder) {
    this.delegate = delegate;
  }

  public append(val: string): RecordingStringBuilder {
    if (val && val.length) {
      this.lastChar = val.charAt(val.length - 1);
    }
    this.delegate.append(val);
    return this;
  }
}