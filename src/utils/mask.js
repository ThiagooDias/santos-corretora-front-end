export const applyMask = (value, pattern) => {
  value = value.replace(/\D/g, "");
  let maskedValue = "";
  let valueIndex = 0;
  
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === "#") {
      if (value[valueIndex]) {
        maskedValue += value[valueIndex];
        valueIndex++;
      } else {
        break;
      }
    } else {
      if (valueIndex < value.length) {
        maskedValue += pattern[i];
      }
    }
  }
  return maskedValue;
};