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

export function isCookieSet(cookieName) {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith(`${cookieName}=`));
}

export function getCookieObject(cookieName) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`));
  if (cookie) {
    try {
      return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    } catch (error) {
      return null;
    }
  }
  return null;
}
