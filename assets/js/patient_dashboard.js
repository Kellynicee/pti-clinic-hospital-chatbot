// File: assets/js/patient_dashboard.js

const role = localStorage.getItem('role');
const username = localStorage.getItem('username');
const department = localStorage.getItem('department');
const section = localStorage.getItem('section');
const refNumber = localStorage.getItem('refNumber');

// ✅ Redirect if not a logged-in patient
if (!username || role !== 'patient') {
  window.location.href = '../home-page/login.html';
}

// ✅ Show user info on dashboard
document.getElementById('username').textContent = username;
document.getElementById('department').textContent = department || '—';
document.getElementById('section').textContent = section || '—';
document.getElementById('refNumber').textContent = refNumber || '—';

// ✅ Navigation actions
function goToAppointments() {
  window.location.href = '../pages/appointments.html';
}

function goToChatbot() {
  window.location.href = '../pages/chatbot.html';
}

function goToHistory() {
  window.location.href = '../pages/view_patient_history.html';
}

function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html';
}
