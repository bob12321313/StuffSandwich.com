
const MA = document.getElementById('MA');
const DL = document.getElementById('DL');
const SU = document.getElementById('SU');
const LI = document.getElementById('LI');
const LO = document.getElementById('LO');
const SI = document.getElementById('scrollingInfo');
const MN = document.getElementById("myAccount");
let showMenu = "yes";
const menuP = document.getElementById("menuP");
let MH = "no";
let MS = "no";

menuP.classList.add('position');

const isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'));
const index = JSON.parse(window.localStorage.getItem('index'));
const LIusername = window.localStorage.getItem('LIusername');

if (localStorage.getItem('users')) {
  var users = JSON.parse(localStorage.getItem('users'));
} else {
  var users = [];
}

function showItems() {
  if (isLoggedIn) {
    MA.style.display = "block";
    MN.style.display = "block";
    DL.style.display = "block";
    LO.style.display = "block";
    SU.style.display = "none";
    LI.style.display = "none";

    MN.textContent = LIusername;
  } else {
    MA.style.display = "none";
    MN.style.display = "none";
    DL.style.display = "none";
    LO.style.display = "none";
    SU.style.display = "block";
    LI.style.display = "block";

    MN.textContent = "";
  }
}

function resizeDiv() {
  SI.style.height = (window.innerHeight - 150) + 'px';
}

function logoutUser() {
  window.localStorage.removeItem('isLoggedIn');
  window.localStorage.removeItem('LIusername');
  window.localStorage.removeItem('index');

  MA.style.display = "none";
  DL.style.display = "none";
  LO.style.display = "none";
  SU.style.display = "block";
  LI.style.display = "block";
  MN.style.display = "none";
}

function deleteUser() {
  const result = window.confirm("are you sure you want to delete " + LIusername + "?");
  if (result) {
    users.splice(index, 1);
    window.localStorage.setItem('users', JSON.stringify(users));
    logoutUser();
    return;
  } else {
    return;
  }
}

function menu() {
  window.location.href = "menu.html";
}

const images = ["im1.jpeg", "im2.jpeg", "im3.jpeg", "im4.jpeg", "im5.jpeg"];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  document.body.style.backgroundImage = `url('${randomImage}')`;
}

function toggleMenu() {
  if (showMenu === "yes") {
    menuP.classList.remove("show");
    menuP.classList.add("hide");
    showMenu = "no";
  } else {
    menuP.classList.remove("hide");
    menuP.classList.add("show");
    showMenu = "yes";
  }
}

// Add event listener to the window's "resize" event
window.addEventListener('resize', resizeDiv);

// Add event listener to the menuP element's "click" event
menuP.addEventListener('click', toggleMenu);
LO.addEventListener('click', logoutUser);
DL.addEventListener('click', deleteUser);

// Initial resize when the page loads
resizeDiv();
getRandomImage();
showItems();