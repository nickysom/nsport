document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const menuLinks = document.querySelectorAll('nav ul li a');
  const dropdownParents = document.querySelectorAll('nav ul li > a');

  if (menuToggle && navMenu) {
      // Toggle main menu
      menuToggle.addEventListener('click', function () {
          navMenu.classList.toggle('active');
          menuToggle.classList.toggle('active');
      });

      // Close menu when a link is clicked (except dropdown parents)
      menuLinks.forEach(link => {
          link.addEventListener('click', function (event) {
              if (!this.parentElement.classList.contains("dropdown")) {
                  navMenu.classList.remove('active');
                  menuToggle.classList.remove('active');
              }
          });
      });

      // Handle dropdown toggle in mobile view
      dropdownParents.forEach(parent => {
          parent.addEventListener('click', function (event) {
              if (this.nextElementSibling && this.nextElementSibling.classList.contains("dropdown")) {
                  event.preventDefault(); // Prevent link navigation
                  this.parentElement.classList.toggle("active"); // Show/Hide dropdown
              }
          });
      });
  }
});


  