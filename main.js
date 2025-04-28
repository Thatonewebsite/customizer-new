// === HANDLE LOGO UPLOAD ===
const logoInput = document.getElementById('logoInput');
const uploadedLogo = document.getElementById('uploadedLogo');

logoInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedLogo.src = e.target.result;
      uploadedLogo.style.display = 'block';
    }
    reader.readAsDataURL(file);
  }
});

// === MOVE LOGO ===
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

// === FINISH CUSTOMIZATION ===
function finishCustomization() {
  const quantities = {};

  const colorBlocks = document.querySelectorAll('.color-block');
  colorBlocks.forEach(block => {
    const colorName = block.textContent.trim().split(' ')[0];
    const input = block.querySelector('input');
    quantities[colorName] = parseInt(input.value, 10) || 0;
  });

  const customizationData = {
    quantities: quantities,
    logoPosition: {
      x: logoX,
      y: logoY,
      scale: logoScale,
      rotation: logoRotation
    },
    logoImage: uploadedLogo.src // base64 image data
  };

  console.log('Customization Complete:', customizationData);

  // TODO: Send this data to your server/cart/wherever you want
  alert('Customization Saved! (Check console for details)');
}
