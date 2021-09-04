export const NUMERAL_LITERALS = ['万', '億', '兆', '京', '垓', '𥝱'];

/**
 * 数値を大数に応じた数詞を用いた形式に変換する
 * 万進法で次の数詞の位になったら数字を丸める。
 * 小数点以下第3位までの表示とする
 * 例：1234567 → 123.45万
 * 例：123456789 → 1.234億
 */
export const convertDisplayUnits = (value: number): string => {
    const numberOfDigits = value.toString().split('.')[0].length;
    if (numberOfDigits < 5) {
        return value.toString();
    }

    for (let i = 0; i < NUMERAL_LITERALS.length; i += 1) {
        if (numberOfDigits >= 5 + i * 4 && numberOfDigits < 5 + (i + 1) * 4) {
            return `${(value / 10000 ** (i + 1)).toFixed(3)}${NUMERAL_LITERALS[i]}`;
        }
    }

    return value.toString();
};
