
let rotation = 0;
let logo = document.getElementById('uploadedLogo');
let previewArea = document.querySelector('.preview-area');

function moveLogo(direction) {
  const step = 10;
  if (!logo.style.left) logo.style.left = '50%';
  if (!logo.style.top) logo.style.top = '50%';
  let left = parseInt(logo.style.left);
  let top = parseInt(logo.style.top);

  switch(direction) {
    case 'up': logo.style.top = (top - step) + 'px'; break;
    case 'down': logo.style.top = (top + step) + 'px'; break;
    case 'left': logo.style.left = (left - step) + 'px'; break;
    case 'right': logo.style.left = (left + step) + 'px'; break;
  }
}

function resizeLogo(action) {
  let currentWidth = logo.width;
  if (action === 'bigger') {
    logo.width = currentWidth + 10;
  } else {
    logo.width = currentWidth - 10;
  }
}

function rotateLogo() {
  rotation += 15;
  logo.style.transform = `rotate(${rotation}deg)`;
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
