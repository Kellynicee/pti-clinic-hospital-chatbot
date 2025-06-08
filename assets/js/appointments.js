const patient = localStorage.getItem('username');
const role = localStorage.getItem('role');

if (!patient || role !== 'patient') {
  window.location.href = '../home-page/login.html';
}

function bookAppointment() {
  const doctor = document.getElementById('doctor').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const successMsg = document.getElementById('success-msg');

  if (!doctor || !date || !time) {
    successMsg.textContent = '❌ Please fill all fields.';
    successMsg.style.color = 'red';
    return;
  }

  const appointment = {
    patient,
    doctor,
    date,
    time,
  };

  const allAppointments =
    JSON.parse(localStorage.getItem('appointments')) || [];
  allAppointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(allAppointments));

  successMsg.textContent = '✅ Appointment successfully booked!';
  successMsg.style.color = 'green';

  document.getElementById('doctor').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';
}
