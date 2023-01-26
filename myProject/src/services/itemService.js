import { handleSubmitNewItem, onSubmitEditItem } from "../app.js";
import DISPLAY from "../models/displayModel.js";
import PAGES from "../models/pageModel.js";
import Product from "../models/productModel.js";
import { onChangeDisplayMode, onChangePage } from "../routes/router.js";
import {
  ALT_CREATE_PRODUCT_ERROR,
  ALT_CREATE_PRODUCT_FIELD,
  ALT_EDIT_PRODUCT_ERROR,
  ALT_EDIT_PRODUCT_FIELD,
  CANCEL_BTN,
  CANCELֹ_EDIT_BTN,
  CREDIT_CREATE_PRODUCT_ERROR,
  CREDIT_CREATE_PRODUCT_FIELD,
  CREDIT_EDIT_PRODUCT_ERROR,
  CREDIT_EDIT_PRODUCT_FIELD,
  EDIT_IMAGE_DISPLAY,
  PRICE_CREATE_PRODUCT_ERROR,
  PRICE_CREATE_PRODUCT_FIELD,
  PRICE_EDIT_PRODUCT_ERROR,
  PRICE_EDIT_PRODUCT_FIELD,
  SUBMIT_CREATE_PRODUCT_BTN,
  SUBMIT_EDIT_PRODUCT_BTN,
  URL_CREATE_PRODUCT_ERROR,
  URL_CREATE_PRODUCT_FIELD,
  URL_EDIT_PRODUCT_ERROR,
  URL_EDIT_PRODUCT_FIELD,
} from "./domService.js";
import useForm from "./formService.js";
import { setItemInLocalStorage } from "./localStorageService.js";

window.item = {};
const { onChangeInputField } = useForm();

export const handleCreateItem = () => {
  // הגענו לדף
  onChangePage(PAGES.CREATE_item);

  // להרשם לאירועי הזנת המידע בשדות
  createItemFromFieldsListeners();

  const cancelEH = () => {
    const conf = confirm("Are you sure you want to cancel?");
    if (conf) handleCancelCreateItem();
  };

  CANCEL_BTN.removeEventListener("click", cancelEH);
  CANCEL_BTN.addEventListener("click", cancelEH);

  SUBMIT_CREATE_PRODUCT_BTN.removeEventListener("click", handleSubmitNewItem);
  SUBMIT_CREATE_PRODUCT_BTN.addEventListener("click", handleSubmitNewItem);
};

export const handleEditItem = (products, id) => {
  // הגענו לדף
  onChangePage(PAGES.EDIT_item);

  mapToModel(products, id); // שמים את המידע של התמונה שבחרנו לערוך בשדות בדף עריכה
  editItemListeners(); // מפעילים את כל החיישנים שקשורים לוולידציה

  // מתקניםפ באג מוזר שבו נרשמנו פעמיים לאותו האלמנט
  const anonymousFunc = () => onSubmitEditItem(id);
  SUBMIT_EDIT_PRODUCT_BTN.removeEventListener("click", anonymousFunc);
  // rect on submit edit item
  SUBMIT_EDIT_PRODUCT_BTN.addEventListener("click", anonymousFunc);

  // rect on cancel edit item
  const cancelEH = () => onCancelEditItem(products);
  CANCELֹ_EDIT_BTN.removeEventListener("click", cancelEH);
  CANCELֹ_EDIT_BTN.addEventListener("click", cancelEH);
};

export const mapToModel = (products, id) => {
  item = products.find((x) => x._id === id);
  if (!item) throw new Error(`No itemture with id: ${id} was found`);
  const { url, price, alt, credit } = item;
  URL_EDIT_PRODUCT_FIELD.value = url;
  ALT_EDIT_PRODUCT_FIELD.value = alt;
  CREDIT_EDIT_PRODUCT_FIELD.value = credit;
  PRICE_EDIT_PRODUCT_FIELD.value = price;
  EDIT_IMAGE_DISPLAY.src = url;
  EDIT_IMAGE_DISPLAY.alt = alt;
};

const editItemListeners = () => {
  const schema = ["url", "price", "alt", "credit"];

  // פונק' שרצה עם כל אינפוט ומקבלת את האירוע של ההכנסת המידע כארגומנט

  URL_EDIT_PRODUCT_FIELD.addEventListener("input", (e) => {
    const validation = {
      regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/g,
      min: 10,
      max: 256,
    };

    const element = {
      input: e.target,
      errorSpan: URL_EDIT_PRODUCT_ERROR,
      validation,
    };

    onChangeInputField(schema, element, SUBMIT_EDIT_PRODUCT_BTN);
    EDIT_IMAGE_DISPLAY.src = e.target.value;
  });

  ALT_EDIT_PRODUCT_FIELD.addEventListener("input", (e) => {
    const element = {
      input: e.target,
      errorSpan: ALT_EDIT_PRODUCT_ERROR,
      validation: { min: 2 },
    };

    onChangeInputField(schema, element, SUBMIT_EDIT_PRODUCT_BTN);
    EDIT_IMAGE_DISPLAY.alt = e.target.value;
  });

  CREDIT_EDIT_PRODUCT_FIELD.addEventListener("input", (e) =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: CREDIT_EDIT_PRODUCT_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_EDIT_PRODUCT_BTN
    )
  );

  PRICE_EDIT_PRODUCT_FIELD.addEventListener("input", (e) =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PRICE_EDIT_PRODUCT_ERROR,
        validation: { numMin: 1 },
      },
      SUBMIT_EDIT_PRODUCT_BTN
    )
  );
};

export const onCancelEditItem = (products) => {
  const { onClearFormFields } = useForm();
  const errorsSpans = [ALT_EDIT_PRODUCT_ERROR, CREDIT_EDIT_PRODUCT_ERROR, PRICE_EDIT_PRODUCT_ERROR, URL_EDIT_PRODUCT_ERROR];
  const fields = [
    // בחירה שלכם אם תהעביר או לא, כי בכל מקרה הפונק' של ההעברה של המודל לשדות ידרוס הכל
    URL_EDIT_PRODUCT_FIELD,
    ALT_EDIT_PRODUCT_FIELD,
    CREDIT_EDIT_PRODUCT_FIELD,
    PRICE_EDIT_PRODUCT_FIELD,
  ];
  onClearFormFields(SUBMIT_EDIT_PRODUCT_BTN, [], errorsSpans);
  onChangePage(PAGES.HOME);
  onChangeDisplayMode(products, DISPLAY.TABLE);
};

export const createItemFromFieldsListeners = () => {
  const schema = ["url", "price"];
  URL_CREATE_PRODUCT_FIELD.addEventListener("input", (e) => {
    const validation = {
      regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/g,
      min: 10,
      lowerCase: true,
    };

    const element = {
      input: e.target,
      errorSpan: URL_CREATE_PRODUCT_ERROR,
      validation,
    };

    onChangeInputField(schema, element, SUBMIT_CREATE_PRODUCT_BTN);
  });

  PRICE_CREATE_PRODUCT_FIELD.addEventListener("input", (e) => {
    const validation = {
      regex: /^\d+$/,
      numMin: 100,
    };

    const element = {
      input: e.target,
      errorSpan: PRICE_CREATE_PRODUCT_ERROR,
      validation,
    };

    onChangeInputField(schema, element, SUBMIT_CREATE_PRODUCT_BTN);
  });
};

export const handleCancelCreateItem = () => {
  const { onClearFormFields } = useForm();
  const fields = [URL_CREATE_PRODUCT_FIELD, ALT_CREATE_PRODUCT_FIELD, CREDIT_CREATE_PRODUCT_FIELD, PRICE_CREATE_PRODUCT_FIELD];
  const errorSpans = [URL_CREATE_PRODUCT_ERROR, ALT_CREATE_PRODUCT_ERROR, CREDIT_CREATE_PRODUCT_ERROR, PRICE_CREATE_PRODUCT_ERROR];
  onClearFormFields(SUBMIT_CREATE_PRODUCT_BTN, fields, errorSpans);
  onChangePage(PAGES.HOME);
};

export const onCreateNewItem = (products) => {
  try {
    let newArray = [...products];
    const item = new Product(
      {
        url: URL_CREATE_PRODUCT_FIELD.value,
        alt: ALT_CREATE_PRODUCT_FIELD.value,
        credit: CREDIT_CREATE_PRODUCT_FIELD.value,
        price: PRICE_CREATE_PRODUCT_FIELD.value,
      },
      newArray
    );
    newArray.push(item);

    setItemInLocalStorage("products", JSON.stringify(newArray));

    return newArray;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const onEditItem = (products, id) => {
  const item = products.find((item) => item._id === id);
  if (!item) throw new Error("No itemture Found");
  item.url = URL_EDIT_PRODUCT_FIELD.value;
  item.alt = ALT_EDIT_PRODUCT_FIELD.value;
  item.credit = CREDIT_EDIT_PRODUCT_FIELD.value;
  item.price = PRICE_EDIT_PRODUCT_FIELD.value;
  return products;
};
