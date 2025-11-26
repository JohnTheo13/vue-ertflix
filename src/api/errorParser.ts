export class ParsedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParsedError';
  }
}

/**
 * @description Parses an unknown error into a ParsedError.
 * @param {unknown} error - The error to parse.
 * @returns {ParsedError} The parsed error.
 */
export function parseError(error: unknown): ParsedError {
  if (error instanceof Error) {
    return new ParsedError(error.message);
  } else if (typeof error === 'string') {
    return new ParsedError(error);
  } else {
    return new ParsedError('An unknown error occurred');
  }
}
