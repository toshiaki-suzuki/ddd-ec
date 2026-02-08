import { Money } from '../../shared/money/money';
import { InvalidProductError } from './errors/invalidProductError';
import { Product } from './product';

const expectInvalidProductError = (
  action: () => void,
  code: string,
  message: string,
): void => {
  try {
    action();
    fail('Expected InvalidProductError to be thrown');
  } catch (error) {
    expect(error).toBeInstanceOf(InvalidProductError);
    const domainError = error as InvalidProductError;
    expect(domainError.code).toBe(code);
    expect(domainError.message).toBe(message);
  }
};

describe('Product', () => {
  describe('create', () => {
    it('正常な値でProductを作成できること', () => {
      const product = Product.create({
        productId: 'P-001',
        name: 'Keyboard',
        price: Money.createJpy(9800),
        status: 'Active',
      });

      expect(product.productId).toBe('P-001');
      expect(product.name).toBe('Keyboard');
      expect(product.price.equals(Money.createJpy(9800))).toBe(true);
      expect(product.status).toBe('Active');
    });

    it('productIdが空の場合はエラーをスローすること', () => {
      expectInvalidProductError(
        () =>
          Product.create({
            productId: '   ',
            name: 'Keyboard',
            price: Money.createJpy(9800),
            status: 'Active',
          }),
        'PRODUCT_ID_REQUIRED',
        'Product id is required',
      );
    });

    it('nameが空の場合はエラーをスローすること', () => {
      expectInvalidProductError(
        () =>
          Product.create({
            productId: 'P-001',
            name: '   ',
            price: Money.createJpy(9800),
            status: 'Active',
          }),
        'NAME_REQUIRED',
        'Product name is required',
      );
    });
  });

  describe('canBePurchased', () => {
    it('Active商品は購入可能であること', () => {
      const product = Product.create({
        productId: 'P-001',
        name: 'Keyboard',
        price: Money.createJpy(9800),
        status: 'Active',
      });

      expect(product.canBePurchased()).toBe(true);
      expect(product.isActive()).toBe(true);
    });

    it('Inactive商品は購入不可であること', () => {
      const product = Product.create({
        productId: 'P-001',
        name: 'Keyboard',
        price: Money.createJpy(9800),
        status: 'Inactive',
      });

      expect(product.canBePurchased()).toBe(false);
      expect(product.isActive()).toBe(false);
    });
  });

  describe('status transition', () => {
    it('deactivateでInactiveに遷移できること', () => {
      const active = Product.create({
        productId: 'P-001',
        name: 'Keyboard',
        price: Money.createJpy(9800),
        status: 'Active',
      });

      const inactive = active.deactivate();
      expect(inactive.status).toBe('Inactive');
      expect(inactive.canBePurchased()).toBe(false);
    });

    it('activateでActiveに遷移できること', () => {
      const inactive = Product.create({
        productId: 'P-001',
        name: 'Keyboard',
        price: Money.createJpy(9800),
        status: 'Inactive',
      });

      const active = inactive.activate();
      expect(active.status).toBe('Active');
      expect(active.canBePurchased()).toBe(true);
    });
  });

  describe('equals', () => {
    it('同じproductIdなら他属性が異なってもtrueを返すこと', () => {
      const left = Product.create({
        productId: 'P-001',
        name: 'Keyboard',
        price: Money.createJpy(9800),
        status: 'Active',
      });
      const right = Product.create({
        productId: 'P-001',
        name: 'Keyboard Pro',
        price: Money.createJpy(12800),
        status: 'Inactive',
      });

      expect(left.equals(right)).toBe(true);
    });

    it('productIdが異なる場合はfalseを返すこと', () => {
      const left = Product.create({
        productId: 'P-001',
        name: 'Keyboard',
        price: Money.createJpy(9800),
        status: 'Active',
      });
      const right = Product.create({
        productId: 'P-002',
        name: 'Keyboard',
        price: Money.createJpy(9800),
        status: 'Active',
      });

      expect(left.equals(right)).toBe(false);
    });
  });
});
