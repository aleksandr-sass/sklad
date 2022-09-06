let startButton = document.querySelector("#start");
let performButton = document.querySelector("#perform");
let categoriesList = document.querySelector("#category");
let listOfOrderedProducts = document.querySelector("#list");
let hintTextElement = document.querySelector("#hint");
let objectInputElement = document.querySelector("[name=object]");
let viberLink = document.querySelector("#viber");

startButton.addEventListener("click", showCategories);
performButton.addEventListener("click", performList);

function showCategories() {  
  hintTextElement.innerText = "Введите название объекта, на котором будут выполняться работы:";
  objectInputElement.classList.remove("hidden");
  objectInputElement.value = '';
  viberLink.classList.add("hidden");
  performButton.classList.remove("hidden");
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
  let objectName = objectInputElement.value;
  if (objectName == "") {
    listOfOrderedProducts.innerHTML = "<p><strong>Ошибка: объект неопределен. Список не может быть сформирован без указания сведений об объекте. Пожалуйста, введите название объекта (см. текстовое поле в начале страницы).</strong></p>";
    return 0;
  };
  const objectNameHTML = `<p>===Объект выполнения работ: ${objectName}===</p>`;
  const goodsHTML = Array
    .from(document.querySelectorAll("input[type=checkbox]"))
    .filter((el) => el.checked)
    .map((el) => {
      let quantity = el.parentNode.nextSibling.value;
      return `<p>${el.id}</p><p>.....${quantity}</p>`
    })
    .join('');

    listOfOrderedProducts.innerHTML = objectNameHTML + goodsHTML;

    //create a share-via-viber link
    let message = listOfOrderedProducts.innerText;
    viberLink.href = `viber://forward?text=<${message}>`;
    if (message.length > 200) {      
      viberLink.classList.add("hidden");
    };
    if (message.length <= 200) {      
      viberLink.classList.remove("hidden");
    };
}