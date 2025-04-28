let rotation = 0;
const logo = document.getElementById('uploadedLogo');
const logoInput = document.getElementById('logoInput');

function moveLogo(direction) {
  const step = 10;
  let top = logo.offsetTop;
  let left = logo.offsetLeft;

  if (direction === 'up') top -= step;
  if (direction === 'down') top += step;
  if (direction === 'left') left -= step;
  if (direction === 'right') left += step;

  logo.style.top = top + "px";
  logo.style.left = left + "px";
}

function resizeLogo(action) {
  let width = logo.offsetWidth;
  let height = logo.offsetHeight;

  if (action === 'bigger') {
    logo.style.width = (width + 10) + "px";
    logo.style.height = (height + 10) + "px";
  } else {
    logo.style.width = (width - 10) + "px";
    logo.style.height = (height - 10) + "px";
  }
}

function rotateLogo() {
  rotation += 15;
  logo.style.transform = `rotate(${rotation}deg)`;
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
      logo.style.position = 'absolute';
      logo.style.top = '50%';
      logo.style.left = '50%';
      logo.style.transform = 'translate(-50%, -50%)';
    };
    reader.readAsDataURL(file);
  }
});
