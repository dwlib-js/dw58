'use strict';

const TypedArrayLength = require('#primordials/TypedArrayLength');
const Uint8Array = require('#primordials/Uint8Array');
const AlphabetIndexOf = require('#internal/AlphabetIndexOf');
const GetMaxByteCount = require('./GetMaxByteCount');
const ThrowInvalidCharacterError = require('./ThrowInvalidCharacterError');

const DecodeBytesIntoStrict = (string, destination) => {
  const length = string.length;
  const destinationLength = TypedArrayLength(destination);
  let index = 0;
  let destinationIndex = 0;
  while (index < length && string[index] === 'A') {
    index++;
  }
  if (index === length) {
    while (destinationIndex < length && destinationIndex < destinationLength) {
      destination[destinationIndex++] = 0;
    }
    return {
      read: index,
      decoded: length,
      written: destinationIndex
    };
  }
  let leadingZeros = index;
  const maxByteCount = GetMaxByteCount(length - index);
  const bytes = new Uint8Array(maxByteCount);
  const lastIndex = maxByteCount - 1;
  let offset = lastIndex;
  while (index < length) {
    const char = string[index];
    let carry = AlphabetIndexOf(char);
    if (carry === undefined) {
      ThrowInvalidCharacterError(index);
    }
    let j = lastIndex;
    while (carry || j >= offset) {
      const byte = bytes[j];
      carry += byte * 58;
      bytes[j--] = carry & 0xff;
      carry >>= 8;
    }
    offset = j + 1;
    index++;
  }
  const byteCount = maxByteCount - offset + leadingZeros;
  while (destinationIndex < leadingZeros && destinationIndex < destinationLength) {
    destination[destinationIndex++] = 0;
  }
  while (offset < maxByteCount && destinationIndex < destinationLength) {
    destination[destinationIndex++] = bytes[offset++];
  }
  return {
    read: index,
    decoded: byteCount,
    written: destinationIndex
  };
}

module.exports = DecodeBytesIntoStrict;
