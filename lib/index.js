'use strict';

const GetIntrinsicOrThrow = require('#intrinsics/GetIntrinsicOrThrow');
const HasIntrinsic = require('#intrinsics/HasIntrinsic');
const ObjectCreate = require('#primordials/ObjectCreate');
const ReflectDefineProperty = require('#primordials/ReflectDefineProperty');
const DW58Decode = require('./decode');
const DW58DecodeInt = require('./decodeInt');
const DW58DecodeInto = require('./decodeInto');
const DW58Encode = require('./encode');
const DW58EncodeInt = require('./encodeInt');
const DW58IsValid = require('./isValid');
const DW58Normalize = require('./normalize');
const DW58Validate = require('./validate');

const hasBigInt = HasIntrinsic('BigInt');

const DW58DecodeBigInt = hasBigInt ? require('./decodeBigInt') : undefined;
const DW58EncodeBigInt = hasBigInt ? require('./encodeBigInt') : undefined;

const ObjectPrototype = GetIntrinsicOrThrow('Object.prototype');
const SymbolToStringTag = GetIntrinsicOrThrow('@@toStringTag');

const DW58 = ObjectCreate(ObjectPrototype, {
  decode: {
    value: DW58Decode
  },
  decodeBigInt: {
    value: DW58DecodeBigInt
  },
  decodeInt: {
    value: DW58DecodeInt
  },
  decodeInto: {
    value: DW58DecodeInto
  },
  encode: {
    value: DW58Encode
  },
  encodeBigInt: {
    value: DW58EncodeBigInt
  },
  encodeInt: {
    value: DW58EncodeInt
  },
  isValid: {
    value: DW58IsValid
  },
  normalize: {
    value: DW58Normalize
  },
  validate: {
    value: DW58Validate
  }
});
ReflectDefineProperty(DW58, SymbolToStringTag, {
  value: 'DW58'
});

module.exports = DW58;
