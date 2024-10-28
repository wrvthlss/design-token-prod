import StyleDictionary from 'style-dictionary';

// Register custom transforms and transform groups

// Transform for fontSize
StyleDictionary.registerTransform({
    name: 'size/px',
    type: 'value',
    matcher: (token) => token.attributes && token.attributes.category === 'fontSize',
    transformer: (token) => `${token.value}px`
});

// Transform for spacing
StyleDictionary.registerTransform({
    name: 'size/rem',
    type: 'value',
    matcher: (token) => token.attributes && token.attributes.category === 'spacing',
    transformer: (token) => `${token.value}rem`
});

// Registering custom transform group
StyleDictionary.registerTransformGroup({
    name: 'custom/css',
    transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'size/rem']
});
