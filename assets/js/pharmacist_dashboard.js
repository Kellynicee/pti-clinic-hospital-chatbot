// Ensure only pharmacists can access this page
const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

if (!username || role !== 'pharmacist') {
  window.location.href = '../home-page/login.html';
}

// Show pharmacist name (optional enhancement)
document.getElementById('user-name').textContent = username;

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html';
}

// Load and display prescriptions
const table = document.getElementById('prescriptionTable');
const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
const dispensed = JSON.parse(localStorage.getItem('dispensed')) || [];

// Clear table first
table.innerHTML = '';

// Render prescription rows
prescriptions.forEach((prescription, index) => {
  const isGiven = dispensed.includes(index);
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${prescription.patient}</td>
    <td>${prescription.date}</td>
    <td>${prescription.doctor}</td>
    <td>${prescription.notes}</td>
    <td>
      ${
        isGiven
          ? '<span style="color: green;">✅ Given</span>'
          : `<button onclick="markDispensed(${index})">Mark Given</button>`
      }
    </td>
  `;

  table.appendChild(row);
});

// Mark prescription as dispensed
function markDispensed(index) {
  const updated = JSON.parse(localStorage.getItem('dispensed')) || [];

  if (!updated.includes(index)) {
    updated.push(index);
    localStorage.setItem('dispensed', JSON.stringify(updated));
    location.reload(); // Refresh to show update
  }
}
