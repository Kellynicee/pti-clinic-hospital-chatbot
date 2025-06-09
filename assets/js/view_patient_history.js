const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

// ✅ Allow both doctor and patient
if (!username || (role !== 'doctor' && role !== 'patient')) {
  window.location.href = '../home-page/login.html';
}

// ✅ Show or hide filters depending on role
window.onload = function () {
  if (role === 'patient') {
    // Auto fill and hide patient input
    document.getElementById('patientName').value = username;
    document.getElementById('patientName').disabled = true;
    document.getElementById('doctorFilter').style.display = 'none';
  }

  loadPatientHistory();
};

function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html';
}

function loadPatientHistory() {
  const patient = document
    .getElementById('patientName')
    .value.trim()
    .toLowerCase();
  const start = new Date(
    document.getElementById('startDate').value || '2000-01-01'
  );
  const end = new Date(
    document.getElementById('endDate').value || '2100-12-31'
  );
  const doctorFilter = document
    .getElementById('doctorFilter')
    .value.trim()
    .toLowerCase();

  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];

  const apptTable = document.getElementById('appointmentTable');
  const rxTable = document.getElementById('prescriptionTable');

  apptTable.innerHTML = '';
  rxTable.innerHTML = '';

  // Appointments filter
  const apptFiltered = appointments.filter(
    (a) =>
      a.patient === patient &&
      new Date(a.date) >= start &&
      new Date(a.date) <= end
  );

  if (apptFiltered.length === 0) {
    apptTable.innerHTML =
      '<tr><td colspan="2" style="text-align:center;">No appointments found.</td></tr>';
  } else {
    apptFiltered.forEach((a) => {
      apptTable.innerHTML += `<tr><td>${a.date}</td><td>${
        a.reason || 'N/A'
      }</td></tr>`;
    });
  }

  // Prescriptions filter
  const rxFiltered = prescriptions.filter(
    (p) =>
      p.patient === patient &&
      new Date(p.date) >= start &&
      new Date(p.date) <= end &&
      (role === 'patient' ||
        !doctorFilter ||
        p.doctor.toLowerCase().includes(doctorFilter))
  );

  if (rxFiltered.length === 0) {
    rxTable.innerHTML =
      '<tr><td colspan="3" style="text-align:center;">No prescriptions found.</td></tr>';
  } else {
    rxFiltered.forEach((p) => {
      rxTable.innerHTML += `<tr><td>${p.date}</td><td>${p.doctor}</td><td>${p.notes}</td></tr>`;
    });
  }
}

function downloadPDF() {
  const element = document.getElementById('report');
  html2pdf().from(element).save('patient-history.pdf');
}
