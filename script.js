document.getElementById('qrForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('urlInput').value;
  
    const res = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
  
    const data = await res.json(); // This now works because backend returns JSON
  
    if (data.success) {
      document.getElementById('qrImage').src = 'qr_img.png?' + new Date().getTime();
      document.getElementById('qrImage').style.display = 'block';
      document.getElementById('status').textContent = data.message;
    } else {
      document.getElementById('status').textContent = 'Something went wrong!';
    }
  });
  