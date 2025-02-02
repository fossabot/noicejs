export class BaseError extends Error {
  public message: string;
  public stack?: string;
  protected nested: Array<Error>;

  constructor(message: string, ...nested: Array<Error>) {
    super(message);

    this.message = message;
    this.nested = nested;
    this.stack = nested.reduce((cur, err, idx) => {
      const stack = err.stack !== undefined ? err.stack : '';
      const indented = stack.replace('\n', '\n  ');
      return `${cur}\n  caused by (${idx + 1}/${nested.length}):\n    ${indented}`;
    }, this.stack);
  }

  public cause(): Error | undefined {
    return this.nested[0];
  }

  get length() {
    return this.nested.length;
  }
}
