export type EmailErrorCode = 'VALUE_REQUIRED' | 'VALUE_INVALID';

export class InvalidEmailError extends Error {
  readonly code: EmailErrorCode;

  constructor(code: EmailErrorCode, message?: string) {
    super(message ?? code);
    this.name = 'InvalidEmailError';
    this.code = code;

    // ES5ターゲット時の prototype 問題対策
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
