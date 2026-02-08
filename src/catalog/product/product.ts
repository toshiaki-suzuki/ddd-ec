import { Money } from '../../shared/money/money';
import { InvalidProductError } from './errors/invalidProductError';

export type ProductStatus = 'Active' | 'Inactive';

export interface ProductProps {
  productId: string;
  name: string;
  price: Money;
  status: ProductStatus;
}

export class Product {
  private constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: Money,
    public readonly status: ProductStatus,
  ) {}

  static create(props: ProductProps): Product {
    const productId = props.productId.trim();
    const name = props.name.trim();

    if (!productId) {
      throw new InvalidProductError(
        'PRODUCT_ID_REQUIRED',
        'Product id is required',
      );
    }

    if (!name) {
      throw new InvalidProductError('NAME_REQUIRED', 'Product name is required');
    }

    if (props.status !== 'Active' && props.status !== 'Inactive') {
      throw new InvalidProductError(
        'STATUS_INVALID',
        'Product status must be Active or Inactive',
      );
    }

    return new Product(productId, name, props.price, props.status);
  }

  canBePurchased(): boolean {
    return this.status === 'Active';
  }

  isActive(): boolean {
    return this.status === 'Active';
  }

  activate(): Product {
    if (this.status === 'Active') {
      return this;
    }
    return new Product(this.productId, this.name, this.price, 'Active');
  }

  deactivate(): Product {
    if (this.status === 'Inactive') {
      return this;
    }
    return new Product(this.productId, this.name, this.price, 'Inactive');
  }

  equals(other: Product): boolean {
    return this.productId === other.productId;
  }
}
