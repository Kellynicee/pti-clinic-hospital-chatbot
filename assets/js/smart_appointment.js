const fields = {
  doctor: [
    'General Practice',
    'Cardiology',
    'Paediatrics',
    'Dermatology',
    'Urology',
    'Endocrinology',
    'Gastroenterology',
    'Nephrology',
    'Surgery',
  ],
  nurse: [
    'General Nursing',
    'Vaccination',
    'Vital Signs & Monitoring',
    'Health Counselling',
  ],
  pharmacist: [
    'Dispensing Drugs',
    'Injection Prep',
    'Drug Counselling',
    'Refill Management',
  ],
  therapist: [
    'Mental Health',
    'Counselling',
    'Psychotherapy',
    'Rehabilitation',
  ],
  physiotherapist: [
    'Stroke Rehab',
    'Back Pain Relief',
    'Mobility Training',
    'Post-surgery Recovery',
  ],
};

const bios = [
  'Caring and experienced healthcare provider.',
  'Certified and trusted medical professional.',
  'Over 10 years of clinical experience.',
  'Expert in personalized treatment and care.',
];

function updateSpecializations() {
  const careType = document.getElementById('careType').value;
  const specSelect = document.getElementById('specialization');
  specSelect.innerHTML = `<option value="">-- Select Field --</option>`;

  fields[careType]?.forEach((field) => {
    const option = document.createElement('option');
    option.textContent = field;
    option.value = field;
    specSelect.appendChild(option);
  });

  document.getElementById('professionalsList').innerHTML = '';
  document.getElementById('success-msg').textContent = '';
}

function handleUrgency() {
  const urgency = document.getElementById('urgency').value;
  const careMode = document.getElementById('careMode').value;
  const timeBox = document.getElementById('bookingTime');

  if (urgency === 'urgent' && careMode === 'video') {
    window.location.href = 'video_consultation.html';
  } else {
    timeBox.style.display = 'block';
  }
}

function handleCareMode() {
  const mode = document.getElementById('careMode').value;
  const urgency = document.getElementById('urgency').value;
  const box = document.getElementById('instructionsBox');
  const timeBox = document.getElementById('bookingTime');

  if (mode === 'clinic') {
    box.style.display = 'block';
    box.innerHTML = `
        <strong>Instructions:</strong> Visit the PTI Clinic reception with your clinic card.
        You’ll be directed to the appropriate department.
      `;
    timeBox.style.display = 'none';
    showProfessionals();
  } else if (mode === 'video') {
    box.style.display = 'block';
    box.innerHTML =
      urgency === 'urgent'
        ? '<strong>You can start consultation immediately!</strong>'
        : '';
    timeBox.style.display = urgency === 'non-urgent' ? 'block' : 'none';
    showProfessionals();
  } else if (mode === 'home') {
    box.style.display = 'block';
    box.innerHTML =
      '<strong>Doctor/Nurse will visit your registered PTI residence.</strong>';
    timeBox.style.display = 'block';
    showProfessionals();
  } else {
    box.style.display = 'none';
    timeBox.style.display = 'none';
  }
}

function showProfessionals() {
  const careType = document.getElementById('careType').value;
  const specialization = document.getElementById('specialization').value;
  const list = document.getElementById('professionalsList');

  if (!careType || !specialization) return;

  list.innerHTML = '';

  for (let i = 1; i <= 3; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="https://randomuser.me/api/portraits/med/${
          i % 2 === 0 ? 'men' : 'women'
        }/${10 + i}.jpg" />
        <h4>Dr. ${specialization} ${i}</h4>
        <p>${bios[i % bios.length]}</p>
        <p><strong>Field:</strong> ${specialization}</p>
        <p><strong>Experience:</strong> ${3 + i} yrs</p>
        <p><strong>Certification:</strong> PTI Certified</p>
        <button onclick="bookNow('${specialization}')">Book Appointment</button>
      `;
    list.appendChild(card);
  }
}

function bookNow(field) {
  document.getElementById(
    'success-msg'
  ).textContent = `✅ Appointment with ${field} specialist successfully booked! You’ll receive confirmation shortly.`;
}
