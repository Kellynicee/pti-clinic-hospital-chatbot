function login() {
  const role = document.getElementById('role').value;
  const user = document.getElementById('username').value.trim();
  const err = document.getElementById('error-msg');

  if (!role || !user) {
    err.textContent = 'Please select role and enter username.';
    return;
  }

  localStorage.setItem('role', role);
  localStorage.setItem('username', user);

  // Redirect to the correct folder based on role
  window.location.href = '../dashboards/' + role + '_dashboard.html';
}
