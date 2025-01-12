import "../styles/signin.css";
import "../styles/header.component.css";
import loadHeader from "./header.component";
import googleIMG from "../assets/images/google-icon.png";
import showIcon from "../assets/images/view.png";
import hideIcon from "../assets/images/hide.png";
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
const submitBTN = signinFrom.querySelector("#submit-btn");

loadHeader();
signinFrom.reset();
googleIcon.src = googleIMG;
eyeIcon.src = showIcon;

addValidationListeners(emailInput, validateEmailAndUpdateUI);
addValidationListeners(passwordInput, validatePasswordAndUpdateUI);

eyeIcon.addEventListener("click", (e) => {
  toggleIcon(eyeIcon, showIcon, hideIcon);
  toggleType(passwordInput, "password", "text");
  
})

submitBTN.addEventListener("click",  async(e) => {
  e.preventDefault();
  const res = await fetch("/api/v1/auth/signin", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  });

  const data = await res.json();
  console.log(data);
  if(data.success == true) {
    location.href = "/";
  }
});
