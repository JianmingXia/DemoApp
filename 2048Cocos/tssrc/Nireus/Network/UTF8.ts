declare const punycode: any;

const UTF8 = {
    _byteArray: new Uint8Array(0),
    _byteCount: 0,
    _byteIndex: 0,
    _stringFromCharCode: String.fromCharCode,
    checkScalarValue: (codePoint: number) => {
        if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
            throw Error(
                "Lone surrogate U+" + codePoint.toString(16).toUpperCase() +
                " is not a scalar value"
            );
        }
    },
    createByte(codePoint: number, shift: number) {
        return UTF8._stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
    },

    decodeSymbol: () => {
        let byte1: number;
        let byte2: number;
        let byte3: number;
        let byte4: number;
        let codePoint;

        if (UTF8._byteIndex > UTF8._byteCount) {
            throw Error("Invalid byte index");
        }

        if (UTF8._byteIndex === UTF8._byteCount) {
            return false;
        }

        // Read first byte
        byte1 = UTF8._byteArray[UTF8._byteIndex] & 0xFF;
        UTF8._byteIndex++;

        // 1-byte sequence (no continuation bytes)
        if ((byte1 & 0x80) === 0) {
            return byte1;
        }

        // 2-byte sequence
        if ((byte1 & 0xE0) === 0xC0) {
            byte2 = UTF8.readContinuationByte();
            codePoint = ((byte1 & 0x1F) << 6) | byte2;
            if (codePoint >= 0x80) {
                return codePoint;
            } else {
                throw Error("Invalid continuation byte");
            }
        }

        // 3-byte sequence (may include unpaired surrogates)
        if ((byte1 & 0xF0) === 0xE0) {
            byte2 = UTF8.readContinuationByte();
            byte3 = UTF8.readContinuationByte();
            codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
            if (codePoint >= 0x0800) {
                UTF8.checkScalarValue(codePoint);
                return codePoint;
            } else {
                throw Error("Invalid continuation byte");
            }
        }

        // 4-byte sequence
        if ((byte1 & 0xF8) === 0xF0) {
            byte2 = UTF8.readContinuationByte();
            byte3 = UTF8.readContinuationByte();
            byte4 = UTF8.readContinuationByte();
            codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
                (byte3 << 0x06) | byte4;
            if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
                return codePoint;
            }
        }

        throw Error("Invalid UTF-8 detected");
    },

    encodeCodePoint: (codePoint: number) => {
        if ((codePoint & 0xFFFFFF80) === 0) { // 1-byte sequence
            return UTF8._stringFromCharCode(codePoint);
        }

        let symbol = "";
        if ((codePoint & 0xFFFFF800) === 0) { // 2-byte sequence
            symbol = UTF8._stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
        } else if ((codePoint & 0xFFFF0000) === 0) { // 3-byte sequence
            UTF8.checkScalarValue(codePoint);
            symbol = UTF8._stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
            symbol += UTF8.createByte(codePoint, 6);
        } else if ((codePoint & 0xFFE00000) === 0) { // 4-byte sequence
            symbol = UTF8._stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
            symbol += UTF8.createByte(codePoint, 12);
            symbol += UTF8.createByte(codePoint, 6);
        }

        symbol += UTF8._stringFromCharCode((codePoint & 0x3F) | 0x80);
        return symbol;
    },

    encode: (str: string) => {
        const codePoints: number[] = punycode.ucs2.decode(str);
        const length = codePoints.length;
        let index = -1;
        let byteString = "";
        while (++index < length) {
            byteString += UTF8.encodeCodePoint(codePoints[index]);
        }

        return byteString;
    },

    decode: (str: string): string => {
        UTF8._byteArray = punycode.ucs2.decode(str);
        UTF8._byteCount = UTF8._byteArray.length;
        UTF8._byteIndex = 0;

        let codePoints = [];
        let codePoint = UTF8.decodeSymbol();
        while (codePoint !== false) {
            codePoints.push(codePoint);

            codePoint = UTF8.decodeSymbol();
        }

        return punycode.ucs2.encode(codePoints);
    },

    readContinuationByte: () => {
        if (UTF8._byteIndex >= UTF8._byteCount) {
            throw Error("Invalid byte index");
        }

        let continuationByte = UTF8._byteArray[UTF8._byteIndex] & 0xFF;
        UTF8._byteIndex++;

        if ((continuationByte & 0xC0) === 0x80) {
            return continuationByte & 0x3F;
        }

        // If we end up here, it’s not a continuation byte
        throw Error("Invalid continuation byte");
    }
};

export default UTF8;
