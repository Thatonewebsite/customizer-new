
let rotation = 0;
let logo = document.getElementById('uploadedLogo');

function moveLogo(direction) {
  const step = 10;
  if (!logo.style.left) logo.style.left = '50%';
  if (!logo.style.top) logo.style.top = '50%';

  let left = parseInt(logo.style.left);
  let top = parseInt(logo.style.top);

  switch (direction) {
    case 'up': logo.style.top = (top - step) + 'px'; break;
    case 'down': logo.style.top = (top + step) + 'px'; break;
    case 'left': logo.style.left = (left - step) + 'px'; break;
    case 'right': logo.style.left = (left + step) + 'px'; break;
  }
}

function resizeLogo(action) {
  let currentWidth = logo.width || 100;
  if (action === 'bigger') {
    logo.style.width = (currentWidth + 10) + 'px';
  } else {
    logo.style.width = Math.max(10, currentWidth - 10) + 'px';
  }
}

function rotateLogo() {
  rotation += 15;
  logo.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
}

function finishCustomization() {
  window.location.href = '/cart';
}

document.getElementById('logoInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      logo.src = event.target.result;
      logo.style.display = 'block';
      logo.style.position = 'absolute';
      logo.style.top = '50%';
      logo.style.left = '50%';
      logo.style.transform = 'translate(-50%, -50%)';
    }
    reader.readAsDataURL(file);
  }
});
