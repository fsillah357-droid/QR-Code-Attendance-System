   javascript
// Register Page Logic
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
const purpose = document.getElementById('purpose').value;
    const userId = Date.now().toString();

    const user = { userId, fullName, email, phone, purpose };
    localStorage.setItem(userId, JSON.stringify(user));

    // Create QR with user ID only
    const qr = new QRCode(document.getElementById("qrcode"), {
      text: userId,
      width: 200,
      height: 200
    });
  });
}

// Scanner Logic
if (document.getElementById('reader')) {
  function onScanSuccess(decodedText) {
    const data = localStorage.getItem(decodedText);
    const now = new Date().toLocaleString();

    if (data) {
      const user = JSON.parse(data);
      const log = { ...user, time: now };

      let records = JSON.parse(localStorage.getItem('attendance') || '[]');
      records.push(log);
      localStorage.setItem('attendance', JSON.stringify(records));

      document.getElementById('scan-result').innerHTML =
        `<p><strong>user.fullName</strong> marked present at{now}</p>`;
    } else {
      document.getElementById('scan-result').innerText = "Invalid QR Code!";
    }
  }

  const html5QrCode = new Html5Qrcode("reader");
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      html5QrCode.start(
        devices[0].id,
        { fps: 10, qrbox: 250 },
onScanSuccess
      );
    }
  });
}