const role = localStorage.getItem('role');
const nurse = localStorage.getItem('username');

// Access control
if (!nurse || role !== 'nurse') {
  window.location.href = '../home-page/login.html';
}

document.getElementById('nurse-name').textContent = nurse;

// Logout
function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html';
}

// Save Vitals
function saveVitals() {
  const student = document
    .getElementById('studentName')
    .value.trim()
    .toLowerCase();
  const bp = document.getElementById('bp').value.trim();
  const temp = document.getElementById('temperature').value.trim();
  const msg = document.getElementById('success-msg');

  if (!student || !bp || !temp) {
    msg.style.color = 'red';
    msg.textContent = '❌ Please fill all fields.';
    return;
  }

  const newRecord = {
    nurse,
    student,
    bp,
    temp,
    date: new Date().toLocaleString(),
  };

  const vitals = JSON.parse(localStorage.getItem('vitals')) || [];
  vitals.push(newRecord);
  localStorage.setItem('vitals', JSON.stringify(vitals));

  msg.style.color = 'green';
  msg.textContent = '✅ Vitals recorded successfully!';

  // Clear fields
  document.getElementById('studentName').value = '';
  document.getElementById('bp').value = '';
  document.getElementById('temperature').value = '';
}
