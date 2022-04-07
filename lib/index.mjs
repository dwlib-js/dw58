import GetIntrinsicOrThrow from '#intrinsics/GetIntrinsicOrThrow';
import HasIntrinsic from '#intrinsics/HasIntrinsic';
import ObjectCreate from '#primordials/ObjectCreate';
import ReflectDefineProperty from '#primordials/ReflectDefineProperty';
import DW58Decode from './decode.mjs';
import DW58DecodeInt from './decodeInt.mjs';
import DW58DecodeInto from './decodeInto.mjs';
import DW58Encode from './encode.mjs';
import DW58EncodeInt from './encodeInt.mjs';
import DW58IsValid from './isValid.mjs';
import DW58Normalize from './normalize.mjs';
import DW58Validate from './validate.mjs';

const ImportFunction = async name => {
  const module = await import(`./${name}.mjs`);
  return module.default;
}

const hasBigInt = HasIntrinsic('BigInt');

const DW58DecodeBigInt = hasBigInt ? await ImportFunction('decodeBigInt') : undefined;
const DW58EncodeBigInt = hasBigInt ? await ImportFunction('encodeBigInt') : undefined;

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

export default DW58;
