
class Validator {
  NUMERIC_CHARACTER_REGEX_PATTERN = /\d/;
  SPECIAL_CHARACTER_REGEX_PATTERN = /[^a-zA-Z0-9\s.]/;
  EMAIL_REGEX_PATTERN = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  UPPERCASE_REGEX_PATTERN = /[A-Z]/;

  isValidName(name) {
    if (name == "") {
      return { isValid: false, message: "Cannot be empty" };
    }

    if (this.NUMERIC_CHARACTER_REGEX_PATTERN.test(name)) {
      return { isValid: false, message: "Cannot contain numeric characters" };
    }

    if (this.SPECIAL_CHARACTER_REGEX_PATTERN.test(name)) {
      return { isValid: false, message: "Cannot contain special characters" };
    }

    return { isValid: true };
  }


  isValidEmail(email) {
    if (email == "") {
      return { isValid: false, message: "Email cannot be empty" };
    }

    if (!this.EMAIL_REGEX_PATTERN.test(email)) {
      return { isValid: false, message: "Invalid email address." };
    }

    return { isValid: true };
  }


  isValidPassword(password) {
    if (password == "") {
      return { isValid: false, message: "Password cannot be empty" };
    }

    if (!this.NUMERIC_CHARACTER_REGEX_PATTERN.test(password)) {
      return { isValid: false, message: "Password must have one numeric character" };
    }

    if (!this.SPECIAL_CHARACTER_REGEX_PATTERN.test(password)) {
      return { isValid: false, message: "Password must have one special character" };
    }

    if (!this.UPPERCASE_REGEX_PATTERN.test(password)) {
      return { isValid: false, message: "Password must have one uppercase character" }; 
    }

    if (password.length < 8) {
      return { isValid: false, message: "Password must be 8 characters" };
    }

    return { isValid: true };
  }

  
  isValidConfirmPassword(password, confirmPassword) {
    if (confirmPassword == "") {
      return { isValid: false, message: "Confirm password cannot be empty" };
    }

    if (password != confirmPassword) {
      return { isValid: false, message: "Password and Confirm Password do not match" };
    }

    return { isValid: true };
  }

}

const validator = new Validator();

export default validator;