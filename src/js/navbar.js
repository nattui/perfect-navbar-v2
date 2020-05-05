console.log('navbar.js is loaded...');

// Checking whether to add margin top to body
const navbarFixed = document.getElementsByClassName('navbar--fixed')[0];
const navbarBanner = document.getElementsByClassName('navbar__banner')[0];
const navbarMain = document.getElementsByClassName('navbar__main')[0];
let navbarHeight = 0;
navbarBanner ? navbarHeight = navbarBanner.offsetHeight + navbarMain.offsetHeight : navbarMain.offsetHeight;
const body = document.getElementsByTagName('body')[0];
if (navbarFixed) body.style.marginTop = `${navbarHeight}px`;

const something = (state) => {
  for (let i = 0; i < subnavbar.children.length; i++) {
    const n = subnavbar.children[i];
    if (state) {
      n.setAttribute('tabIndex', '-1');
    } else {
      n.removeAttribute('tabIndex');
    }
  }
}

// Subnavbar
const navbar = document.getElementsByClassName('navbar')[0];
const menu = document.getElementsByClassName('navbar__menu')[0];
const menuClass = menu.getAttribute('class');
const searchInput = document.getElementsByClassName('search__input')[0];
const subnavbar = document.getElementsByClassName('subnavbar')[0];
const subnavbarWrapper = document.getElementsByClassName('subnavbar__wrapper')[0];
const html = document.getElementsByTagName('html')[0];
// something(true);

let isMenuActive = false;
const setSubnavbar = enabled => {
  // window.scrollTo(0, 0);
  if (enabled) {
    // Set menu icon to active
    menu.setAttribute('class', `${menuClass} is-active`);
    // Hide body scrollbar
    // body.style.position = 'relative';
    // html.setAttribute('class', 'state--disableScroll');
    body.setAttribute('class', 'state--disableScroll');

    subnavbar.style.top = '100%';
    navbarMain.removeAttribute('style');
  } else {
    // Set menu icon to default state
    menu.setAttribute('class', menuClass);
    // Set body scrollbar to initial state
    // body.style.position = null;
    // html.removeAttribute('class');
    body.removeAttribute('class');

    subnavbar.style.top = `-100vh`;
    window.pageYOffset > 8 ?
      navbarMain.style.boxShadow = '0 0 1px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04)' :
      navbarMain.style.boxShadow = 'none';
  }
  isMenuActive = !isMenuActive;
}

menu.addEventListener('click', () => isMenuActive ? setSubnavbar(false) : setSubnavbar(true));
const search = document.getElementsByClassName('navbar__search')[0];
search.addEventListener('click', () => isMenuActive ? setSubnavbar(false) : setSubnavbar(true));


// Resized event listener
let windowWidth = window.innerWidth;
window.addEventListener('resize', () => {
  // If navbar banner exist, adjust body margin top
  navbarBanner ? navbarHeight = navbarBanner.offsetHeight + navbarMain.offsetHeight : navbarMain.offsetHeight;
  body.style.marginTop = `${navbarHeight}px`;

  // If resize x, turn off subnavbar
  if (windowWidth !== window.innerWidth) {
    windowWidth = window.innerWidth;
    setSubnavbar(false);
  }
});


// Add box shadow when scrolled down from initial position
window.addEventListener('scroll', () => {
  window.pageYOffset > 8 && !isMenuActive ?
    navbarMain.style.boxShadow = '0 0 1px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04)' :
    navbarMain.style.boxShadow = 'none';
});
