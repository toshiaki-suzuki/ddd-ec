export type PhoneNumberErrorCode = 'VALUE_REQUIRED' | 'VALUE_INVALID';

export class InvalidPhoneNumberError extends Error {
  readonly code: PhoneNumberErrorCode;

  constructor(code: PhoneNumberErrorCode, message?: string) {
    super(message ?? code);
    this.name = 'InvalidPhoneNumberError';
    this.code = code;

    // ES5ターゲット時の prototype 問題対策
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
