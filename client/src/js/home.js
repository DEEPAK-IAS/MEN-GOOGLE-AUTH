import "../styles/header.component.css";
import "../styles/home.css";
import { isCookieSet, getCookieObject } from "./utils/common";
import loadHeader from "./header.component";

const signinBTN = document.querySelector("#sign-in");

if (isCookieSet("access_token")) {
  signinBTN.style.display = "none";
} else {
  signinBTN.removeAttribute("hidden");
}

loadHeader();
document.addEventListener("DOMContentLoaded", () => {
  const exploreButton = document.querySelector(".btn");
});
