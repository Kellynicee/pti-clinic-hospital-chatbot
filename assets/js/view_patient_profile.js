// File: assets/js/view_patient_profile.js
const role = localStorage.getItem('role');
const patient = localStorage.getItem('username');

if (!role || !patient || role !== 'nurse') {
  window.location.href = '../home-page/login.html';
}

// Simulated patient data (can be loaded from localStorage or an admin tool)
const mockProfile = {
  name: 'John Doe',
  department: 'Computer Science',
  section: '2022/2025',
  refNo: 'CS212',
};

document.getElementById('patientName').textContent = mockProfile.name;
document.getElementById('patientDept').textContent = mockProfile.department;
document.getElementById('patientSection').textContent = mockProfile.section;
document.getElementById('patientRef').textContent = mockProfile.refNo;

// Appointments
const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
const patientAppointments = allAppointments.filter(
  (a) => a.patient === mockProfile.name.toLowerCase()
);

const appointmentTable = document.getElementById('appointmentTable');
appointmentTable.innerHTML =
  patientAppointments
    .map(
      (app) => `
  <tr>
    <td>${app.date}</td>
    <td>${app.time}</td>
    <td>${app.doctor}</td>
  </tr>
`
    )
    .join('') ||
  `<tr><td colspan="3" style="text-align:center;">No records found.</td></tr>`;

// Prescriptions
const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
const patientPrescriptions = prescriptions.filter(
  (p) => p.patient === mockProfile.name.toLowerCase()
);

const prescriptionTable = document.getElementById('prescriptionTable');
prescriptionTable.innerHTML =
  patientPrescriptions
    .map(
      (p) => `
  <tr>
    <td>${p.date}</td>
    <td>${p.doctor}</td>
    <td>${p.notes}</td>
  </tr>
`
    )
    .join('') ||
  `<tr><td colspan="3" style="text-align:center;">No prescriptions found.</td></tr>`;

function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html';
}
