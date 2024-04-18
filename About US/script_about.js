var x = document.getElementById('sub_menu');
var y = document.getElementById('sub');

x.addEventListener('mouseenter', function() {
  x.style.display = 'block'; // Keep submenu open when mouse enters submenu
});


y.addEventListener('click', function() {
  x.style.display = 'block';
});

var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.background-video');
  video.playbackRate = 0.4; // Set the playback rate to 0.5x
});