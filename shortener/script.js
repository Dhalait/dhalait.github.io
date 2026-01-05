const firebaseConfig = {
  apiKey: "AIzaSyC-bFQky9UW84g9y4Bnysuk0WR0c5EVqgw",
  authDomain: "dhalait-54fa9.firebaseapp.com",
  projectId: "dhalait-54fa9",
  storageBucket: "dhalait-54fa9.firebasestorage.app",
  messagingSenderId: "25482646032",
  appId: "1:25482646032:web:e7040e22ad5012dd4a7095",
  measurementId: "G-LF241G06HJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function generateCode() {
  return Math.random().toString(36).substring(2, 8);
}

async function shorten() {
  const longUrl = document.getElementById('longUrl').value.trim();
  if (!longUrl) return alert("Please enter a URL!");
  const shortCode = generateCode();
  await db.collection('urls').doc(shortCode).set({ long: longUrl });
  const shortUrl = `${window.location.origin}/shortener/?code=${shortCode}`;
  document.getElementById('result').innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
}

window.onload = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (!code) return;
  const doc = await db.collection('urls').doc(code).get();
  if (doc.exists) {
    window.location.href = doc.data().long;
  } else {
    document.body.innerHTML = "<h2>Short URL not found!</h2>";
  }
};
