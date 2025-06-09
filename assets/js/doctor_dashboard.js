const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

// ✅ Check for doctor login
if (!username || role !== 'doctor') {
  window.location.href = '../home-page/login.html';
}

// ✅ Update welcome text
document.getElementById('user-name').textContent = username;

// ✅ Logout handler
function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html';
}
