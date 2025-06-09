// File: assets/js/login.js

function login() {
  const role = document.getElementById('role').value;
  const username = document.getElementById('username').value.trim();
  const err = document.getElementById('error-msg');

  if (!role || !username) {
    err.textContent = 'Please select a role and enter your username.';
    return;
  }

  // If role is patient, validate extra fields
  if (role === 'patient') {
    const department = document.getElementById('department').value;
    const section = document.getElementById('section').value.trim();
    const ref = document.getElementById('ref').value.trim();

    if (!department || !section || !ref) {
      err.textContent = 'Please complete all clinic card details.';
      return;
    }

    // Store student-specific info
    localStorage.setItem('department', department);
    localStorage.setItem('section', section);
    localStorage.setItem('refNumber', ref);
  }

  // Store common info
  localStorage.setItem('role', role);
  localStorage.setItem('username', username);

  // Redirect based on selected role
  switch (role) {
    case 'admin':
      window.location.href = '../dashboards/admin_dashboard.html';
      break;
    case 'doctor':
      window.location.href = '../dashboards/doctor_dashboard.html';
      break;
    case 'pharmacist':
      window.location.href = '../dashboards/pharmacist_dashboard.html';
      break;
    case 'nurse':
      window.location.href = '../dashboards/nurse_dashboard.html';
      break;
    case 'patient':
      window.location.href = '../dashboards/patient_dashboard.html';
      break;
    default:
      err.textContent = 'Invalid role selected.';
  }
}
