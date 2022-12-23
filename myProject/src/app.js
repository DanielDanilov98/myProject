import { HOME_PAGE_LINK, NEWS_PAGE_LINK, CATEGORY_PAGE_LINK, ABOUT_PAGE_LINK, CONTACT_PAGE_LINK, LOGIN_PAGE_LINK } from "./services/domService.js";
import PAGES from "./models/pageModel.js";
import { onChangingPage } from "./routes/router.js";

HOME_PAGE_LINK.addEventListener("click", () => onChangingPage(PAGES.HOME));
NEWS_PAGE_LINK.addEventListener("click", () => onChangingPage(PAGES.NEWS));
CATEGORY_PAGE_LINK.addEventListener("click", () => onChangingPage(PAGES.CATEGORY));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangingPage(PAGES.ABOUT));
CONTACT_PAGE_LINK.addEventListener("click", () => onChangingPage(PAGES.CONTACT));
LOGIN_PAGE_LINK.addEventListener("click", () => onChangingPage(PAGES.LOGIN));
