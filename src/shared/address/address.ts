import { InvalidAddressError } from './errors/invalidAddressError';

export interface AddressProps {
  postalCode: string;
  prefecture: string;
  city: string;
  line1: string;
  line2?: string;
}

export class Address {
  private constructor(
    public readonly postalCode: string,
    public readonly prefecture: string,
    public readonly city: string,
    public readonly line1: string,
    public readonly line2?: string,
  ) {}

  static create(data: AddressProps): Address {
    const postalCode = data.postalCode.trim();
    const prefecture = data.prefecture.trim();
    const city = data.city.trim();
    const line1 = data.line1.trim();
    const line2 = data.line2?.trim();

    if (!postalCode) {
      throw new InvalidAddressError(
        'POSTAL_CODE_REQUIRED',
        'Postal code is required',
      );
    }

    if (!/^\d{3}-?\d{4}$/.test(postalCode)) {
      throw new InvalidAddressError('POSTAL_CODE_INVALID', 'Postal code is invalid');
    }

    if (!prefecture) {
      throw new InvalidAddressError('PREFECTURE_REQUIRED', 'Prefecture is required');
    }

    if (!city) {
      throw new InvalidAddressError('CITY_REQUIRED', 'City is required');
    }

    if (!line1) {
      throw new InvalidAddressError('LINE1_REQUIRED', 'Line1 is required');
    }

    return new Address(postalCode, prefecture, city, line1, line2);
  }

  equals(other: Address): boolean {
    return JSON.stringify(this) === JSON.stringify(other);
  }
}
