
let rotation = 0;
let logo = document.getElementById('uploadedLogo');
let logoInput = document.getElementById('logoInput');

function moveLogo(direction) {
  const step = 10;
  let top = parseInt(logo.style.top || '50%');
  let left = parseInt(logo.style.left || '50%');
  switch (direction) {
    case 'up': logo.style.top = (top - step) + 'px'; break;
    case 'down': logo.style.top = (top + step) + 'px'; break;
    case 'left': logo.style.left = (left - step) + 'px'; break;
    case 'right': logo.style.left = (left + step) + 'px'; break;
  }
}

function resizeLogo(action) {
  let width = logo.width || 100;
  logo.width = action === 'bigger' ? width + 10 : width - 10;
}

function rotateLogo() {
  rotation += 15;
  logo.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
}

function finishCustomization() {
  window.location.href = '/cart';
}

logoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      logo.src = event.target.result;
      logo.style.display = 'block';
      logo.style.top = '50%';
      logo.style.left = '50%';
      logo.style.transform = 'translate(-50%, -50%)';
    }
    reader.readAsDataURL(file);
  }
});
