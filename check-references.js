import fs from 'fs';
import path from 'path';

// Helper function to read and parse JSON files
function readJson(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return null;
  }
}

// Recursively collect all token paths
function collectTokenPaths(tokens, prefix = '') {
  let paths = [];
  for (const key in tokens) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (
      typeof tokens[key] === 'object' &&
      tokens[key] !== null &&
      !tokens[key].value
    ) {
      paths = paths.concat(collectTokenPaths(tokens[key], fullPath));
    } else {
      paths.push(fullPath);
    }
  }
  return paths;
}

// Check if token values reference other tokens and validate them
function findDeadReferences(tokens, validPaths, prefix = '') {
  let deadReferences = [];
  for (const key in tokens) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (typeof tokens[key] === 'object' && tokens[key] !== null) {
      if (
        tokens[key].value &&
        typeof tokens[key].value === 'string' &&
        tokens[key].value.startsWith('{') &&
        tokens[key].value.endsWith('}')
      ) {
        const referencePath = tokens[key].value
          .slice(1, -1)
          .replace(/\s+/g, '')
          .replace(/\//g, '.');
        if (!validPaths.includes(referencePath)) {
          deadReferences.push({
            token: fullPath,
            reference: tokens[key].value,
          });
        }
      }
      // Recurse into nested objects
      deadReferences = deadReferences.concat(
        findDeadReferences(tokens[key], validPaths, fullPath),
      );
    }
  }
  return deadReferences;
}

// Main function
function main() {
  const tokenDir = path.resolve('tokens'); // Directory containing your token JSON files
  const files = fs
    .readdirSync(tokenDir)
    .filter((file) => file.endsWith('.json'));

  let allTokens = {};

  // Read and merge all token files
  for (const file of files) {
    const filePath = path.join(tokenDir, file);
    const fileTokens = readJson(filePath);
    if (fileTokens) {
      allTokens = { ...allTokens, ...fileTokens };
    }
  }

  // Collect all valid token paths
  const validPaths = collectTokenPaths(allTokens);

  // Find dead references
  const deadReferences = findDeadReferences(allTokens, validPaths);

  // Report results
  if (deadReferences.length > 0) {
    console.log('Dead references found:');
    deadReferences.forEach((ref) => {
      console.log(
        `- Token: ${ref.token} | Invalid Reference: ${ref.reference}`,
      );
    });
    process.exit(1); // Exit with an error code to signal failure
  } else {
    console.log('No dead references found. All references are valid!');
  }
}

main();
