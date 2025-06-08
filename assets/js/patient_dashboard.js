const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

if (!username || role !== 'patient') {
  window.location.href = '../home-page/login.html'; // Go back to login
}

document.getElementById('username').textContent = username;

function goToAppointments() {
  window.location.href = '../pages/appointments.html'; // FIXED PATH
}

function goToChatbot() {
  window.location.href = '../pages/chatbot.html'; // FIXED PATH
}

function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html'; // FIXED PATH
}
