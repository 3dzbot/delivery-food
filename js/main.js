const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//day 1 
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.getElementById('logInForm');
const loginInput = document.getElementById('login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');


let login = localStorage.getItem('gloDelivery');

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

  console.log('Авторизован');
  buttonAuth.style.display = 'none';

  userName.textContent = login;

  userName.style.display = 'inline-block';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);
}

function notAutorized() {
  console.log('Не авторизован');

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

function checkAuth(){
  if(login) {
    autorized();
  } else {
    notAutorized();
  }
}

checkAuth();