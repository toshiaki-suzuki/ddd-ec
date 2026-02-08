import { ItemQuantity } from './itemQuantity';
import { InvalidItemQuantityError } from './errors/invalidItemQuantityError';

const expectInvalidItemQuantityError = (
    action: () => void,
    code: InvalidItemQuantityError['code'],
    message: string,
): void => {
    try {
        action();
        fail('Expected InvalidItemQuantityError to be thrown');
    } catch (error) {
        expect(error).toBeInstanceOf(InvalidItemQuantityError);
        const domainError = error as InvalidItemQuantityError;
        expect(domainError.code).toBe(code);
        expect(domainError.message).toBe(message);
    }
};

describe('ItemQuantity', () => {
    describe('of', () => {
        it('有効な値でItemQuantityを作成できる', () => {
            const quantity = ItemQuantity.of(10);
            expect(quantity.value).toBe(10);
        });

        it('1未満の値の場合はエラーをスローする', () => {
            expectInvalidItemQuantityError(
                () => ItemQuantity.of(0),
                'VALUE_OUT_OF_RANGE',
                'ItemQuantity must be between 1 and 99',
            );
        });

        it('99を超える値の場合はエラーをスローする', () => {
            expectInvalidItemQuantityError(
                () => ItemQuantity.of(100),
                'VALUE_OUT_OF_RANGE',
                'ItemQuantity must be between 1 and 99',
            );
        });

        it('整数でない値の場合はエラーをスローする', () => {
            expectInvalidItemQuantityError(
                () => ItemQuantity.of(10.5),
                'VALUE_NOT_INTEGER',
                'ItemQuantity must be an integer',
            );
        });

        it('境界値を受け入れる', () => {
            const min = ItemQuantity.of(1);
            const max = ItemQuantity.of(99);
            expect(min.value).toBe(1);
            expect(max.value).toBe(99);
        });
    });

    describe('increment', () => {
        it('数量を1増やすことができる', () => {
            const quantity = ItemQuantity.of(10);
            const result = quantity.increment();
            expect(result.value).toBe(11);
        });

        it('最大値を超える場合はエラーをスローする', () => {
            const quantity = ItemQuantity.of(99);
            expectInvalidItemQuantityError(
                () => quantity.increment(),
                'VALUE_OUT_OF_RANGE',
                'ItemQuantity must be between 1 and 99',
            );
        });
    });

    describe('decrement', () => {
        it('数量を1減らすことができる', () => {
            const quantity = ItemQuantity.of(10);
            const result = quantity.decrement();
            expect(result.value).toBe(9);
        });

        it('最小値を下回る場合はエラーをスローする', () => {
            const quantity = ItemQuantity.of(1);
            expectInvalidItemQuantityError(
                () => quantity.decrement(),
                'VALUE_OUT_OF_RANGE',
                'ItemQuantity must be between 1 and 99',
            );
        });
    });

    describe('add', () => {
        it('指定した数を加算できる', () => {
            const quantity = ItemQuantity.of(10);
            const result = quantity.add(5);
            expect(result.value).toBe(15);
        });

        it('負の数を加算できる', () => {
            const quantity = ItemQuantity.of(10);
            const result = quantity.add(-3);
            expect(result.value).toBe(7);
        });

        it('整数でない値の場合はエラーをスローする', () => {
            const quantity = ItemQuantity.of(10);
            expectInvalidItemQuantityError(
                () => quantity.add(2.5),
                'ADDEND_NOT_INTEGER',
                'Addend must be an integer',
            );
        });

        it('範囲を超える場合はエラーをスローする', () => {
            const quantity = ItemQuantity.of(50);
            expectInvalidItemQuantityError(
                () => quantity.add(50),
                'VALUE_OUT_OF_RANGE',
                'ItemQuantity must be between 1 and 99',
            );
        });
    });

    describe('equals', () => {
        it('等しいItemQuantityの場合はtrueを返す', () => {
            const quantity1 = ItemQuantity.of(10);
            const quantity2 = ItemQuantity.of(10);
            expect(quantity1.equals(quantity2)).toBe(true);
        });

        it('異なるItemQuantityの場合はfalseを返す', () => {
            const quantity1 = ItemQuantity.of(10);
            const quantity2 = ItemQuantity.of(20);
            expect(quantity1.equals(quantity2)).toBe(false);
        });
    });
});
