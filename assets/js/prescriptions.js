const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

if (!username || !role) {
  window.location.href = '../home-page/login.html';
}

function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html';
}

if (role === 'doctor') {
  document.getElementById('doctor-view').style.display = 'block';
  loadDoctorPrescriptions();
} else if (role === 'patient') {
  document.getElementById('patient-view').style.display = 'block';
  loadPrescriptions();
} else {
  document.body.innerHTML =
    '<p style="text-align:center;">Unauthorized role.</p>';
}

function addPrescription() {
  const patient = document
    .getElementById('patientName')
    .value.trim()
    .toLowerCase();
  const notes = document.getElementById('prescriptionText').value.trim();
  const msg = document.getElementById('success-msg');

  if (!patient || !notes) {
    msg.style.color = 'red';
    msg.textContent = 'Please fill all fields.';
    return;
  }

  const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
  prescriptions.push({
    doctor: username,
    patient: patient,
    date: new Date().toLocaleDateString(),
    notes: notes,
  });

  localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
  msg.style.color = 'green';
  msg.textContent = 'Prescription added successfully.';

  document.getElementById('patientName').value = '';
  document.getElementById('prescriptionText').value = '';

  loadDoctorPrescriptions();
}

function loadPrescriptions() {
  const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
  const filtered = prescriptions.filter((p) => p.patient === username);
  const table = document.getElementById('prescriptionList');

  if (filtered.length === 0) {
    table.innerHTML =
      '<tr><td colspan="3" style="text-align:center;">No prescriptions found.</td></tr>';
    return;
  }

  table.innerHTML = '';
  filtered.forEach((p) => {
    const row = `<tr><td>${p.date}</td><td>${p.doctor}</td><td>${p.notes}</td></tr>`;
    table.innerHTML += row;
  });
}

function loadDoctorPrescriptions() {
  const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
  const filtered = prescriptions
    .map((p, i) => ({ ...p, id: i }))
    .filter((p) => p.doctor === username);
  const table = document.getElementById('doctorPrescriptions');

  if (filtered.length === 0) {
    table.innerHTML =
      '<tr><td colspan="4" style="text-align:center;">No prescriptions yet.</td></tr>';
    return;
  }

  table.innerHTML = '';
  filtered.forEach((p) => {
    const row = `
          <tr>
            <td>${p.patient}</td>
            <td>${p.date}</td>
            <td contenteditable="true" onblur="editPrescription(${p.id}, this.innerText)">${p.notes}</td>
            <td class="actions">
              <button class="danger" onclick="deletePrescription(${p.id})">Delete</button>
            </td>
          </tr>`;
    table.innerHTML += row;
  });
}

function deletePrescription(index) {
  if (!confirm('Are you sure you want to delete this prescription?')) return;
  const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
  prescriptions.splice(index, 1);
  localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
  loadDoctorPrescriptions();
}

function editPrescription(index, newText) {
  const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
  prescriptions[index].notes = newText.trim();
  localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
}
