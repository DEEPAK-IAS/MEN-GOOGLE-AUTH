import "../styles/profile.css";
import "../styles/header.component.css";
import userDefaultIcon from "../assets/images/avatar.png";
import hide from "../assets/images/hide.png";
import view from "../assets/images/view.png";
import loadHeader from "./header.component";
import { getCookieObject } from "./utils/common";
import { setBorder, toggleIcon, toggleType, validatePasswordAndUpdateUI } from "./utils/userInterface";
import { addValidationListeners } from "./utils/common";


const userInfo = getCookieObject("user_info");
const profileImage = document.querySelector(".profile-image");
const fileInput = document.querySelector("#profile-input");
const userName = document.querySelector(".profile-name");
const userNameInput = document.querySelector("#user-name");
const penIcon = document.querySelector("span");
const editBTN = document.querySelector(".edit");
const passwordFrom = document.querySelector(".password-form");
const passwordInput = document.querySelector("#password");
const submitBTN = document.querySelector(".submit");

const eyeIcon = document.querySelector("#eye-icon");
eyeIcon.src = view;
eyeIcon.addEventListener("click", (e) => {
  toggleIcon(eyeIcon, hide, view);
  toggleType(eyeIcon.parentElement.querySelector("input"), "password", "text");
});
addValidationListeners(passwordInput, validatePasswordAndUpdateUI);

profileImage.src = userInfo ? userInfo.avatar : userDefaultIcon;
userName.innerText = userInfo ? userInfo.username : "user";
let isNameChanged = false;
let isImageChanged = false;

loadHeader();
userNameInput.classList.add("d-none");
passwordFrom.classList.add("d-none");

penIcon.addEventListener("click", () => {
  userNameInput.classList.remove("d-none");
  userNameInput.focus();
  userName.classList.add("d-none");
  isNameChanged = true;
});

profileImage.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  isImageChanged = true;
});

async function updateProfile(e) {
  e.preventDefault();
  let imageRes;
  let name;
  try {
    
    const passwordRes = await fetch(`/api/v1/user/${userInfo._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordInput.value,
      }),
    });

    const passwordData = await passwordRes.json();
    console.log(passwordData)
    if (passwordData.success != true) {
      passwordInput.parentElement.querySelector(".err-element").innerText = passwordData.message;
      setBorder(passwordInput, "2px solid red");
      return ;
    }

    if (isImageChanged) {
      const formData = new FormData();
      const file = fileInput.files[0];
      formData.append("avatar", file);
      const imgRes = await fetch("/api/v1/user/upload", {
        method: "POST",
        body: formData,
      });
      const data = await imgRes.json();
      imageRes = await fetch(data.file.downloadURL);
    }

    if (isNameChanged) {
      name = userNameInput.value.trim();
    }

    const res = await fetch(`/api/v1/user/${userInfo._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name ? name : userInfo.name,
        avatar: imageRes ? imageRes.url : userInfo.avatar,
      }),
    });

    const data = await res.json();

    if (data.success == true) location.reload();
  } catch (error) {
    console.log(error);
  }
}

editBTN.addEventListener("click", (e) => {
  passwordFrom.classList.remove("d-none");
});

submitBTN.addEventListener("click", updateProfile);

