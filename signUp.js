let isLoggedIn = false;
let LIusername = '';
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');
const signUpButton = document.getElementById('signUpButton');

if (localStorage.getItem('users')) {
  var users = JSON.parse(localStorage.getItem('users'));
} else {
  var users = [];
}
console.log(users);

function setLoggedInUser(user, index) {
  isLoggedIn = true;
  LIusername = user;
  window.localStorage.setItem('isLoggedIn', isLoggedIn);
  window.localStorage.setItem('LIusername', LIusername);
  window.localStorage.setItem('index', index);
}

function signUp() {
  const Iname = document.getElementById('name').value;
  const Iusername = document.getElementById('username').value;
  const Ipassword = document.getElementById('password').value;
  if(Iname === "" || Iusername === "" || Ipassword === "") {
    alert('please fill out the form.');
    return;
  } else {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === Iusername) {
            alert('username already taken on this device.');
            return;
        }
    }
  }
  users.push({name: Iname, username: Iusername, password: Ipassword, myPage_image: "none", myLinks: "none"});
  window.localStorage.setItem('users', JSON.stringify(users));
  setLoggedInUser(Iusername, users.length - 1);
  alert('successfully created ' + Iusername + '!');
  window.location.href = "index.html";
  return;
}

signUpButton.addEventListener('click', signUp);

showPasswordCheckbox.addEventListener('change', function() {
  if (showPasswordCheckbox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});