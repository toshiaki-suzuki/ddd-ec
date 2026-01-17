import { InvalidItemQuantityError } from './errors/invalidItemQuantityError';

export class ItemQuantity {
    private static readonly MIN = 1;
    private static readonly MAX = 99;

    private constructor(public readonly value: number) { }

    static of(value: number): ItemQuantity {
        if (!Number.isInteger(value)) {
            throw new InvalidItemQuantityError('VALUE_NOT_INTEGER', 'ItemQuantity must be an integer');
        }
        if (value < ItemQuantity.MIN || value > ItemQuantity.MAX) {
            throw new InvalidItemQuantityError(
                'VALUE_OUT_OF_RANGE',
                `ItemQuantity must be between ${ItemQuantity.MIN} and ${ItemQuantity.MAX}`
            );
        }
        return new ItemQuantity(value);
    }

    increment(): ItemQuantity {
        return ItemQuantity.of(this.value + 1);
    }

    decrement(): ItemQuantity {
        return ItemQuantity.of(this.value - 1);
    }

    add(n: number): ItemQuantity {
        if (!Number.isInteger(n)) {
            throw new InvalidItemQuantityError('ADDEND_NOT_INTEGER', 'Addend must be an integer');
        }
        return ItemQuantity.of(this.value + n);
    }

    equals(other: ItemQuantity): boolean {
        return this.value === other.value;
    }
}