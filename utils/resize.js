function resize() {
  let vw = window.innerWidth * 0.01;
  let wh = window.innerWidth / 1920;
  let vh = window.innerHeight * 0.01;
  // let size = window.innerWidth * 15 / 1920;

  let size = 15;
  if (window.innerWidth > 2560) {
    wh = 2560 / 1920;
    size = 20;
  }

  let exp = Math.exp(wh - 1);
  // exp = Math.ceil(Math.exp(exp - 1) * 100) / 100;
  if (window.innerWidth < 1920) {
    size = Math.exp(window.innerWidth / 1920) / 2.7 * 15;
  }
  if (window.innerWidth < 1280) {
    // exp = window.innerWidth / 1280;
  }
  if (window.innerWidth < 1100) {
    // exp = window.innerWidth / 768;
  }
  if (window.innerWidth < 768) {
    size = window.innerWidth / 320 * 15;
    // exp = window.innerWidth / 320;
  }

  document.documentElement.style.setProperty('--vw', `${vw}px`);
  document.documentElement.style.setProperty('--exp', `${exp.toFixed(2)}`);
  document.documentElement.style.setProperty('--wh', `${wh.toFixed(2)}`);
  document.documentElement.style.setProperty('font-size', `${size}px`);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export default resize;