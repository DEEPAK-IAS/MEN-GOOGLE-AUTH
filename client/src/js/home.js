import "../styles/home.css";

document.addEventListener('DOMContentLoaded', () => {
  const exploreButton = document.querySelector('.btn');
  exploreButton.addEventListener('click', () => {
    location.href = "/signin";
  });
});
