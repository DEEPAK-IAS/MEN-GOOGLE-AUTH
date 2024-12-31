import cameraIcon from "../assets/images/camera.png";
import userAvatar from "../assets/images/avatar.png";
import showIcon from "../assets/images/icons/view.png";
import hideIcon from "../assets/images/icons/hide.png";
import googleIMG from "../assets/images/google-icon.png";
import "../styles/signup.css";
import { addValidationListeners } from "./utils/common.js";
import {
  toggleIcon,
  toggleType,
  validateNameAndUpdateUI,
  validateEmailAndUpdateUI,
  validatePasswordAndUpdateUI,
} from "./utils/userInterface.js";

const userIMG = document.getElementById("user-image");
const cameraIconDiv = document.querySelector(".camera-icon");
const imgFileInput = document.getElementById("file-input");
const signinFrom = document.forms[0];
const googleIcon = signinFrom.querySelector("#google-icon");
const eyeIcon = signinFrom.querySelector("#eye-icon");
const nameInput = signinFrom.querySelector("#name");
const emailInput = signinFrom.querySelector("#email");
const passwordInput = signinFrom.querySelector("#password");
const submitBTN = signinFrom.querySelector("#submit-btn");


signinFrom.reset();
eyeIcon.src = showIcon;
googleIcon.src = googleIMG;
cameraIconDiv.src = cameraIcon;
userIMG.src = userAvatar;
addValidationListeners(nameInput, validateNameAndUpdateUI);
addValidationListeners(emailInput, validateEmailAndUpdateUI);
addValidationListeners(passwordInput, validatePasswordAndUpdateUI);

eyeIcon.addEventListener("click", (e) => {
  toggleIcon(eyeIcon, showIcon, hideIcon);
  toggleType(passwordInput, "password", "text");
});

cameraIconDiv.addEventListener("click", () => {
  imgFileInput.click();
});

imgFileInput.addEventListener("change", async () => {
  const file = imgFileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      userIMG.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

submitBTN.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    const file = imgFileInput.files[0];
    formData.append("avatar", file);
    const imgRes = await fetch("/api/v1/user/upload", {
      method: "POST",
      body: formData,
    });
    const data = await imgRes.json();
    const res = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
        avatar: data.file.originalname,
      }),
    });
    const resData = await res.json();
    console.log(resData);
  } catch (err) {
    console.log(err);
  }
});
