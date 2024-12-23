const loginBTN = document.querySelector("#google-login");
const logoutBTN = document.querySelector("#google-logout");


logoutBTN.addEventListener("click", async(e) => {
  const res = await fetch("/api/v1/auth/signout");
  const data = await res.json();
  console.log(data);
})

loginBTN.addEventListener("click", async(event) => {
  window.location.href = "/google";

})


