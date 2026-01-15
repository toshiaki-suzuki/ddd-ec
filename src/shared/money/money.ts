import { InvalidMoneyError } from './errors/invalidMoneyError';

export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: 'JPY',
  ) { }

  static createJpy(amount: number): Money {
    if (amount < 0) {
      throw new InvalidMoneyError('AMOUNT_NEGATIVE', 'Money amount cannot be negative');
    }
    if (!Number.isInteger(amount)) {
      throw new InvalidMoneyError('AMOUNT_NOT_INTEGER', 'Money amount must be an integer');
    }
    return new Money(amount, 'JPY');
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new InvalidMoneyError('CURRENCY_MISMATCH', 'Currency mismatch');
    }
  }
}