const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

var x = document.getElementById('sub_menu');
var y = document.getElementById('sub');

x.addEventListener('mouseenter', function() {
  x.style.display = 'block'; // Keep submenu open when mouse enters submenu
});


y.addEventListener('click', function() {
  x.style.display = 'block';
});
