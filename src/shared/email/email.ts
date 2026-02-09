import { InvalidEmailError } from './errors/invalidEmailError';

export class Email {
  private static readonly EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(public readonly value: string) {}

  static create(value: string): Email {
    const normalized = value.trim();

    if (!normalized) {
      throw new InvalidEmailError('VALUE_REQUIRED', 'Email is required');
    }

    if (!Email.EMAIL_PATTERN.test(normalized)) {
      throw new InvalidEmailError('VALUE_INVALID', 'Email format is invalid');
    }

    return new Email(normalized);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
