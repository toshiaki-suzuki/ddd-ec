import { InvalidPhoneNumberError } from './errors/invalidPhoneNumberError';

export class PhoneNumber {
  private static readonly NORMALIZED_PATTERN = /^\d{10,11}$/;

  private constructor(public readonly value: string) {}

  static create(value: string): PhoneNumber {
    const trimmed = value.trim();

    if (!trimmed) {
      throw new InvalidPhoneNumberError(
        'VALUE_REQUIRED',
        'Phone number is required',
      );
    }

    const normalized = trimmed.replace(/[\s-]/g, '');
    if (!PhoneNumber.NORMALIZED_PATTERN.test(normalized)) {
      throw new InvalidPhoneNumberError(
        'VALUE_INVALID',
        'Phone number format is invalid',
      );
    }

    return new PhoneNumber(normalized);
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }
}
