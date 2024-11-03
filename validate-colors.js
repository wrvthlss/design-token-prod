import { validateColorFormat } from './validators/color-validator.js';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Tokens Studio transforms
await register(StyleDictionary);

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
            console.log(`Validating color token '${token.name}' with value '${token.value}' - isValid: ${isValid}`);
            if (!isValid) {
                console.error(`Validation Error: Invalid color format for token '${token.name}' with value '${token.value}'`);
                throw new Error(`Color validation failed for token '${token.name}'`);
            }
        }
    });
}

// Run the validateColors function independently
(async () => {
    try {
        await validateColors();
        console.log('Color validation completed successfully.');
        process.exit(0); // Exit with success
    } catch (error) {
        console.error('Color validation failed:', error);
        process.exit(1); // Exit with error code to stop further processing in CI/CD
    }
})();

/*
import { validateColorFormat } from './validators/color-validator.js';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Tokens Studio transforms
register(StyleDictionary);

const styleDictionary = new StyleDictionary({
    source: ['tokens/!*.json'],
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
            console.log(`Validating color token '${token.name}' with value '${token.value}' - isValid: ${isValid}`);
            if (!isValid) {
                console.error(`Validation Error: Invalid color format for token '${token.name}' with value '${token.value}'`);
                throw new Error(`Color validation failed for token '${token.name}'`);
            }
        }
    });
}
*/
