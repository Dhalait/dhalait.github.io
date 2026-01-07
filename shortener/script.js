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
  const longUrl = document.getElementById("longUrl").value.trim();
  if (!longUrl) return alert("Please enter a URL!");
  
  const code = generateCode();

  await db.collection("urls").doc(code).set({ long: longUrl });

  const shortUrl = `${window.location.origin}/?code=${code}`;
  showPopup(shortUrl);
}

function showPopup(url) {
  const popup = document.getElementById("popup");
  const linkBox = document.getElementById("popupLink");
  const copyBtn = document.getElementById("copyBtn");

  linkBox.innerText = url;
  popup.classList.remove("hidden");

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(url).then(() => {
      copyBtn.innerText = "Copied";
      setTimeout(() => {
        copyBtn.innerText = "Copy link";
      }, 1500);
    });
  };
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

window.onload = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (!code) return;

  const doc = await db.collection("urls").doc(code).get();
  if (doc.exists) {
    window.location.href = doc.data().long;
  } else {
    document.body.innerHTML = "<h2>Short URL not found!</h2>";
  }
};
