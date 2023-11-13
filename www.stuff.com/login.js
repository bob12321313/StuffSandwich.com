const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');
let isLoggedIn = false;
let LIusername = '';

function setLoggedInUser(user, index) { 
  isLoggedIn = true;
  LIusername = user;
  window.localStorage.setItem('isLoggedIn', isLoggedIn);
  window.localStorage.setItem('LIusername', LIusername);
  window.localStorage.setItem('index', index);
}

function logoutUser() {
  isLoggedIn = false;
  LIusername = '';
  window.localStorage.removeItem('isLoggedIn');
  window.localStorage.removeItem('LIusername');
  window.localStorage.removeItem('index');
}

const loginButton = document.getElementById('loginButton');

if (localStorage.getItem('users')) {
  var users = JSON.parse(localStorage.getItem('users'));
} else {
  var users = [];
}

function login() {
  const userInput = document.getElementById('username').value;
  const passInput = document.getElementById('password').value;
  if (users.length < 1) {
    alert('No users have been created on this device. Create a user to continue.');
    return false;
  }
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === userInput && users[i].password === passInput) {
      console.log(i);
      alert('Successfully logged in ' + userInput + '!');
      setLoggedInUser(userInput, i);
      changePage = true;
      return true;
    }
  }
  alert('Login failed :(');
  return false;
}

loginButton.addEventListener('click', login);

showPasswordCheckbox.addEventListener('change', function() {
  if (showPasswordCheckbox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

