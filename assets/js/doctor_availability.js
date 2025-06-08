const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

if (!username || role !== 'doctor') {
  window.location.href = 'login.html';
}

document.getElementById('doctor-name').textContent = username;

function saveAvailability() {
  const date = document.getElementById('availableDate').value;
  const time = document.getElementById('availableTime').value;
  const msg = document.getElementById('success-msg');

  if (!date || !time) {
    msg.style.color = 'red';
    msg.textContent = 'Please select both date and time.';
    return;
  }

  const availability = {
    doctor: username,
    date: date,
    time: time,
  };

  let slots = JSON.parse(localStorage.getItem('availability')) || [];
  slots.push(availability);
  localStorage.setItem('availability', JSON.stringify(slots));

  msg.style.color = 'green';
  msg.textContent = 'Availability saved successfully!';

  document.getElementById('availableDate').value = '';
  document.getElementById('availableTime').value = '';
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
