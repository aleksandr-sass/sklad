let startButton = document.querySelector("#start");
let performButton = document.querySelector("#perform");
let categoriesList = document.querySelector("#category");
let listOfOrderedProducts = document.querySelector("#list");
let hintTextElement = document.querySelector("#hint");
let objectInputElement = document.querySelector("[name=object]");
let viberLink = document.querySelector("#viber");
let textAreaElement = document.querySelector("#text");
let copyButton = document.querySelector("#copy");
let helperText = document.querySelector("#helper");
let finalHint = document.querySelector("#final");

startButton.addEventListener("click", showCategories);
performButton.addEventListener("click", performList);
copyButton.addEventListener("click", copy);

function showCategories() {  
  hintTextElement.innerText = "Введите название объекта, на котором будут выполняться работы:";
  categoriesList.innerHTML = Object
    .keys(obj)
    .map((el) => `<div id="${el}"><button name="${el}" class="category">${el}</button><div name="content" class="hidden"></div></div>`)
    .join('');
  subscribe(".category", showGoods);
  startButton.innerText = 'Очистить';
  objectInputElement.value = '';
  textAreaElement.value = '';
  listOfOrderedProducts.innerHTML = '';
  hide(viberLink, helperText, finalHint, performButton, textAreaElement, copyButton);
  show(objectInputElement, helperText);
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
  subscribe(".goods", showFinalHint);
}

function performList() {
  let objectName = objectInputElement.value;
  if (objectName == "") {
    listOfOrderedProducts.innerHTML = "<p><strong>Ошибка: объект неопределен. Список не может быть сформирован без указания сведений об объекте. Пожалуйста, введите название объекта (см. текстовое поле в начале страницы).</strong></p>";
    scroll();
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
  let message = listOfOrderedProducts.innerText;
  viberLink.href = `viber://forward?text=<${message}>`;
  if (message.length > 200) {      
    hide(viberLink);
  } else {
    show(viberLink);
  }
  textAreaElement.value = message;
  show(textAreaElement, copyButton);
  scroll();
}

function copy() {
  let copyText = document.querySelector("#text");
  copyText.select();
  document.execCommand("copy");
}

function showFinalHint() {
  show(finalHint, performButton);
}

function show(...args) {
  args.forEach((el) => el.classList.remove("hidden"));
}

function hide(...args) {
  args.forEach((el) => el.classList.add("hidden"));
}

function subscribe(selectorString, handler) {
  let buttonsArray = document.querySelectorAll(selectorString);
  buttonsArray.forEach((el) => el.addEventListener("click", handler));
}

function scroll() {
  listOfOrderedProducts.scrollIntoView({block: "start", behavior: "smooth"});
}