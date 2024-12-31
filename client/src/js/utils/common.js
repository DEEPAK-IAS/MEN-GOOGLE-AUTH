export function addValidationListeners(inputElement, validationFunction) {
  if (
    inputElement == null || 
    inputElement == undefined ||
    validationFunction == null ||
    validationFunction == undefined
  ) {
    throw new Error("Given inputElement or function is undefined or null");
  }

  inputElement.addEventListener("keyup", validationFunction);
  inputElement.addEventListener("change", validationFunction);
}