let startButton = document.querySelector("#start");
let performButton = document.querySelector("#perform");
let categoriesList = document.querySelector("#category");
let listOfOrderedProducts = document.querySelector("#list");

startButton.addEventListener("click", showCategories);
performButton.addEventListener("click", performList);

function showCategories() {  
  categoriesList.innerHTML = Object
    .keys(obj)
    .map((el) => `<div id="${el}"><button name="${el}" class="category">${el}</button><div name="content" class="hidden"></div></div>`)
    .join('');
  let buttons = document.querySelectorAll(".category");
  buttons.forEach((el) => el.addEventListener("click", showGoods));
  startButton.innerText = 'Очистить';
  listOfOrderedProducts.innerHTML = '';
}

function showGoods(event) {
  const currentCategory = event.target.innerText;
  const arr = obj[currentCategory];
  const goodsList = event.target.nextSibling;
  if (goodsList.innerHTML == '') {
    goodsList.innerHTML = arr
      .map((el) => `<p class="goods"><label><input type='checkbox' id='${el}'>${el}</label><input type="text" size="4" maxlength="4"></p>`)
      .join('');
  }
  goodsList.classList.toggle("hidden");
}

function performList() {
  listOfOrderedProducts.innerHTML = Array
    .from(document.querySelectorAll("input[type=checkbox]"))
    .filter((el) => el.checked)
    .map((el) => {
      let quantity = el.parentNode.nextSibling.value;
      return `<p>${el.id}</p><p>.....${quantity}</p>`
    })
    .join('');
}