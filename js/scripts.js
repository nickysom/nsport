document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const menuLinks = document.querySelectorAll('nav ul li a'); // Select all menu links

  if (menuToggle && navMenu) {
      // Toggle menu on hamburger click
      menuToggle.addEventListener('click', function () {
          navMenu.classList.toggle('active');
          menuToggle.classList.toggle('active');
      });

      // Close menu when a link is clicked
      menuLinks.forEach(link => {
          link.addEventListener('click', function () {
              navMenu.classList.remove('active'); // Hide menu
              menuToggle.classList.remove('active'); // Reset hamburger menu
          });
      });
  }
});

  