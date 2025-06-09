// File: assets/js/my_history.js

const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

if (!username || role !== 'patient') {
  window.location.href = '../home-page/login.html';
}

function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html';
}

const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
const vitals = JSON.parse(localStorage.getItem('vitals')) || [];

const apptTable = document.getElementById('appointmentTable');
const rxTable = document.getElementById('prescriptionTable');
const vitalsTable = document.getElementById('vitalsTable');

function fillTables() {
  const myAppointments = appointments.filter((a) => a.patient === username);
  const myPrescriptions = prescriptions.filter((p) => p.patient === username);
  const myVitals = vitals.filter((v) => v.student === username);

  if (myAppointments.length === 0) {
    apptTable.innerHTML = '<tr><td colspan="2">No appointments.</td></tr>';
  } else {
    myAppointments.forEach((a) => {
      apptTable.innerHTML += `<tr><td>${a.date}</td><td>${
        a.reason || 'N/A'
      }</td></tr>`;
    });
  }

  if (myPrescriptions.length === 0) {
    rxTable.innerHTML = '<tr><td colspan="3">No prescriptions.</td></tr>';
  } else {
    myPrescriptions.forEach((p) => {
      rxTable.innerHTML += `<tr><td>${p.date}</td><td>${p.doctor}</td><td>${p.notes}</td></tr>`;
    });
  }

  if (myVitals.length === 0) {
    vitalsTable.innerHTML = '<tr><td colspan="3">No vitals recorded.</td></tr>';
  } else {
    myVitals.forEach((v) => {
      vitalsTable.innerHTML += `<tr><td>${v.date}</td><td>${v.bp}</td><td>${v.temp}</td></tr>`;
    });
  }
}

function downloadPDF() {
  const report = document.getElementById('report');
  html2pdf().from(report).save('my_medical_history.pdf');
}

fillTables();
