var x = document.getElementById('sub_menu');
var y = document.getElementById('sub');

x.addEventListener('mouseenter', function() {
  x.style.display = 'block'; // Keep submenu open when mouse enters submenu
});


y.addEventListener('click', function() {
  x.style.display = 'block';
});

// Send a POST request to the /send endpoint when the form is submitted
document.querySelector('form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  try {
      const response = await fetch('/send', {
          method: 'post',
          body: new FormData(this) // Send form data
      });
      const data = await response.json(); // Parse JSON response
      // Display a pop-up message with the response message
      alert(data.message);
      // Redirect to the contact page 
      window.location.href = './Contact.html';
  } catch (error) {
      // console.error('Error:', error);
      window.location.href = '../internalerror.html';
  }
});