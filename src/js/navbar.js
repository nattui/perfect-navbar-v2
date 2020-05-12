console.log('navbar.js is loaded...');

// TODO: Add comments


// Variables
// Navbar
const body = document.getElementsByTagName('body')[0];
const navbar = document.getElementsByClassName('navbar')[0];
// const navbarFixed = document.getElementsByClassName('navbar--fixed')[0];
const navbarBanner = document.getElementsByClassName('navbar__banner')[0];
const navbarMain = document.getElementsByClassName('navbar__main')[0];
const NAVBAR_SCROLL_AMOUNT = 16;
const NAVBAR_BOX_SHADOW = '0 0 1px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04)';

// Subnavbar
const subnavbar = document.getElementsByClassName('subnavbar')[0];
const subnavbarWrapper = document.getElementsByClassName('subnavbar__wrapper')[0];
const menuButton = document.getElementsByClassName('navbar__menu')[0];
const initialMenuClass = menuButton.getAttribute('class');

// Searchbar
const searchbar = document.getElementsByClassName('searchbar')[0];
const searchbarInput = document.getElementsByClassName('searchbar__input')[0];
const openSearchButton = document.getElementsByClassName('navbar__search')[0];
const closeSearchButton = document.getElementsByClassName('searchbar__close')[0];


// Set body top margins
const resetBodyMargins = () => {
  const navbarHeight = navbarBanner ?
    navbarBanner.offsetHeight + navbarMain.offsetHeight :
    navbarMain.offsetHeight;
  body.style.marginTop = `${navbarHeight}px`;
  subnavbarWrapper.style.height = `calc(100% - ${navbarHeight}px)`;
  return navbarHeight;
}

resetBodyMargins();



let isSubnavbarActive = false;
const setSubnavbar = state => {
  if (state) {
    setSearchbar(false);
    // Set menuButton icon to active
    menuButton.setAttribute('class', `${initialMenuClass} is-active`);
    // Hide body scrollbar
    body.setAttribute('class', 'state--disableScroll');

    subnavbar.style.top = '100%';
    navbarMain.removeAttribute('style');
    isSubnavbarActive = true;
  } else {
    // Set menuButton icon to default state
    menuButton.setAttribute('class', initialMenuClass);
    // Set body scrollbar to initial state
    body.removeAttribute('class');

    subnavbar.removeAttribute('style');
    window.pageYOffset > NAVBAR_SCROLL_AMOUNT ?
      navbarMain.style.boxShadow = NAVBAR_BOX_SHADOW :
      navbarMain.removeAttribute('style');
    isSubnavbarActive = false;
  }
}

menuButton.addEventListener('click', () => setSubnavbar(!isSubnavbarActive));


// Resized event listener
let windowWidth = window.innerWidth;
window.addEventListener('resize', () => {
  // If resize x, turn off subnavbar and searchbar
  if (windowWidth !== window.innerWidth) {
    windowWidth = window.innerWidth;
    setSubnavbar(false);
    setSearchbar(false);
    resetBodyMargins();
  }
});


// Add box shadow when scrolled down from initial position
window.addEventListener('scroll', () => {
  window.pageYOffset > NAVBAR_SCROLL_AMOUNT && !isSubnavbarActive ?
    navbarMain.style.boxShadow = NAVBAR_BOX_SHADOW :
    navbarMain.removeAttribute('style');
});


// Set the searchbar
let isSeachbarActive = false;
const setSearchbar = state => {
  if (state) {
    setSubnavbar(false);
    searchbar.style.top = navbarBanner ? `${navbarBanner.offsetHeight}px` : 0;
    searchbarInput.focus();
    isSeachbarActive = true;
  } else {
    searchbar.style.top = null;
    isSeachbarActive = false;
  }
}

openSearchButton.addEventListener('click', () => setSearchbar(true));
closeSearchButton.addEventListener('click', () => setSearchbar(false));


// Keyboard shortcuts
window.addEventListener('keydown', event => {
  switch (event.key) {
    case '<':
      setSearchbar(!isSeachbarActive);
      setTimeout(() => searchbarInput.value = '', 1)
      break;
    case '>':
      setSubnavbar(!isSubnavbarActive);
      break;
    case 'Escape':
      setSearchbar(false);
      setSubnavbar(false);
      break;
  }
});


// Close navbar banner
if (navbarBanner) {
  const closeBannerButton = document.getElementsByClassName('navbar__close')[0];
  closeBannerButton.addEventListener('click', () => {
    body.style.transition = 'margin-top 200ms';
    body.style.marginTop = `${navbarMain.offsetHeight}px`;
    navbar.style.transition = 'top 200ms';
    navbar.style.top = `-${navbarBanner.offsetHeight}px`;
    setTimeout(() => {
      body.style.transition = null;
      navbar.removeAttribute('style');
      navbar.removeChild(navbarBanner);
      subnavbarWrapper.style.height = `calc(100% - ${navbarMain.offsetHeight}px)`;
      if (isSeachbarActive) {
        searchbar.style.top = 0;
        searchbar.style.transition = 'none';
        setTimeout(() => searchbar.style.transition = null, 1);
      }
    }, 200);
  }, { once: true });
}
