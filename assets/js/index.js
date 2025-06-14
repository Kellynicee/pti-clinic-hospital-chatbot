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

function toggleChat() {
  const popup = document.getElementById('chat-popup');
  popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
}

function sendChat() {
  const input = document.querySelector('#chat-popup input');
  const msg = input.value.trim();
  if (msg) {
    const chatBody = document.getElementById('chat-body');
    chatBody.innerHTML += `<p class="user-msg" style="text-align:right; color:#007bff">${msg}</p>`;
    chatBody.innerHTML += `<p class="bot-msg">Sorry, this is a demo response 😊</p>`;
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

function animateCounter() {
  document.querySelectorAll('.counter').forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-count');
      const current = +counter.innerText;
      const increment = target / 100;

      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

window.addEventListener('scroll', () => {
  const stats = document.getElementById('stats');
  if (stats && stats.getBoundingClientRect().top < window.innerHeight) {
    animateCounter();
  }
});

document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isVisible = answer.style.display === 'block';
    document
      .querySelectorAll('.faq-answer')
      .forEach((a) => (a.style.display = 'none'));
    answer.style.display = isVisible ? 'none' : 'block';
  });
});
