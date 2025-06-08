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

  // Redirect to the correct dashboard based on role
  // Assuming login.html is in /home-page/, and dashboards are in /dashboards/
  window.location.href = '../dashboards/' + role + '_dashboard.html';
}
