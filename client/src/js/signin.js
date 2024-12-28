import "../styles/signin.css";
import googleIMG from "../asserts/images/google-icon.png";


const signinFrom = document.forms[0];
const googleIcon = signinFrom.querySelector("#google-icon")
const googleSignInBTN = signinFrom.querySelector("#google-sign-in");

signinFrom.reset();

googleIcon.src = googleIMG;



document.getElementById('signinForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Sign-in successful!');
});

googleSignInBTN.addEventListener("click", () => {
  location.href = "/google";
})
