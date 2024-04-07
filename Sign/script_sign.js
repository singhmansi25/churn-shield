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

document.getElementById("signup-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
      // Send form data to the server
      const response = await fetch('/register', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: name,
              email: email,
              password: password
          })
      });

      if (response.ok) {
          // Registration successful
          const data = await response.text();
          alert(data); // Display success message
          window.location.href = "./Sign.html"; // Redirect to login page
      } else {
          // Registration failed
          const errorMessage = await response.text();
          alert(errorMessage); // Display error message
      }
  } catch (error) {
      // console.error('Error:', error);
      alert("Internal server error. Please try again later.");
      window.location.href = "../internalerror.html";
  }
});


document.getElementById("login-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
      // Send form data to the server
      const response = await fetch('/login', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: email,
              password: password
          })
      });

      if (response.ok) {
          // Login successful
          const data = await response.text();
          alert(data); // Display success message
          window.location.href = "./index.html"; // Redirect to landing page
      } else {
          // Login failed
          const errorMessage = await response.text();
          alert(errorMessage); // Display error message
      }
  } catch (error) {
      // console.error('Error:', error);
      alert("Internal server error. Please try again later.");
      window.location.href = "../internalerror.html";
  }
});
