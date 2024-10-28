import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Tokens Studio transforms
register(StyleDictionary);

// Initialize Style Dictionary with configuration using 'new'
const styleDictionary = new StyleDictionary({
    source: ['tokens/*.json'],
    preprocessors: ['tokens-studio'],
    platforms: {
        css: {
            transformGroup: 'tokens-studio',
            buildPath: 'build/css/',
            files: [
                {
                    destination: 'variables.css',
                    format: 'css/variables',
                },
            ],
        },
        json: {
            transformGroup: 'tokens-studio',
            buildPath: 'build/json/',
            files: [
                {
                    destination: 'variables.json',
                    format: 'json/flat',
                },
            ],
        },
    },
});

// Build platforms
await styleDictionary.buildAllPlatforms();
