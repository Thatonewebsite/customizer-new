// Initialize EmailJS
emailjs.init('Rtkcht6XjUgzbH1ez'); // Your EmailJS Public Key

let uploadedFile;
let uploadedFileURL = '';
let previewImageURL = '';

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
        id: 44697551044796, // Your Shopify Variant ID
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

  // Step 1: Upload the customer's original logo to Uploadcare
  const logoData = new FormData();
  logoData.append('UPLOADCARE_STORE', '1');
  logoData.append('UPLOADCARE_PUB_KEY', 'caf3256ca08a6169a6a3'); // Your Uploadcare Public Key
  logoData.append('file', uploadedFile);

  fetch('https://upload.uploadcare.com/base/', {
    method: 'POST',
    body: logoData
  })
  .then(response => response.json())
  .then(data => {
    uploadedFileURL = `https://ucarecdn.com/${data.file}/`;

    // Step 2: Now capture screenshot
    return html2canvas(document.querySelector('.preview-area'));
  })
  .then(canvas => {
    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        const screenshotData = new FormData();
        screenshotData.append('UPLOADCARE_STORE', '1');
        screenshotData.append('UPLOADCARE_PUB_KEY', 'caf3256ca08a6169a6a3');
        screenshotData.append('file', blob, 'preview.png');

        fetch('https://upload.uploadcare.com/base/', {
          method: 'POST',
          body: screenshotData
        })
        .then(response => response.json())
        .then(data => {
          previewImageURL = `https://ucarecdn.com/${data.file}/`;
          resolve();
        });
      });
    });
  })
  .then(() => {
    // Step 3: Send email with EmailJS
    const emailParams = {
      order_quantities: JSON.stringify(quantities),
      logo_x: logoX,
      logo_y: logoY,
      logo_scale: logoScale,
      logo_rotation: logoRotation,
      uploaded_logo_url: uploadedFileURL,
      preview_image_url: previewImageURL
    };

    return emailjs.send('service_d1teu2a', 'template_28a6vg1', emailParams);
  })
  .then(() => {
    console.log('Email sent successfully!');
    // Step 4: Add items to Shopify cart
    addToShopifyCart(itemsToAdd);
  })
  .catch(error => {
    console.error('Error during process:', error);
    alert('There was a problem submitting the customization.');
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
