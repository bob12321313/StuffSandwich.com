const settings = document.getElementById("settings");
const title = document.getElementById("titleDIV");
let showMenu = "yes";
const addLinkButton = document.getElementById('addLink');
const deleteLinkButton = document.getElementById('deleteButton');

settings.classList.add('position');

function uploadFile() {
  const users = JSON.parse(localStorage.getItem('users'));
  const users_index = parseInt(localStorage.getItem('index'));
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const reader = new FileReader();

  if (fileInput.files.length === 0) {
    console.log('File input is empty');
    users[users_index].myPage_image = "none";
    window.localStorage.setItem('users', JSON.stringify(users));
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  reader.onload = function(event) {
    const imageData = event.target.result;
    console.log(imageData);
    users[users_index].myPage_image = imageData;
    window.localStorage.setItem('users', JSON.stringify(users));

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = imageData;

    img.onload = function() {
      img.width = canvas.width;
      img.height = canvas.height;

      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  reader.readAsDataURL(file);
}

window.onload = function() {
  const users = JSON.parse(localStorage.getItem('users'));
  const users_index = parseInt(localStorage.getItem('index'));
  const imageData = users[users_index].myPage_image;

  console.log(imageData);
  title.textContent = users[users_index].username;
    
  if (imageData === "none") {
    console.log('add a background image!');
  } else if (imageData) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = imageData;

    img.onload = function() {
      img.width = canvas.width;
      img.height = canvas.height;

      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }
  
  if (users[users_index].myLinks === "none") {
    console.log('create some links!');
  } else {
    let links = users[users_index].myLinks;
    
    for (let i = 0; i < links.length; i++) {
      const linkText = links[i].name;
      const linkURL = links[i].url;

      const menu = document.getElementById('menu');
      const newLink = document.createElement('li');
      newLink.innerHTML = `<a href="${linkURL}">${linkText}</a>`;
      menu.appendChild(newLink);
    }
  }
};

function toggleMenu() {
  if (showMenu === "yes") {
    settings.classList.remove("show");
    settings.classList.add("hide");
    showMenu = "no";
  } else {
    settings.classList.remove("hide");
    settings.classList.add("show");
    showMenu = "yes";
  }
}

addLinkButton.addEventListener('click', function() {
  const users = JSON.parse(localStorage.getItem('users'));
  const users_index = parseInt(localStorage.getItem('index'));

  if(users[users_index].myLinks === "none") {
    let links = [];
    const linkText = document.getElementById('linkText').value;
    const linkURL = document.getElementById('linkURL').value;

    if (linkText && linkURL) {
      const menu = document.getElementById('menu');
      const newLink = document.createElement('li');
      newLink.innerHTML = `<a href="${linkURL}">${linkText}</a>`;
      menu.appendChild(newLink);
      links.push({name: linkText, url: linkURL});
      users[users_index].myLinks = links;
      window.localStorage.setItem('users', JSON.stringify(users));

      // Clear input fields
      document.getElementById('linkText').value = '';
    }
  } else {
    let links = users[users_index].myLinks;
    const linkText = document.getElementById('linkText').value;
    const linkURL = document.getElementById('linkURL').value;

    if (linkText && linkURL) {
      const menu = document.getElementById('menu');
      const newLink = document.createElement('li');
      newLink.innerHTML = `<a href="${linkURL}">${linkText}</a>`;
      menu.appendChild(newLink);
      links.push({name: linkText, url: linkURL});
      users[users_index].myLinks = links;
      window.localStorage.setItem('users', JSON.stringify(users));

      // Clear input fields
      document.getElementById('linkText').value = '';
    }
  }
});

deleteLinkButton.addEventListener('click', function() {
  const users = JSON.parse(localStorage.getItem('users'));
  const users_index = parseInt(localStorage.getItem('index'));
 
  users[users_index].myLinks = "none";
  window.localStorage.setItem('users', JSON.stringify(users));
  location.reload();     
});