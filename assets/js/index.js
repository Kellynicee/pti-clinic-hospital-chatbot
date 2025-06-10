// Toggle mobile menu visibility
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('show');

  // Toggle icon to "X" and back
  const icon = document.querySelector('.menu-toggle i');
  if (icon.classList.contains('fa-bars')) {
    icon.classList.replace('fa-bars', 'fa-times');
  } else {
    icon.classList.replace('fa-times', 'fa-bars');
  }
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('show');
    document
      .querySelector('.menu-toggle i')
      .classList.replace('fa-times', 'fa-bars');
  });
});

// ✅ Automatically close menu when user scrolls
window.addEventListener('scroll', () => {
  const navLinks = document.getElementById('navLinks');
  const icon = document.querySelector('.menu-toggle i');
  if (navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
    icon.classList.replace('fa-times', 'fa-bars');
  }
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  const protectedPages = [
    'chatbot.html',
    'appointments.html',
    'prescriptions.html',
  ];

  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (protectedPages.some((page) => href.includes(page))) {
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');

      if (!username || !role) {
        e.preventDefault();
        alert('You must log in first!');
        window.location.href = 'home-page/login.html';
      }
    }
  });
});
