let rotation = 0;
const logo = document.getElementById('uploadedLogo');

function moveLogo(direction) {
  const step = 10;
  if (!logo.style.top) logo.style.top = '45%';
  if (!logo.style.left) logo.style.left = '50%';
  let top = parseInt(logo.style.top);
  let left = parseInt(logo.style.left);
  if (direction === 'up') logo.style.top = (top - step) + 'px';
  if (direction === 'down') logo.style.top = (top + step) + 'px';
  if (direction === 'left') logo.style.left = (left - step) + 'px';
  if (direction === 'right') logo.style.left = (left + step) + 'px';
}

function resizeLogo(action) {
  const scaleAmount = 10;
  let width = logo.width;
  if (action === 'bigger') {
    logo.style.width = (width + scaleAmount) + 'px';
  } else if (action === 'smaller') {
    logo.style.width = (width - scaleAmount) + 'px';
  }
}

function rotateLogo() {
  rotation += 15;
  logo.style.transform = `rotate(${rotation}deg)`;
}

document.getElementById('logoInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      logo.src = event.target.result;
      logo.style.display = 'block';
      logo.style.position = 'absolute';
      logo.style.top = '45%';
      logo.style.left = '50%';
      logo.style.transform = 'translate(-50%, -50%)';
      logo.style.maxWidth = '100px';
    }
    reader.readAsDataURL(file);
  }
});
