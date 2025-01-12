import hamburgerMenu from '../assets/images/hamburger.png'; 
import closeMenu from '../assets/images/close.png'; 

export default function loadHeader() {

  function isCookieSet(cookieName) {
    return document.cookie.split('; ').some((cookie) => cookie.startsWith(`${cookieName}=`));
  }

  function getCookieObject(cookieName) {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(`${cookieName}=`));
    if (cookie) {
      try {
        return JSON.parse(decodeURIComponent(cookie.split('=')[1])); 
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  const isAuthenticated = isCookieSet('access_token');

  const userInfo = getCookieObject('user_info');

  document.body.insertAdjacentHTML('afterbegin', `
    <header>
      <div class="logo">Surya's Project</div>
      <div class="nav-links  d-none">
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        ${
          !isAuthenticated 
            ? `
              <a href="/signin">Sign In</a>
              <a href="/signup">Sign Up</a>
            ` 
            : `
              <a href="/profile" class="user-icon" title="Go to Profile">
                <img src="${userInfo.avatar}" alt="User">
              </a>
            `
        }
      </div>
      <button class="menu-icon" ><img src=${hamburgerMenu}></button>
    </header>
  `);

  document.querySelector('.menu-icon').addEventListener('click', function() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle('d-none');
    const menuIcon = document.querySelector('.menu-icon img');
    menuIcon.src = menuIcon.src.includes('hamburger') ? closeMenu : hamburgerMenu;
  })
}
