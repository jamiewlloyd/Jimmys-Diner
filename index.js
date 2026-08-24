import { menuArray } from '/data.js';

const appContainer = document.getElementById("app-container");
const basket = document.getElementById('basket');

menuArray.forEach(object => {
   appContainer.insertBefore(renderMenuItem(object), basket)
});

function renderMenuItem(foodObj) {

   const orderItem = document.createElement("section");
   orderItem.classList.add("order-item");

   const orderItemImg = document.createElement("img");
   orderItemImg.classList.add('food-icon');
   orderItemImg.setAttribute('src', `/images/${foodObj.image}`);


   const foodInfo = document.createElement("div");
   foodInfo.classList.add("food-information");

   const foodItem = document.createElement("h2");
   foodItem.classList.add("food-item");
   foodItem.innerText = `${foodObj.name}`;

   const ingredients = document.createElement("p");
   ingredients.classList.add("ingredients");
   ingredients.innerText = `${foodObj.ingredients.join(', ')}`;

   const price = document.createElement("p");
   price.classList.add("price");
   price.innerText = `£${foodObj.price}`;

   foodInfo.appendChild(foodItem);
   foodInfo.appendChild(ingredients);
   foodInfo.appendChild(price);

   const addBtn = document.createElement("div");
   addBtn.classList.add("add-btn");
   addBtn.setAttribute('role', 'button');
   const unselectable = document.createElement("span");
   unselectable.classList.add("unselectable");
   unselectable.innerText = "+";

   addBtn.appendChild(unselectable);

   orderItem.appendChild(orderItemImg);
   orderItem.appendChild(foodInfo);
   orderItem.appendChild(addBtn);
   return orderItem;
}


