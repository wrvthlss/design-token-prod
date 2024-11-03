export function validateColorFormat(color) {
  const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

  const rgbaPattern =
    /^rgba?\(\s*(\d{1,3}\s*,\s*){2,3}\d{1,3}\s*(,\s*\d(\.\d+)?\s*)?\)$/i;
  const gradientPattern =
    /^linear-gradient\(\s*(\d{1,3}deg,\s*)?(#[0-9A-Fa-f]{3,8}|rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(,\s*\d(\.\d+)?)?\s*\))(\s+\d{1,3}%?)?(,\s*(#[0-9A-Fa-f]{3,8}|rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(,\s*\d(\.\d+)?)?\s*\))(\s+\d{1,3}%?)?)*\s*\)$/i;

  const isValid =
    hexPattern.test(color) ||
    rgbaPattern.test(color) ||
    gradientPattern.test(color);

  // Replace console.log with process.stderr.write for error/debug logging
  process.stderr.write(`Validating color: ${color} - isValid: ${isValid}\n`);

  return isValid;
}
