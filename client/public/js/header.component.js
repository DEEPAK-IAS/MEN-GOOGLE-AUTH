const loginBTN = document.querySelector("#google-login");
const logoutBTN = document.querySelector("#google-logout");


logoutBTN.addEventListener("click", async(e) => {
  location.href = "/api/v1/auth/logout";
})

loginBTN.addEventListener("click", async(event) => {
  window.location.href = "/google";

})


