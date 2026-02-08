export type MoneyErrorCode =
    | 'AMOUNT_NEGATIVE'
    | 'AMOUNT_NOT_INTEGER'
    | 'CURRENCY_MISMATCH'
    | 'SUBTRACTION_RESULT_NEGATIVE';

export class InvalidMoneyError extends Error {
    readonly code: MoneyErrorCode;

    constructor(code: MoneyErrorCode, message?: string) {
        super(message ?? code);
        this.name = 'InvalidMoneyError';
        this.code = code;

        // ES5ターゲット時の prototype 問題対策
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
