let seconds = 0;
let minutes = 0;

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }

  const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
  document.getElementById('timer').textContent = time;
}

const timerInterval = setInterval(updateTimer, 1000);

function endCall() {
  clearInterval(timerInterval);
  alert('Consultation ended. A summary will be sent to your dashboard.');
  window.location.href = '../dashboards/patient_dashboard.html';
}
