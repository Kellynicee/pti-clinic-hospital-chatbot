const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

if (!username || role !== 'admin') {
  window.location.href = '../home-page/login.html';
}

document.getElementById('admin-name').textContent = username;

function loadDoctors() {
  const list = document.getElementById('doctorList');
  list.innerHTML = '';
  const doctors = JSON.parse(localStorage.getItem('doctors')) || [];

  if (doctors.length === 0) {
    list.innerHTML = '<li>No doctors added yet.</li>';
    return;
  }

  doctors.forEach((doc, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="row">
      <span class="doctor-name">${index + 1}. ${doc.name} (${
      doc.specialty
    })</span>
      <button class="delete-btn" onclick="confirmDelete(${index}, '${
      doc.name
    }')">Delete</button>
    </div>
  `;
    list.appendChild(li);
  });
}

function addDoctor() {
  const name = document.getElementById('newDoctor').value.trim();
  const specialty = document.getElementById('specialty').value;
  const success = document.getElementById('success-msg');

  if (!name || !specialty) {
    success.style.color = 'red';
    success.textContent = 'Please enter name and select a specialty.';
    return;
  }

  let doctors = JSON.parse(localStorage.getItem('doctors')) || [];
  doctors.push({ name, specialty });
  localStorage.setItem('doctors', JSON.stringify(doctors));

  success.style.color = 'green';
  success.textContent = `Doctor '${name}' added successfully.`;

  document.getElementById('newDoctor').value = '';
  document.getElementById('specialty').value = '';
  loadDoctors();
}

function confirmDelete(index, name) {
  if (confirm(`Are you sure you want to delete '${name}'?`)) {
    deleteDoctor(index);
  }
}

function deleteDoctor(index) {
  let doctors = JSON.parse(localStorage.getItem('doctors')) || [];
  doctors.splice(index, 1);
  localStorage.setItem('doctors', JSON.stringify(doctors));
  loadDoctors();
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

loadDoctors();
