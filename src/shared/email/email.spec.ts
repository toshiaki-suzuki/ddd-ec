import { Email } from './email';
import { InvalidEmailError } from './errors/invalidEmailError';

const expectInvalidEmailError = (
  action: () => void,
  code: InvalidEmailError['code'],
  message: string,
): void => {
  try {
    action();
    fail('Expected InvalidEmailError to be thrown');
  } catch (error) {
    expect(error).toBeInstanceOf(InvalidEmailError);
    const domainError = error as InvalidEmailError;
    expect(domainError.code).toBe(code);
    expect(domainError.message).toBe(message);
  }
};

describe('Email', () => {
  describe('create', () => {
    it('正常なメールアドレスを作成できる', () => {
      const email = Email.create('alice@example.com');
      expect(email.value).toBe('alice@example.com');
    });

    it('前後の空白をトリムする', () => {
      const email = Email.create('  alice@example.com  ');
      expect(email.value).toBe('alice@example.com');
    });

    it('空の場合はエラーをスローする', () => {
      expectInvalidEmailError(
        () => Email.create('   '),
        'VALUE_REQUIRED',
        'Email is required',
      );
    });

    it('フォーマット不正の場合はエラーをスローする', () => {
      expectInvalidEmailError(
        () => Email.create('alice.example.com'),
        'VALUE_INVALID',
        'Email format is invalid',
      );
    });
  });

  describe('equals', () => {
    it('値が同じ場合はtrueを返す', () => {
      const left = Email.create('alice@example.com');
      const right = Email.create('alice@example.com');
      expect(left.equals(right)).toBe(true);
    });

    it('値が異なる場合はfalseを返す', () => {
      const left = Email.create('alice@example.com');
      const right = Email.create('bob@example.com');
      expect(left.equals(right)).toBe(false);
    });
  });
});
