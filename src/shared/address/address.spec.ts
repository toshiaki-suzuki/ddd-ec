import { Address } from './address';
import { InvalidAddressError } from './errors/invalidAddressError';

describe('Address', () => {
    describe('create', () => {
        it('正常な値でAddressを作成できること', () => {
            const address = Address.create({
                postalCode: '100-0001',
                prefecture: '東京都',
                city: '千代田区',
                line1: '千代田1-1',
                line2: 'ビル101',
            });
            expect(address.postalCode).toBe('100-0001');
            expect(address.prefecture).toBe('東京都');
            expect(address.city).toBe('千代田区');
            expect(address.line1).toBe('千代田1-1');
            expect(address.line2).toBe('ビル101');
        });

        it('line2なしでAddressを作成できること', () => {
            const address = Address.create({
                postalCode: '100-0001',
                prefecture: '東京都',
                city: '千代田区',
                line1: '千代田1-1',
            });
            expect(address.line2).toBeUndefined();
        });

        it('ハイフンなしの郵便番号でAddressを作成できること', () => {
            const address = Address.create({
                postalCode: '1000001',
                prefecture: '東京都',
                city: '千代田区',
                line1: '千代田1-1',
            });
            expect(address.postalCode).toBe('1000001');
        });

        it('すべてのフィールドから空白文字をトリムすること', () => {
            const address = Address.create({
                postalCode: ' 100-0001 ',
                prefecture: ' 東京都 ',
                city: ' 千代田区 ',
                line1: ' 千代田1-1 ',
                line2: ' ビル101 ',
            });
            expect(address.postalCode).toBe('100-0001');
            expect(address.prefecture).toBe('東京都');
            expect(address.city).toBe('千代田区');
            expect(address.line1).toBe('千代田1-1');
            expect(address.line2).toBe('ビル101');
        });

        it('不正な郵便番号フォーマットの場合InvalidAddressErrorをスローすること', () => {
            expect(() =>
                Address.create({
                    postalCode: '12345',
                    prefecture: '東京都',
                    city: '千代田区',
                    line1: '千代田1-1',
                }),
            ).toThrow(InvalidAddressError);
            expect(() =>
                Address.create({
                    postalCode: '12345',
                    prefecture: '東京都',
                    city: '千代田区',
                    line1: '千代田1-1',
                }),
            ).toThrow('Postal code is invalid');
        });

        it('都道府県が空の場合InvalidAddressErrorをスローすること', () => {
            expect(() =>
                Address.create({
                    postalCode: '100-0001',
                    prefecture: '',
                    city: '千代田区',
                    line1: '千代田1-1',
                }),
            ).toThrow(InvalidAddressError);
            expect(() =>
                Address.create({
                    postalCode: '100-0001',
                    prefecture: '',
                    city: '千代田区',
                    line1: '千代田1-1',
                }),
            ).toThrow('Prefecture is required');
        });

        it('市区町村が空の場合InvalidAddressErrorをスローすること', () => {
            expect(() =>
                Address.create({
                    postalCode: '100-0001',
                    prefecture: '東京都',
                    city: '',
                    line1: '千代田1-1',
                }),
            ).toThrow(InvalidAddressError);
            expect(() =>
                Address.create({
                    postalCode: '100-0001',
                    prefecture: '東京都',
                    city: '',
                    line1: '千代田1-1',
                }),
            ).toThrow('City is required');
        });

        it('番地が空の場合InvalidAddressErrorをスローすること', () => {
            expect(() =>
                Address.create({
                    postalCode: '100-0001',
                    prefecture: '東京都',
                    city: '千代田区',
                    line1: '',
                }),
            ).toThrow(InvalidAddressError);
            expect(() =>
                Address.create({
                    postalCode: '100-0001',
                    prefecture: '東京都',
                    city: '千代田区',
                    line1: '',
                }),
            ).toThrow('Line1 is required');
        });
    });

    describe('equals', () => {
        it('同じ住所の場合trueを返すこと', () => {
            const address1 = Address.create({
                postalCode: '100-0001',
                prefecture: '東京都',
                city: '千代田区',
                line1: '千代田1-1',
                line2: 'ビル101',
            });
            const address2 = Address.create({
                postalCode: '100-0001',
                prefecture: '東京都',
                city: '千代田区',
                line1: '千代田1-1',
                line2: 'ビル101',
            });
            expect(address1.equals(address2)).toBe(true);
        });

        it('異なる住所の場合falseを返すこと', () => {
            const address1 = Address.create({
                postalCode: '100-0001',
                prefecture: '東京都',
                city: '千代田区',
                line1: '千代田1-1',
            });
            const address2 = Address.create({
                postalCode: '100-0002',
                prefecture: '東京都',
                city: '千代田区',
                line1: '千代田1-1',
            });
            expect(address1.equals(address2)).toBe(false);
        });
    });
});
