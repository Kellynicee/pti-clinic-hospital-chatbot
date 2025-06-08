const role = localStorage.getItem('role');
const doctorName = localStorage.getItem('username');
if (!doctorName || role !== 'doctor') {
  window.location.href = '../home-page/login.html';
}

const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
const tableBody = document.querySelector('#appointments-table tbody');
const doctorAppointments = appointments.filter(
  (app) => app.doctor === doctorName
);

if (doctorAppointments.length === 0) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.colSpan = 3;
  cell.textContent = 'No appointments yet.';
  row.appendChild(cell);
  tableBody.appendChild(row);
} else {
  doctorAppointments.forEach((app) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${app.user}</td>
    <td>${app.date}</td>
    <td>${app.time}</td>
  `;
    tableBody.appendChild(row);
  });
}
