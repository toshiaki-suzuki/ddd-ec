export type AddressErrorCode =
    | 'POSTAL_CODE_REQUIRED'
    | 'POSTAL_CODE_INVALID'
    | 'PREFECTURE_REQUIRED'
    | 'CITY_REQUIRED'
    | 'LINE1_REQUIRED';

export class InvalidAddressError extends Error {
    readonly code: AddressErrorCode;

    constructor(code: AddressErrorCode, message?: string) {
        super(message ?? code);
        this.name = 'InvalidAddressError';
        this.code = code;

        // ES5ターゲット時の prototype 問題対策
        Object.setPrototypeOf(this, new.target.prototype);
    }
}