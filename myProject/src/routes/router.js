import { ABOUT_PAGE, ERROR_404_PAGE, HOME_PAGE, CREATE_PRODUCT_PAGE, LOGIN_PAGE, SIGNUP_PAGE, ADD_PRODUCT_LINK_CONTAINER, LOGIN_LINK_CONTAINER, LOGOUT_LINK_CONTAINER, NO_DATA_CONTAINER, DATA_CONTAINER, TABLE_DISPLAY_MODE, CARDS_CONTAINER, EDIT_PRODUCT_PAGE } from "../services/domService.js";
import PAGES from "../models/pageModel.js";
import { getItemFromLocalStorage } from "../services/localStorageService.js";
import DISPLAY from "../models/displayModel.js";

const pageToDOMMap = [
  {
    page: PAGES.HOME,
    dom: HOME_PAGE,
  },
  {
    page: PAGES.EDIT_PRODUCT,
    dom: EDIT_PRODUCT_PAGE,
  },
  {
    page: PAGES.ABOUT,
    dom: ABOUT_PAGE,
  },
  {
    page: PAGES.CREATE_PRODUCT,
    dom: CREATE_PRODUCT_PAGE,
  },
  {
    page: PAGES.LOGIN,
    dom: LOGIN_PAGE,
  },
  {
    page: PAGES.ERROR_404,
    dom: ERROR_404_PAGE,
  },
  {
    page: PAGES.SIGN_UP,
    dom: SIGNUP_PAGE,
  },
];

export const onChangePage = (page) => {
  pageToDOMMap.forEach((pageMap) => (pageMap.dom.className = "d-none")); // hide all pages

  const pageMap = pageToDOMMap.find((pageMap) => pageMap.page === page); // find the page that was clicked

  if (pageMap) return (pageMap.dom.className = "d-block"); // show the page that was clicked

  // show 404 page if we got this far (the page was not found, so the 'return' statement was not executed)
  ERROR_404_PAGE.className = "d-block";
};

export const setNavDisplay = () => {
  ADD_PRODUCT_LINK_CONTAINER.className = "d-none";
  const token = getItemFromLocalStorage("user");
  if (!token) {
    LOGIN_LINK_CONTAINER.className = "navbar-nav";
    LOGOUT_LINK_CONTAINER.className = "d-none";
    return;
  }
  LOGIN_LINK_CONTAINER.className = "d-none";
  LOGOUT_LINK_CONTAINER.className = "navbar-nav";
  const user = JSON.parse(token);
  if (user.isBusiness) return (ADD_PRODUCT_LINK_CONTAINER.className = "nav-item");
};

export const onChangeDisplayMode = (products, display) => {
  NO_DATA_CONTAINER.className = "d-none";
  DATA_CONTAINER.className = "d-none";
  TABLE_DISPLAY_MODE.className = "d-none";
  CARDS_CONTAINER.className = "d-none";

  if (!products.length) return (NO_DATA_CONTAINER.className = "d-block");
  DATA_CONTAINER.className = "d-block";

  switch (display) {
    case DISPLAY.TABLE:
      return (TABLE_DISPLAY_MODE.className = "d-block");
    case DISPLAY.CARDS:
      return (CARDS_CONTAINER.className = "d-block");
  }
};
