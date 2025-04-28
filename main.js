// Initialize EmailJS
emailjs.init('Rtkcht6XjUgzbH1ez'); // Your Public Key

let uploadedFile;

// Handle file upload
const logoInput = document.getElementById('logoInput');
const uploadedLogo = document.getElementById('uploadedLogo');

logoInput.addEventListener('change', (event) => {
  uploadedFile = event.target.files[0];

  if (uploadedFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedLogo.src = e.target.result;
      uploadedLogo.style.display = 'block';
    }
    reader.readAsDataURL(uploadedFile);
  }
});

// Logo transform settings
let logoX = 0;
let logoY = 0;
let logoScale = 1;
let logoRotation = 0;

function updateLogoTransform() {
  uploadedLogo.style.transform = `translate(-50%, -50%) translate(${logoX}px, ${logoY}px) scale(${logoScale}) rotate(${logoRotation}deg)`;
}

function moveLogo(direction) {
  const moveAmount = 10;
  if (direction === 'up') logoY -= moveAmount;
  if (direction === 'down') logoY += moveAmount;
  if (direction === 'left') logoX -= moveAmount;
  if (direction === 'right') logoX += moveAmount;
  updateLogoTransform();
}

function resizeLogo(action) {
  const scaleAmount = 0.1;
  if (action === 'bigger') logoScale += scaleAmount;
  if (action === 'smaller') logoScale = Math.max(0.1, logoScale - scaleAmount);
  updateLogoTransform();
}

function rotateLogo() {
  logoRotation = (logoRotation + 15) % 360;
  updateLogoTransform();
}

function finishCustomization() {
  if (!uploadedFile) {
    alert('Please upload a logo before finishing.');
    return;
  }

  const colorBlocks = document.querySelectorAll('.color-block');
  const itemsToAdd = [];
  const quantities = {};

  colorBlocks.forEach(block => {
    const colorName = block.childNodes[0].textContent.trim();
    const input = block.querySelector('input');
    const quantity = parseInt(input.value, 10) || 0;

    if (quantity > 0) {
      itemsToAdd.push({
        id: 44697551044796,
        quantity: quantity,
        properties: {
          Color: colorName
        }
      });

      quantities[colorName] = quantity;
    }
  });

  if (itemsToAdd.length === 0) {
    alert('Please select at least one quantity before finishing.');
    return;
  }

  html2canvas(document.querySelector('.preview-area')).then(canvas => {
    canvas.toBlob(blob => {
      const formData = new FormData();
      formData.append('service_id', 'service_d1teu2a');
      formData.append('template_id', 'template_28a6vg1');
      formData.append('user_id', 'Rtkcht6XjUgzbH1ez');
      formData.append('attachment', blob, 'preview.png');
      formData.append('logo_upload', uploadedFile, uploadedFile.name);
      formData.append('order_quantities', JSON.stringify(quantities));
      formData.append('logo_x', logoX);
      formData.append('logo_y', logoY);
      formData.append('logo_scale', logoScale);
      formData.append('logo_rotation', logoRotation);

      fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          console.log('Email sent successfully!');
          addToShopifyCart(itemsToAdd);
        } else {
          console.error('Failed to send email.');
          alert('There was a problem sending the customization email.');
        }
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert('There was a problem sending the customization email.');
      });
    });
  });
}

function addToShopifyCart(items) {
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items: items })
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/cart';
    } else {
      alert('There was a problem adding items to cart.');
    }
  })
  .catch(error => {
    console.error('Error adding to cart:', error);
    alert('There was a problem adding to cart.');
  });
}
