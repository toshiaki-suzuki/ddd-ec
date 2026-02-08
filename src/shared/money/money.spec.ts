import { Money } from './money';
import { InvalidMoneyError } from './errors/invalidMoneyError';

const expectInvalidMoneyError = (
    action: () => void,
    code: InvalidMoneyError['code'],
    message: string,
): void => {
    try {
        action();
        fail('Expected InvalidMoneyError to be thrown');
    } catch (error) {
        expect(error).toBeInstanceOf(InvalidMoneyError);
        const domainError = error as InvalidMoneyError;
        expect(domainError.code).toBe(code);
        expect(domainError.message).toBe(message);
    }
};

describe('Money', () => {
    describe('createJpy', () => {
        it('有効な金額でMoneyを作成できる', () => {
            const money = Money.createJpy(1000);
            expect(money.amount).toBe(1000);
            expect(money.currency).toBe('JPY');
        });

        it('負の金額の場合はエラーをスローする', () => {
            expectInvalidMoneyError(
                () => Money.createJpy(-100),
                'AMOUNT_NEGATIVE',
                'Money amount cannot be negative',
            );
        });

        it('整数でない金額の場合はエラーをスローする', () => {
            expectInvalidMoneyError(
                () => Money.createJpy(100.5),
                'AMOUNT_NOT_INTEGER',
                'Money amount must be an integer',
            );
        });

        it('ゼロを受け入れる', () => {
            const money = Money.createJpy(0);
            expect(money.amount).toBe(0);
        });
    });

    describe('add', () => {
        it('2つのMoneyオブジェクトを加算できる', () => {
            const money1 = Money.createJpy(1000);
            const money2 = Money.createJpy(500);
            const result = money1.add(money2);
            expect(result.amount).toBe(1500);
        });

        it('通貨が一致しない場合はエラーをスローする', () => {
            const money1 = Money.createJpy(1000);
            const money2 = Money.createJpy(500);
            // 現在はJPYのみなので、この動作を確認するためのテストは省略
            // 将来的に他の通貨が追加された場合に追加
        });
    });

    describe('subtract', () => {
        it('2つのMoneyオブジェクトを減算できる', () => {
            const money1 = Money.createJpy(1000);
            const money2 = Money.createJpy(300);
            const result = money1.subtract(money2);
            expect(result.amount).toBe(700);
        });

        it('負の結果を許容する', () => {
            const money1 = Money.createJpy(500);
            const money2 = Money.createJpy(1000);
            const result = money1.subtract(money2);
            expect(result.amount).toBe(-500);
        });
    });

    describe('isZero', () => {
        it('金額がゼロの場合はtrueを返す', () => {
            const money = Money.createJpy(0);
            expect(money.isZero()).toBe(true);
        });

        it('金額がゼロでない場合はfalseを返す', () => {
            const money = Money.createJpy(100);
            expect(money.isZero()).toBe(false);
        });
    });

    describe('equals', () => {
        it('等しいMoneyオブジェクトの場合はtrueを返す', () => {
            const money1 = Money.createJpy(1000);
            const money2 = Money.createJpy(1000);
            expect(money1.equals(money2)).toBe(true);
        });

        it('金額が異なる場合はfalseを返す', () => {
            const money1 = Money.createJpy(1000);
            const money2 = Money.createJpy(500);
            expect(money1.equals(money2)).toBe(false);
        });
    });
});
