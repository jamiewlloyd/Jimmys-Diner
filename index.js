import { menuArray } from '/data.js';

const appContainer = document.getElementById("app-container");
const basket = document.getElementById('basket');
const basketTotal = document.getElementById('basket-total');
const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
let totalPrice = Number(basketTotal.innerText);

menuArray.forEach(object => {
   appContainer.insertBefore(renderMenuItem(object), basket)
});

function renderMenuItem(foodObj) {

   const orderItem = document.createElement("section");
   orderItem.classList.add("order-item");
   orderItem.setAttribute('id', `order-item-${foodObj.name}`);

   // Image
   const orderItemImg = document.createElement("img");
   orderItemImg.classList.add('food-icon');
   orderItemImg.setAttribute('src', `/images/${foodObj.image}`);

   // Information
   const foodInfo = document.createElement("div");
   foodInfo.classList.add("food-information");

   // Information child nodes
   const foodItem = document.createElement("h2");
   foodItem.classList.add("food-item");
   foodItem.innerText = `${foodObj.name}`;

   const ingredients = document.createElement("p");
   ingredients.classList.add("ingredients");
   ingredients.innerText = `${foodObj.ingredients.join(', ')}`;

   const price = document.createElement("p");
   price.classList.add("price");
   price.innerText = `£${foodObj.price}`;

   // Appending information child nodes
   foodInfo.appendChild(foodItem);
   foodInfo.appendChild(ingredients);
   foodInfo.appendChild(price);

   // Button
   const addBtn = document.createElement("div");
   addBtn.classList.add("add-btn");
   addBtn.setAttribute('role', 'button');
   addBtn.innerText = "+";

   // Appending elements to main section
   orderItem.appendChild(orderItemImg);
   orderItem.appendChild(foodInfo);
   orderItem.appendChild(addBtn);
   return orderItem;
}

document.addEventListener("click", function (e) {

   if (e.target.classList.contains('add-btn')) {
      const addedItem = e.target.parentElement;
      const addedItemName = addedItem.childNodes[1].childNodes[0].innerText;
      const addedItemPrice = addedItem.childNodes[1].childNodes[2].innerText;
      renderBasketItem(addedItemName, addedItemPrice);
      if (basket.classList.contains('hidden')) {
         basket.classList.remove('hidden');
      };
   } else if (e.target.classList.contains('remove-btn')) {
      const removeItemParent = e.target.parentElement;
      const removeItemPrice = Number(e.target.nextElementSibling.innerText.replace(/[^0-9\.]+/g, ""));
      removeBasketItem(removeItemParent, removeItemPrice);
   } else if (e.target.classList.contains('complete-btn') && (totalPrice !== 0)) {
      modal.classList.remove('hidden');
      modalContainer.classList.remove('hidden');
      document.body.style.classlist.add('stop-scroll');
   }
});


function renderBasketItem(name, price) {
   const basketContents = document.getElementById('basket-contents');
   const currentItemArr = Array.from(basketContents.children).map(x => x.id);

   if (!currentItemArr.includes(name)) {

      const basketItem = document.createElement("div");
      basketItem.classList.add('basket-item');
      basketItem.setAttribute('id', `${name}`);

      const itemHeading = document.createElement("h2");
      itemHeading.innerText = name;

      const removeBtn = document.createElement("div");
      removeBtn.classList.add('remove-btn');
      removeBtn.setAttribute('role', 'button');
      removeBtn.innerText = 'remove';

      const itemPrice = document.createElement("p");
      itemPrice.classList.add('price');
      itemPrice.innerText = price;

      basketItem.appendChild(itemHeading);
      basketItem.appendChild(removeBtn);
      basketItem.appendChild(itemPrice);
      basketContents.appendChild(basketItem);

      totalPrice += Number(price.replace(/[^0-9\.]+/g, ""))
      basketTotal.innerHTML = totalPrice;
   }
}

function removeBasketItem(parent, price) {
   parent.remove();
   totalPrice -= price;
   basketTotal.innerHTML = totalPrice;
   if ((totalPrice === 0) && (!basket.classList.contains('hidden'))) {
      basket.classList.add('hidden');
   }
}

modal.addEventListener("submit", function (e) {
   e.preventDefault();
   modal.classList.add('hidden');
   modalContainer.classList.add('hidden');
   document.body.style.classlist.remove('stop-scroll');
})
