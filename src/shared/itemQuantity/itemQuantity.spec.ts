import { ItemQuantity } from './itemQuantity';
import { InvalidItemQuantityError } from './errors/invalidItemQuantityError';

describe('ItemQuantity', () => {
    describe('of', () => {
        it('有効な値でItemQuantityを作成できる', () => {
            const quantity = ItemQuantity.of(10);
            expect(quantity.value).toBe(10);
        });

        it('1未満の値の場合はエラーをスローする', () => {
            expect(() => ItemQuantity.of(0)).toThrow(InvalidItemQuantityError);
            try {
                ItemQuantity.of(0);
            } catch (error) {
                expect(error).toBeInstanceOf(InvalidItemQuantityError);
                expect((error as InvalidItemQuantityError).code).toBe('VALUE_OUT_OF_RANGE');
            }
        });

        it('99を超える値の場合はエラーをスローする', () => {
            expect(() => ItemQuantity.of(100)).toThrow(InvalidItemQuantityError);
            try {
                ItemQuantity.of(100);
            } catch (error) {
                expect(error).toBeInstanceOf(InvalidItemQuantityError);
                expect((error as InvalidItemQuantityError).code).toBe('VALUE_OUT_OF_RANGE');
            }
        });

        it('整数でない値の場合はエラーをスローする', () => {
            expect(() => ItemQuantity.of(10.5)).toThrow(InvalidItemQuantityError);
            try {
                ItemQuantity.of(10.5);
            } catch (error) {
                expect(error).toBeInstanceOf(InvalidItemQuantityError);
                expect((error as InvalidItemQuantityError).code).toBe('VALUE_NOT_INTEGER');
            }
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
            expect(() => quantity.increment()).toThrow(InvalidItemQuantityError);
            try {
                quantity.increment();
            } catch (error) {
                expect(error).toBeInstanceOf(InvalidItemQuantityError);
                expect((error as InvalidItemQuantityError).code).toBe('VALUE_OUT_OF_RANGE');
            }
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
            expect(() => quantity.decrement()).toThrow(InvalidItemQuantityError);
            try {
                quantity.decrement();
            } catch (error) {
                expect(error).toBeInstanceOf(InvalidItemQuantityError);
                expect((error as InvalidItemQuantityError).code).toBe('VALUE_OUT_OF_RANGE');
            }
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
            expect(() => quantity.add(2.5)).toThrow(InvalidItemQuantityError);
            try {
                quantity.add(2.5);
            } catch (error) {
                expect(error).toBeInstanceOf(InvalidItemQuantityError);
                expect((error as InvalidItemQuantityError).code).toBe('ADDEND_NOT_INTEGER');
            }
        });

        it('範囲を超える場合はエラーをスローする', () => {
            const quantity = ItemQuantity.of(50);
            expect(() => quantity.add(50)).toThrow(InvalidItemQuantityError);
            try {
                quantity.add(50);
            } catch (error) {
                expect(error).toBeInstanceOf(InvalidItemQuantityError);
                expect((error as InvalidItemQuantityError).code).toBe('VALUE_OUT_OF_RANGE');
            }
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
