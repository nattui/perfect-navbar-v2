console.log('navbar.js is loaded...');

// TODO: clean up variables

// Checking whether to add margin top to body
const navbarFixed = document.getElementsByClassName('navbar--fixed')[0];
const navbarBanner = document.getElementsByClassName('navbar__banner')[0];
const navbarMain = document.getElementsByClassName('navbar__main')[0];
const subnavbarWrapper = document.getElementsByClassName('subnavbar__wrapper')[0];
let navbarHeight = 0;
navbarBanner ? navbarHeight = navbarBanner.offsetHeight + navbarMain.offsetHeight : navbarMain.offsetHeight;
const body = document.getElementsByTagName('body')[0];
// console.log('navbar height:', navbarHeight);
if (navbarFixed) body.style.marginTop = `${navbarHeight}px`;
subnavbarWrapper.style.height = `calc(100% - ${navbarHeight}px)`;

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
const html = document.getElementsByTagName('html')[0];
// something(true);

let isMenuActive = false;
const setSubnavbar = enabled => {
  // window.scrollTo(0, 0);
  if (enabled) {
    // Set menu icon to active
    menu.setAttribute('class', `${menuClass} is-active`);
    // Hide body scrollbar
    body.setAttribute('class', 'state--disableScroll');

    subnavbar.style.top = '100%';
    navbarMain.removeAttribute('style');
    isMenuActive = true;
  } else {
    // Set menu icon to default state
    menu.setAttribute('class', menuClass);
    // Set body scrollbar to initial state
    body.removeAttribute('class');

    subnavbar.style.top = `-100vh`;
    window.pageYOffset > 8 ?
      navbarMain.style.boxShadow = '0 0 1px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04)' :
      navbarMain.style.boxShadow = 'none';
    isMenuActive = false;
  }
}

menu.addEventListener('click', () => isMenuActive ? setSubnavbar(false) : setSubnavbar(true));


// Resized event listener
let windowWidth = window.innerWidth;
window.addEventListener('resize', () => {
  // If resize x, turn off subnavbar and searchbar
  if (windowWidth !== window.innerWidth) {
    windowWidth = window.innerWidth;
    setSubnavbar(false);
    setSearchbar(false);

    // If navbar banner exist, adjust body margin top
    navbarBanner ? navbarHeight = navbarBanner.offsetHeight + navbarMain.offsetHeight : navbarMain.offsetHeight;
    body.style.marginTop = `${navbarHeight}px`;
    subnavbarWrapper.style.height = `calc(100% - ${navbarHeight}px)`;
  }
});


// Add box shadow when scrolled down from initial position
const SCROLL_AMOUNT = 8;
window.addEventListener('scroll', () => {
  window.pageYOffset > SCROLL_AMOUNT && !isMenuActive ?
    navbarMain.style.boxShadow = '0 0 1px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04)' :
    navbarMain.style.boxShadow = 'none';
});


// Searchbar
const searchbar = document.getElementsByClassName('searchbar')[0];
const searchButton = document.getElementsByClassName('navbar__search')[0];
const searchbarInput = document.getElementsByClassName('searchbar__input')[0];
const closeSearchButton = document.getElementsByClassName('searchbar__close')[0];

// Set the searchbar
let isSeachbarActive = false;
const setSearchbar = (state) => {
  if (state) {
    setSubnavbar(false);
    navbarBanner ?
      searchbar.style.top = `${navbarBanner.offsetHeight}px` :
      searchbar.style.top = '44px';
    searchbarInput.focus();
    isSeachbarActive = true;
  } else {
    searchbar.style.top = '-64px';
    isSeachbarActive = false;
  }
}

searchButton.addEventListener('click', () => isSeachbarActive ? setSearchbar(false) : setSearchbar(true));

closeSearchButton.addEventListener('click', () => setSearchbar(false));

window.addEventListener('keydown', event => {
  let key = event.key;
  if (key === 's') {
    setSearchbar(true);
  } else if (key === 'm') {
    setSearchbar(false);
    setSubnavbar(true);
  }
}, { once: true });
