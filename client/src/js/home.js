import "../styles/home.css";

document.addEventListener('DOMContentLoaded', () => {
  const exploreButton = document.querySelector('.btn');
  exploreButton.addEventListener('click', () => {
    document.body.style.background = 'red';
  });
});
