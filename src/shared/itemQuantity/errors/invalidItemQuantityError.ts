export type ItemQuantityErrorCode =
    | 'VALUE_NOT_INTEGER'
    | 'VALUE_OUT_OF_RANGE'
    | 'ADDEND_NOT_INTEGER';

export class InvalidItemQuantityError extends Error {
    readonly code: ItemQuantityErrorCode;

    constructor(code: ItemQuantityErrorCode, message?: string) {
        super(message ?? code);
        this.name = 'InvalidItemQuantityError';
        this.code = code;

        // ES5ターゲット時の prototype 問題対策
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
