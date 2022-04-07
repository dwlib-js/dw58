import GetIntrinsicOrThrow from '#intrinsics/GetIntrinsicOrThrow';
import ArrayForEach from '#primordials/ArrayForEach';
import FunctionBind from '#primordials/FunctionBind';
import Map from '#primordials/Map';
import MapSet from '#primordials/MapSet';
import ALPHABET from './ALPHABET.mjs';

const MapPrototypeGet = GetIntrinsicOrThrow('Map.prototype.get');

const ALPHABET_LOOKUP = new Map();

for (let i = 0; i < 58; i++) {
  const char = ALPHABET[i];
  MapSet(ALPHABET_LOOKUP, char, i);
}

const AlphabetIndexOf = FunctionBind(MapPrototypeGet, ALPHABET_LOOKUP);

ArrayForEach([
  ['o', '0O'],
  ['1', 'Il']
], entry => {
  const char = entry[0];
  const aliases = entry[1];
  const charIndex = AlphabetIndexOf(char);
  for (let i = 0; i < 2; i++) {
    const alias = aliases[i];
    MapSet(ALPHABET_LOOKUP, alias, charIndex);
  }
});

export default AlphabetIndexOf;
