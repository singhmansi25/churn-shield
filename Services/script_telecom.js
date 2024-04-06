var x = document.getElementById('sub_menu');
var y = document.getElementById('sub');

x.addEventListener('mouseenter', function() {
  x.style.display = 'block'; // Keep submenu open when mouse enters submenu
});


y.addEventListener('click', function() {
  x.style.display = 'block';
});