const Base64 = {
    encode: (str: string) => {
        return btoa(unescape(encodeURIComponent(str)));
    },
    decode: (str: string) => {
        return decodeURIComponent(escape(atob(str)));
    },
};

export const convertJsonToBase64 = (json: JSON): string => {
    return Base64.encode(JSON.stringify(json));
};

export const convertBase64ToJson = (string: string): JSON | false => {
    let result;
    try {
        result = JSON.parse(Base64.decode(string));
    } catch (e) {
        console.error('failed convert', e);
        return false;
    }
    return result;
};
