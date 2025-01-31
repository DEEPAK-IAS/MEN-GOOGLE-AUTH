import "../styles/resetPassword.css";
import "../styles/header.component.css";
import loadHeader from "./header.component";
import hide from "../assets/images/hide.png"
import view from "../assets/images/view.png"
import {
  toggleIcon, 
  toggleType, 
  validatePasswordAndUpdateUI,
  validateConfirmPasswordAndUpdateUI,
  moveToNext
} from "./utils/userInterface";
import { addValidationListeners } from "./utils/common";
import { getCookieObject } from "./utils/common";
import { get } from "mongoose";

loadHeader();

const userInfo = getCookieObject("user_info");
const eyeIcons = document.querySelectorAll("#eye-icon");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#c-password");
const sendOTPBTN = document.querySelector(".otp")
const otpInputContainer = document.querySelector(".otp-input-container")
const otpInputs = document.querySelectorAll(".otp-input-container input")

addValidationListeners(passwordInput, validatePasswordAndUpdateUI);
addValidationListeners(confirmPasswordInput, validateConfirmPasswordAndUpdateUI);

eyeIcons[0].src = view;
eyeIcons[1].src = view;
eyeIcons.forEach((eyeIcon) => { 
  eyeIcon.addEventListener("click", () => {
    toggleIcon(eyeIcon, hide, view);
    toggleType(eyeIcon.parentElement.querySelector("input"), "password", "text");
  });
});


sendOTPBTN.addEventListener("click", async () => {

  const res = await fetch("/api/v1/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify ({
      email: userInfo.email,
    })
  })

  const data = await res.json();

  console.log(data);

  otpInputContainer.classList.remove("d-none");
})


otpInputs.forEach((input, index) => {
  input.addEventListener("keyup", () => {
    moveToNext(input, `input${index+1}`)
  })
})


otpInputs[3].addEventListener("keyup", async(e) => {
  let result = "";
  otpInputs.forEach((input) => {
    result += input.value;
  })
  
  const res = await fetch("/api/v1/auth/verify-otp", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify({
      email: userInfo.email,
      password: passwordInput.value.trim(),
      otp: result,
    })
  }) 

  const data = await res.json();

  console.log(data);

})