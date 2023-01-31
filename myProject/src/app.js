import {
  ABOUT_PAGE_LINK,
  LINK_HOME_PAGE,
  HOME_PAGE_LINK,
  CREATE_PRODUCT_PAGE_LINK,
  LOGIN_PAGE_LINK,
  SIGNUP_PAGE_LINK,
  TABLE_ICON,
  LINK_TO_CREATE_PRODUCT_PAGE,
  CARDS_ICON,
  SORT_DOWN_ICON,
  SORT_UP_ICON,
  SEARCH_BAR,
} from "./services/domService.js";
import PAGES from "../src/models/pageModel.js";
import {
  onChangeDisplayMode,
  onChangePage,
  setNavDisplay,
} from "./routes/router.js";
import {
  handleCancelCreateItem,
  handleCreateItem,
  onCancelEditItem,
  onCreateNewItem,
  onEditItem,
} from "./services/itemService.js";
import initialData from "./initialData/initialData.js";
import {
  handleSignup,
  onSignupNewUser,
  handleCancelSignup,
  handleLogin,
} from "./services/userService.js";
import DISPLAY from "./models/displayModel.js";
import { handleDisplayMode } from "./services/displayModeService.js";
import {
  filterArrayOfObjectsByTerm,
  sortArrayOfObject,
} from "./utils/algoMethods.js";

//#region משתנים גלובליים
let { users, products } = initialData();
let display;
//#endregion

setNavDisplay();

//#region האזנה לאירועים

//ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
LINK_TO_CREATE_PRODUCT_PAGE.addEventListener("click", () => handleCreateItem());
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_PRODUCT_PAGE_LINK.addEventListener("click", () => handleCreateItem());
LOGIN_PAGE_LINK.addEventListener("click", () => {
  let { users } = initialData();
  handleLogin(users);
});
SIGNUP_PAGE_LINK.addEventListener("click", handleSignup);
LINK_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

//בקרי תצוגה

TABLE_ICON.addEventListener("click", () =>
  onChangeDisplayMode(products, DISPLAY.TABLE)
);
CARDS_ICON.addEventListener("click", () =>
  onChangeDisplayMode(products, DISPLAY.CARDS)
);

// שדה חיפוש
SEARCH_BAR.addEventListener("input", (e) =>
  handleFilterProduct(e.target.value)
);
//#endregion

//#region יצירת מוצר

export const handleSubmitNewItem = () => {
  products = onCreateNewItem(products);
  handleCancelCreateItem();
  display = handleDisplayMode(products, DISPLAY.TABLE);
};
//#endregion

//#region משתמש חדש
export const handleSubmitSignup = () => {
  users = onSignupNewUser(users);
  handleCancelSignup();
};
//#endregion

//#region שינוי תצוגה
TABLE_ICON.addEventListener(
  "click",
  () => (display = handleDisplayMode(products, DISPLAY.TABLE))
);

CARDS_ICON.addEventListener(
  "click",
  () => (display = handleDisplayMode(products, DISPLAY.CARDS))
);

//#endregion

//#region מחיקת מוצר
export const handleDeleteItem = (id) => {
  products = products.filter((item) => item._id !== id);
  handleDisplayMode(products, DISPLAY.TABLE);
};
//#endregion

//#region עריכת מוצר
export const onSubmitEditItem = (id) => {
  products = onEditItem(products, id);
  onCancelEditItem(products);
  handleDisplayMode(products.DISPLAY.TABLE);
};
//#endregion

//#region sorting
SORT_DOWN_ICON.addEventListener("click", () => {
  products = sortArrayOfObject(products, "alt");
  handleDisplayMode(products, DISPLAY.TABLE);
});

SORT_UP_ICON.addEventListener("click", () => {
  products = sortArrayOfObject(products, "alt", true);
  handleDisplayMode(products, DISPLAY.TABLE);
});

//#endregion

//#region filter products
const handleFilterProducts = (term) => {
  const newProducts = filterArrayOfObjectsByTerm(term, products, "alt");
  handleDisplayMode(newProducts, DISPLAY.TABLE);
};
//#endregion

// אתחול הצגה ראשונית
onChangePage(PAGES.HOME);
onChangeDisplayMode(products, DISPLAY.CARDS);
