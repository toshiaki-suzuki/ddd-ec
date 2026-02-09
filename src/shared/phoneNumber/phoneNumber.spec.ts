import { InvalidPhoneNumberError } from './errors/invalidPhoneNumberError';
import { PhoneNumber } from './phoneNumber';

const expectInvalidPhoneNumberError = (
  action: () => void,
  code: InvalidPhoneNumberError['code'],
  message: string,
): void => {
  try {
    action();
    fail('Expected InvalidPhoneNumberError to be thrown');
  } catch (error) {
    expect(error).toBeInstanceOf(InvalidPhoneNumberError);
    const domainError = error as InvalidPhoneNumberError;
    expect(domainError.code).toBe(code);
    expect(domainError.message).toBe(message);
  }
};

describe('PhoneNumber', () => {
  describe('create', () => {
    it('10桁の電話番号を作成できる', () => {
      const phoneNumber = PhoneNumber.create('0312345678');
      expect(phoneNumber.value).toBe('0312345678');
    });

    it('11桁の電話番号を作成できる', () => {
      const phoneNumber = PhoneNumber.create('09012345678');
      expect(phoneNumber.value).toBe('09012345678');
    });

    it('ハイフンや空白を除去して作成する', () => {
      const phoneNumber = PhoneNumber.create(' 090-1234-5678 ');
      expect(phoneNumber.value).toBe('09012345678');
    });

    it('空の場合はエラーをスローする', () => {
      expectInvalidPhoneNumberError(
        () => PhoneNumber.create('   '),
        'VALUE_REQUIRED',
        'Phone number is required',
      );
    });

    it('桁数が不正な場合はエラーをスローする', () => {
      expectInvalidPhoneNumberError(
        () => PhoneNumber.create('090123456'),
        'VALUE_INVALID',
        'Phone number format is invalid',
      );
    });

    it('数字以外を含む場合はエラーをスローする', () => {
      expectInvalidPhoneNumberError(
        () => PhoneNumber.create('090-1234-56ab'),
        'VALUE_INVALID',
        'Phone number format is invalid',
      );
    });
  });

  describe('equals', () => {
    it('値が同じ場合はtrueを返す', () => {
      const left = PhoneNumber.create('090-1234-5678');
      const right = PhoneNumber.create('09012345678');
      expect(left.equals(right)).toBe(true);
    });

    it('値が異なる場合はfalseを返す', () => {
      const left = PhoneNumber.create('09012345678');
      const right = PhoneNumber.create('0312345678');
      expect(left.equals(right)).toBe(false);
    });
  });
});
