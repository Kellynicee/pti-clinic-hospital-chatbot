const name = localStorage.getItem('username');
const role = localStorage.getItem('role');

if (!name || role !== 'doctor') {
  window.location.href = '../home-page/login.html';
} else {
  document.getElementById('user-name').textContent = name;
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
