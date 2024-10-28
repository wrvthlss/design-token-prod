import StyleDictionary from 'style-dictionary';

// Register custom transforms and transform groups

// Validate hex and RGB(A) formats
const isValidColor = (value) => {
    const hexPattern = /^#([0-9A-F]{3,4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
    const rgbaPattern = /^rgba?\(\s*(\d{1,3}\s*,\s*){2,3}\d{1,3}\s*(,\s*\d(\.\d+)?\s*)?\)$/;
    console.log(`Validating color: ${value}`);
    return hexPattern.test(value) || rgbaPattern.test(value);
};

// Transform for colors with validation
StyleDictionary.registerTransform({
    name: 'color/validate',
    type: 'value',
    matcher: (token) => token.attributes && token.attributes.category === 'color',
    transformer: (token) => {
        if (!isValidColor(token.value)) {
            console.error(`Error: Token '${token.name}' has an invalid color value: '${token.value}'.`);
            throw new Error(`Invalid color format for token '${token.name}'`);
        }
        return token.value;
    }
});

// Validate dimensions to ensure they have units
const isValidDimension = (value) => {
    return typeof value === 'string' && /\d+(px|rem|em|%)$/.test(value);
};

// Transform for dimensions with validation
StyleDictionary.registerTransform({
    name: 'dimension/validate',
    type: 'value',
    matcher: (token) => token.attributes && token.attributes.category === 'dimension',
    transformer: (token) => {
        if (!isValidDimension(token.value)) {
            console.error(`Error: Token '${token.name}' has an invalid dimension value: '${token.value}'. Dimensions should have units (e.g., px, rem).`);
            throw new Error(`Invalid dimension format for token '${token.name}'`);
        }
        return token.value;
    }
});

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

StyleDictionary.registerTransformGroup({
    name: 'custom/css',
    transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'size/px',
        'size/rem',
        'color/validate',
        'dimension/validate'
    ]
});