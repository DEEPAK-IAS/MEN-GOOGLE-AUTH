import "../styles/signin.css";
import googleIMG from "../assets/images/google-icon.png";
import showIcon from "../assets/images/icons/view.png";
import hideIcon from "../assets/images/icons/hide.png";
import { addValidationListeners } from "./utils/common.js";
import { 
  toggleIcon, 
  toggleType, 
  validateEmailAndUpdateUI, 
  validatePasswordAndUpdateUI 
} from "./utils/userInterface.js";

const signinFrom = document.forms[0];
const googleIcon = signinFrom.querySelector("#google-icon")
const eyeIcon = signinFrom.querySelector("#eye-icon");
const emailInput = signinFrom.querySelector("#email");
const passwordInput = signinFrom.querySelector("#password");

signinFrom.reset();
googleIcon.src = googleIMG;
eyeIcon.src = showIcon;

addValidationListeners(emailInput, validateEmailAndUpdateUI);
addValidationListeners(passwordInput, validatePasswordAndUpdateUI);

eyeIcon.addEventListener("click", (e) => {
  toggleIcon(eyeIcon, showIcon, hideIcon);
  toggleType(passwordInput, "password", "text");
  
})

document.getElementById('signinForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Sign-in successful!');
});
