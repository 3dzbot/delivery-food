'use strict';

//day 1 
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.getElementById('logInForm');
const loginInput = document.getElementById('login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toogleModalAuth(){
  modalAuth.classList.toggle('is-open');
}

function autorized() {

  function logOut(){
    login = null;
    localStorage.removeItem('gloDelivery');
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonAuth.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  buttonAuth.style.display = 'none';
  userName.textContent = login;
  userName.style.display = 'inline-block';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);
}

function notAutorized() {

  function logIn(e){
    e.preventDefault();
    login = loginInput.value.trim();
    if(login){
      localStorage.setItem('gloDelivery', login);    
      toogleModalAuth();
      buttonAuth.removeEventListener('click', toogleModalAuth);
      closeAuth.removeEventListener('click', toogleModalAuth);
      loginForm.removeEventListener('submit', logIn);
      loginForm.reset();
      checkAuth();
    } else {
      alert('Input login');
    }
  }

  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  loginForm.addEventListener('submit', logIn);
}

//вывод контента и функционала в зависимости от авторизации
function checkAuth(){
  if(login) {
    autorized();
  } else {
    notAutorized();
  }
}

//создание перечня ассортимента ресторанов на главной странице
function createCardRestaurant(){
  const card = `
    <a class="card card-restaurant">
      <img src="img/gusi-lebedi/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Гуси Лебеди</h3>
          <span class="card-tag tag">75 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 1 000 ₽</div>
          <div class="category">Русская кухня</div>
        </div>
      </div>
    </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeEnd', card)
}

//создание карточки товара выбранного ресторана
function createCardGood(){
  const card = document.createElement('div');
  card.classList.add('card');  
  card.insertAdjacentHTML('beforeEnd', `
    <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Классика</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
          грибы.
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">510 ₽</strong>
      </div>
    </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card)
}

//открытие (генерация) карт с товарами выбранного ресторана
function openGoods(e){
  const target = e.target;
  const restaurant = target.closest('.card-restaurant'); 

  if(restaurant && login){
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');
    cardsMenu.textContent = '';
    createCardGood();
    createCardGood();
    createCardGood();
    createCardGood();
  } else if (restaurant && !login){
    toogleModalAuth();
  }
}

//делегирования собития по секции с перечнем ассортимента ресторанов
cardsRestaurants.addEventListener('click', openGoods);

//при клике на лого возвращаемся к исходному состоянию
logo.addEventListener('click', function(){
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
})

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();