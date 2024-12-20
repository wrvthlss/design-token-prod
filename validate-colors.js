import { validateColorFormat } from './validators/color-validator.js';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Tokens Studio transforms
register(StyleDictionary);

const styleDictionary = new StyleDictionary({
  source: ['tokens/*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    web: {
      transformGroup: 'tokens-studio',
    },
  },
});

export async function validateColors() {
  const transformedTokens = await styleDictionary.getPlatformTokens('web');

  // Iterate over each token in the flattened array of all tokens
  transformedTokens.allTokens.forEach((token) => {
    if (token.type === 'color') {
      const isValid = validateColorFormat(token.value);
      process.stdout.write(
        `Validating color token '${token.name}' with value '${token.value}' - isValid: ${isValid}\n`,
      );
      if (!isValid) {
        process.stderr.write(
          `Validation Error: Invalid color format for token '${token.name}' with value '${token.value}'\n`,
        );
        throw new Error(`Color validation failed for token '${token.name}'`);
      }
    }
  });
}
