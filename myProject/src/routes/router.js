import { HOME_PAGE, NEWS_PAGE, CATEGORY_PAGE, ABOUT_PAGE, CONTACT_PAGE, LOGIN_PAGE, ERROR_404_PAGE } from "../services/domService.js";
import PAGES from "../models/pageModel.js";

const pageToDOMMap = [
  {
    page: PAGES.HOME,
    dom: HOME_PAGE,
  },
  {
    page: PAGES.NEWS,
    dom: NEWS_PAGE,
  },
  {
    page: PAGES.CATEGORY,
    dom: CATEGORY_PAGE,
  },
  {
    page: PAGES.ABOUT,
    dom: ABOUT_PAGE,
  },
  {
    page: PAGES.CONTACT,
    dom: CONTACT_PAGE,
  },
  {
    page: PAGES.LOGIN,
    dom: LOGIN_PAGE,
  },
  {
    page: PAGES.ERROR404,
    dom: ERROR_404_PAGE,
  },
];

export const onChangingPage = (page) => {
  pageToDOMMap.forEach((pageMap) => (pageMap.dom.className = "d-none"));
  const pageMap = pageToDOMMap.find((pageMap) => pageMap.page === page);
  if (pageMap) return (pageMap.dom.className = "d-block");

  ERROR_404_PAGE.className = "d-block";
};
