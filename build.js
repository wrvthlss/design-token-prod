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