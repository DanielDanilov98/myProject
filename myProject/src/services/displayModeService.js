import { handleDeleteItem } from "../app.js";
import renderCards from "../components/renderCard.js";
import renderTable from "../components/renderTable.js";
import DISPLAY from "../models/displayModel.js";
import { onChangeDisplayMode } from "../routes/router.js";
import { handleEditItem } from "./itemService.js";

export const handleDisplayMode = (products, display) => {
  onChangeDisplayMode(products, display);
  if (display === DISPLAY.TABLE) {
    renderTable(products);
    products.forEach((item) => {
      addEventOnDelete(item._id);
      addOnEditItem(products, item._id);
    });
    return display;
  }

  if (display === DISPLAY.CARDS) {
    renderCards(products);
    return display;
  }

  return display;
};

const addEventOnDelete = (id) => {
  const deleteButton = document.getElementById(`delete${id}`);
  deleteButton.addEventListener("click", () => handleDeleteItem(id));
};

export const addOnEditItem = (products, id) => {
  document.getElementById(`edit${id}`).addEventListener("click", () => handleEditItem(products, id));
};
