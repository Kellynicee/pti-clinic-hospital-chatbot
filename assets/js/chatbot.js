const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

if (!username || role !== 'patient') {
  window.location.href = 'login.html';
}

function logout() {
  localStorage.clear();
  window.location.href = '../home-page/login.html'; // adjust path if needed
}

const responses = {
  fever:
    'You may have a viral or bacterial infection. Drink fluids, rest, and take paracetamol. See a doctor if it lasts more than 2 days.',
  headache:
    'Headaches can be caused by stress or dehydration. Drink water, rest, and take paracetamol. See a neurologist if persistent.',
  cough:
    'Cough may indicate cold or flu. Stay warm, drink warm fluids, and consider cough syrup. Visit a doctor if severe.',
  cold: 'Use warm fluids, stay covered, and rest. Over-the-counter meds may help relieve symptoms.',
  sore: 'Sore throat? Gargle warm salt water, drink honey tea, and avoid cold foods. If it worsens, see a general physician.',
  chills: 'Chills may come with fever. Keep warm and monitor your temperature.',
  rash: 'Apply calamine or anti-itch cream. Avoid scratching. If spreading, consult a dermatologist.',
  stomach:
    'Stomach ache may be due to indigestion. Try ginger tea, avoid spicy foods. If pain persists, see a gastroenterologist.',
  diarrhea:
    'Stay hydrated with ORS. Avoid solid food for 12 hours. If continues, visit a doctor.',
  vomiting:
    'Sip fluids slowly, rest, and avoid solid food. If frequent or bloody, seek urgent care.',
  chest:
    'Chest pain can be serious. Avoid stress, rest, and see a cardiologist immediately.',
  heart:
    "Heart issues require attention. If you're having tightness, pain, or palpitations, go to the emergency room.",
  dizziness:
    'Sit down and rest. It may be due to dehydration or low BP. If regular, get checked.',
  fatigue:
    'Fatigue may result from overwork or illness. Rest, eat well, and sleep properly.',
  anxiety:
    "Practice deep breathing or talk to someone. If it's affecting your daily life, consult a therapist.",
  depression:
    "You're not alone. Talk to a counselor or someone you trust. Therapy helps a lot.",
  insomnia:
    'Avoid caffeine at night. Use a calm sleep environment. If it persists, see a doctor.',
  injury:
    "Clean the wound with antiseptic. Cover with a clean bandage. Seek care if bleeding doesn't stop.",
  burn: 'Run cool (not cold) water over the area. Apply aloe vera. Seek help if skin is blistered.',
  back: 'Back pain? Rest, avoid lifting, and apply a warm compress. See an orthopedic if chronic.',
  allergy:
    'Allergic reaction? Take antihistamine if mild. Seek urgent care for swelling or breathing issues.',
  covid:
    'Isolate, monitor symptoms, and test if possible. Rest and hydrate. Seek help if breathing difficulty develops.',
};

function sendMessage() {
  const input = document.getElementById('userInput');
  const chatBox = document.getElementById('chatBox');
  const userText = input.value.trim();

  if (!userText) return;

  appendMessage('You', userText, 'user-msg');
  input.value = '';

  setTimeout(() => {
    const botReply = getOfflineResponse(userText);
    appendMessage('PTI Clinic', botReply, 'bot-msg');
  }, 500);
}

function appendMessage(sender, message, className) {
  const chatBox = document.getElementById('chatBox');
  const msg = `<p class="${className}"><strong>${sender}:</strong> ${message}</p>`;
  chatBox.innerHTML += msg;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getOfflineResponse(message) {
  const found = Object.keys(responses).filter((key) =>
    message.toLowerCase().includes(key)
  );

  if (found.length === 0) {
    return "I'm not sure how to help with that. Please describe your symptoms using common health terms like 'fever', 'cough', or 'headache'.";
  }

  return found
    .map((symptom) => `For <strong>${symptom}</strong>: ${responses[symptom]}`)
    .join('<br>');
}
