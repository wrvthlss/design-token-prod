import StyleDictionary from 'style-dictionary';

// Transform for font sizes, logging output to validate each token processed
StyleDictionary.registerTransform({
    name: 'size/px',
    type: 'value',
    matcher: function (token) {
        console.log('Processing fontSize token:', token);
        return token.attributes && token.attributes.category === 'fontSize';
    },
    transformer: function (token) {
        return `${token.value}px`;
    }
});

// Transform for spacing, with added logging
StyleDictionary.registerTransform({
    name: 'size/rem',
    type: 'value',
    matcher: function (token) {
        console.log('Processing spacing token:', token);
        return token.attributes && token.attributes.category === 'spacing';
    },
    transformer: function (token) {
        return `${token.value}rem`;
    }
});

// Register custom transform group
StyleDictionary.registerTransformGroup({
    name: 'custom/css',
    transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'size/rem']
});
