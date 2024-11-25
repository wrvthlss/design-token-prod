import StyleDictionary from 'style-dictionary';
import {
  register,
} from '@tokens-studio/sd-transforms';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import { validateColors } from './validate-colors.js';


// console.log('Build started...');
// console.log('\n==============================================');

try {
  // Register tokens-studio transforms (asynchronously)
  await register(StyleDictionary);

  //console.log('Tokens-studio Transforms Registered Successfully');

  await validateColors();

  StyleDictionary.registerTransform({
    name: 'stripUnits',
    type: 'value',
    filter: function (token) {
      return (
        (token.type === 'dimension' || token.type === 'fontSize') &&
        typeof token.value === 'string' &&
        token.value.match(/px|em|rem|%$/)
      );
    },
    transform: function (token) {
      return parseFloat(token.value);
    },
  });


  const sd = new StyleDictionary({
    log: {
      warnings: 'error', // 'warn' | 'error' | 'disabled'
      verbosity: 'verbose', // 'default' | 'silent' | 'verbose'
      errors: {
        brokenReferences: 'console', // 'throw' | 'console'
      },
    },
    source: ['tokens/*.json'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['ts/size/px', 'attribute/cti', 'name/kebab'],
        buildPath: 'build/web/',
        files: [
          {
            destination: 'variables.css',
            format: 'css/variables',
          },
        ],
      },
      json: {
        transformGroup: 'tokens-studio',
        transforms: ['attribute/cti', 'name/kebab'],
        buildPath: 'build/json/',
        files: [
          {
            destination: 'variables.json',
            format: 'json/flat',
          },
        ],
      },
      reactNative: {
        transformGroup: 'tokens-studio',
        transforms: ['stripUnits'],
        buildPath: 'build/react-native/',
        files: [
          {
            destination: 'variables.js',
            format: 'javascript/es6',
          },
        ],
      },
    },
  });

  await sd.buildAllPlatforms();

  // console.log('\n==============================================');
  // console.log('Build completed!');
} catch {
  // console.error('\n==============================================');
  // console.error('Error during build:\n');
  // console.error('Message:', error.message);
  // console.error('Stack:', error.stack);
  //
  // If the error is a Style Dictionary error with unresolved references
  // if (error.errors && error.errors.brokenReferences) {
  //   console.error('\nUnresolved References:');
  //   error.errors.brokenReferences.forEach((ref) => {
  //     console.error(`- ${ref}`);
  //   });
  // } else {
  //   console.error('An unexpected error occurred. Full error details:');
  //   console.error(error);
  // }

  // console.error('\n==============================================');
  process.exit(1);
}