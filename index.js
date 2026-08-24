import { menuArray } from '/data.js';

const appContainer = document.getElementById("app-container");
const basket = document.getElementById('basket');

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
   console.log(e.target)
   if (e.target.classList.contains('add-btn')) {
      const addedItem = e.target.parentElement;
      const addedItemName = addedItem.childNodes[1].childNodes[0].innerText
      const addedItemPrice = addedItem.childNodes[1].childNodes[2].innerText
      renderBasketItem(addedItemName, addedItemPrice);
   };
});

function renderBasketItem(name, price) {
   const basketContents = document.getElementById('basket-contents');
   const currentItemArr = Array.from(basketContents.children).map(x => x.id);
   console.log(currentItemArr);

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
   }
}

