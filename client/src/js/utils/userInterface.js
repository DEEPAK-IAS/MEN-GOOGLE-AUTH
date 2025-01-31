import validator from "./Validator.js";

export function toggleIcon(imgElement, oldPath, newPath) {
  if (imgElement == undefined || imgElement == null) {
    throw new Error("Given imgElement is null or undefined");
  }

  if (imgElement.src.match(oldPath))
    imgElement.src = newPath;
  else 
    imgElement.src = oldPath;
}

export function toggleType(element, oldType, newType) {
  if (element == undefined || element == null) {
    throw new Error("Given element is null or undefined");
  }
  if (element.type.match(oldType))
    element.type = newType;
  else 
    element.type = oldType;
}


export function setMessage(element, message) {
  if (element == null || element == undefined) {
    throw new Error("Given element is null or undefined");
  }
  element.innerText = message;
}

export function setBorder(element, cssValue) {
  if (element == null || element == undefined) {
    throw new Error("Given element is null or undefined");
  }
  element.style.border = cssValue;
}


export function moveToNext(current, nextId) {
  if (current.value.length == 1) {
      const nextInput = document.getElementById(nextId);
      if (nextInput) {
          nextInput.focus();
      }
  }
}



export function validateNameAndUpdateUI(e) {
  const name = e.target.value;
  const { isValid, message } = validator.isValidName(name);
  const errorElement = e.target.parentElement.querySelector(".err-element");

  if (!isValid) {
    setBorder(e.target, "2px solid red");
    setMessage(errorElement, `${message} . . . .`)
    return false;
  } 

  setBorder(e.target, "2px solid grey");
  setMessage(errorElement, "");
  return true;
}


export function validateEmailAndUpdateUI(e) {
  const email = e.target.value;
  const { isValid, message } = validator.isValidEmail(email);
  const errorElement = e.target.parentElement.querySelector(".err-element");

  if (!isValid) {
    setBorder(e.target, "2px solid red");
    setMessage(errorElement, `${message} . . . .`)
    return false;
  }

  setBorder(e.target, "2px solid grey");
  setMessage(errorElement, "");
  return true;
}


export function validatePasswordAndUpdateUI(e) {
  const password = e.target.value;
  const { isValid, message } = validator.isValidPassword(password);
  const errorElement = e.target.parentElement.querySelector(".err-element");

  if (!isValid) {
    setBorder(e.target, "2px solid red");
    setMessage(errorElement, `${message} ....`);
    return false;
  }

  setBorder(e.target, "2px solid grey");
  setMessage(errorElement, "");
  return true;
}


export function validateConfirmPasswordAndUpdateUI(e, password) {
  const confirmPassword = e.target.value;
  const { isValid, message } = validator.isValidConfirmPassword(password, confirmPassword);
  const errorElement = e.target.parentElement.querySelector(".err-element");

  if (!isValid) {
    setBorder(e.target, "2px solid red");
    setMessage(errorElement, `${message} ....`);
    return false;
  }

  setBorder(e.target, "2px solid grey");
  setMessage(errorElement, "");
  return true;
}