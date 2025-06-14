function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('show');
  const icon = document.querySelector('.menu-toggle i');
  icon.classList.toggle('fa-times');
  icon.classList.toggle('fa-bars');
}

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('show');
    document
      .querySelector('.menu-toggle i')
      .classList.replace('fa-times', 'fa-bars');
  });
});

window.addEventListener('scroll', () => {
  const navLinks = document.getElementById('navLinks');
  const icon = document.querySelector('.menu-toggle i');
  if (navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
    icon.classList.replace('fa-times', 'fa-bars');
  }
});
