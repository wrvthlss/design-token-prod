import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { validateColors } from './validate-colors.js';

// Register Tokens Studio transforms explicitly on the StyleDictionary instance
register(StyleDictionary, {
    excludeParentKeys: true,   // Example option for excluding parent keys in token files
    platform: 'css',           // Platform to apply the transforms for
    name: 'tokens-studio'
});

// Validate colors before building
await validateColors();

// Initialize Style Dictionary with configuration
const styleDictionary = new StyleDictionary({
    source: ['tokens/*.json'],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'build/css/',
            files: [
                {
                    destination: 'variables.css',
                    format: 'css/variables',
                },
            ],
        },
        json: {
            transformGroup: 'css',
            buildPath: 'build/json/',
            files: [
                {
                    destination: 'variables.json',
                    format: 'json/flat',
                },
            ],
        },
    },
    log: {
        verbosity: 'verbose',
        errors: {
            brokenReferences: 'throw',
        },
    },
});

// Clean all platforms and then build
await styleDictionary.cleanAllPlatforms();
await styleDictionary.buildAllPlatforms();

// import StyleDictionary from 'style-dictionary';
// import { register } from '@tokens-studio/sd-transforms';
// import { validateColors } from './validate-colors.js';
//
// // Register Tokens Studio transforms
// register(StyleDictionary);
//
// // Validate colors before building
// await validateColors();
//
// // Initialize Style Dictionary with configuration
// const styleDictionary = new StyleDictionary({
//     source: ['tokens/*.json'],
//     preprocessors: ['tokens-studio'],
//     platforms: {
//         css: {
//             transformGroup: 'tokens-studio',
//             buildPath: 'build/css/',
//             files: [
//                 {
//                     destination: 'variables.css',
//                     format: 'css/variables',
//                 },
//             ],
//         },
//         json: {
//             transformGroup: 'tokens-studio',
//             buildPath: 'build/json/',
//             files: [
//                 {
//                     destination: 'variables.json',
//                     format: 'json/flat',
//                 },
//             ],
//         },
//     },
// });
//
// // Build platforms
// await styleDictionary.buildAllPlatforms();
