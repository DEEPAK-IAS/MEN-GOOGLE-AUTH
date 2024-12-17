const loginBTN = document.querySelector("#google-login");
const logoutBTN = document.querySelector("#google-logout");


logoutBTN.addEventListener("click", async(e) => {
  location.href = "/google/logout";
})

loginBTN.addEventListener("click", (event) => {
  location.href = "/google";
})
