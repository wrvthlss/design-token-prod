import StyleDictionary from 'style-dictionary';
import {getTransforms, register, transformShadow} from '@tokens-studio/sd-transforms';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {validateColors} from "./validate-colors.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('Build started...');
console.log('\n==============================================');

try {
    // Register tokens-studio transforms (asynchronously)
    await register(StyleDictionary);

    console.log('Tokens-studio Transforms Registered Successfully');

    // Validate colors before building
    await validateColors();

    StyleDictionary.registerTransform({
        name: 'stripUnits',
        type: 'value',
        filter: function (token) {
            return (
            (token.type === 'dimension' || token.type ==='fontSize') &&
            typeof token.value === 'string' &&
                token.value.match(/px|em|rem|%$/)
            );
        },
        transform: function (token) {
            return parseFloat(token.value);
        }
    });


    // Initialize Style Dictionary instance with inlined configuration
    const sd = new StyleDictionary({
        source: ["tokens/*.json"],
        platforms: {
            css: {
                transformGroup: "tokens-studio",
                transforms: ['ts/size/px', 'attribute/cti', 'name/kebab'],
                buildPath: "build/web/",
                files: [
                    {
                        destination: "variables.css",
                        format: "css/variables"
                    }
                ]
            },
            json: {
                transformGroup: "tokens-studio",
                transforms:['attribute/cti', 'name/kebab'],
                buildPath: "build/json/",
                files: [
                    {
                        destination: "variables.json",
                        format: "json/flat"
                    }
                ]
            },
            reactNative: {
                transformGroup: 'tokens-studio',
                transforms: ['stripUnits'],
                buildPath: "build/react-native/",
                files: [
                    {
                        destination: "variables.js",
                        format: "javascript/es6"
                    }
                ]
            }
        }
    });

    await sd.buildAllPlatforms();
    console.log('\n==============================================');
    console.log('Build completed!');
} catch (error) {
    console.error("Error during build:", error);
    process.exit(1);
}
// import StyleDictionary from 'style-dictionary';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
//
// const __dirname = dirname(fileURLToPath(import.meta.url));
//
// console.log('Build started...');
// console.log('\n==============================================');
//
// // Register Custom Transforms with Correct "transform" Key
// try {
//     StyleDictionary.registerTransform({
//         name: 'size/px',
//         type: 'value',
//         filter: (token) => token.type === 'fontSize' || token.type === 'dimension',
//         transform: function (token) { return `${token.value}px`; }
//     });
//
//     StyleDictionary.registerTransform({
//         name: 'ratio/%',
//         type: 'value',
//         filter: (token) => token.type === 'ratio',
//         transform: function (token) { return `${Math.floor(100 * token.value)}%`; }
//     });
//
//     StyleDictionary.registerTransform({
//         name: 'hexRGB/hexARGB',
//         type: 'value',
//         filter: (token) => token.type === 'color',
//         transform: function (token) { return token.value.replace(/^#/, '#FF'); }
//     });
//
//     StyleDictionary.registerTransform({
//         name: 'unitless/sp',
//         type: 'value',
//         filter: (token) => token.type === 'fontSize',
//         transform: function (token) { return `${token.value}sp`; }
//     });
//
//     StyleDictionary.registerTransform({
//         name: 'name/squiggle',
//         type: 'name',
//         transform: function (token) { return token.path.join('~'); }
//     });
//
//     console.log('Custom Transforms Registered Successfully');
//
//     // Register Custom Transform Groups
//     StyleDictionary.registerTransformGroup({
//         name: 'custom/web',
//         transforms: ['attribute/cti', 'size/px', 'color/css', 'ratio/%']
//     });
//
//     StyleDictionary.registerTransformGroup({
//         name: 'custom/reactNative',
//         transforms: ['attribute/cti', 'name/squiggle', 'hexRGB/hexARGB', 'unitless/sp']
//     });
//
//     console.log('Custom Transform Groups Registered Successfully');
// } catch (error) {
//     console.error("Failed to register custom transforms or transform group:", error);
// }
//
// // Initialize Style Dictionary with configuration
// const sd = new StyleDictionary(`${__dirname}/config.json`);
// await sd.hasInitialized;
//
// try {
//     await sd.buildAllPlatforms();
//     console.log('\n==============================================');
//     console.log('Build completed!');
// } catch (error) {
//     console.error("Error during build:", error);
//     process.exit(1);
// }
//

// Continue with the rest of your code for custom transforms

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
