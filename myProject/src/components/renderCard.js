import { CARDS_ROW } from "../services/domService.js";

export const renderCards = (cards = []) => {
  CARDS_ROW.innerHTML = "";
  cards.forEach((card) => {
    const { _id, url, alt, credit, price } = card;
    CARDS_ROW.innerHTML += `
        <div class="card col-12 col-md-6 col-xl-4 col-xxl-3 mb-2 px-0">
            <img src="${url}" class="card-img-top" alt="${alt}">
            <div class="card-body">
                    <h5 class="card-title">${alt}</h5>
                    <p>Credits: <span class="fw-bold">${credit}</span></p>
                    <hr />
                    <div class="justify-content-between d-flex">
                    <div>Price: <span class="fw-bold">${price}</span>$</div>
                    <div class="bi bi-cart cursor" id="like${_id}"></div>
                </div>            
              </div>
        </div>
        `;
  });
};

export default renderCards;
