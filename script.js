const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

const audio = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicHint = document.getElementById('musicHint');

function updateMusicButton() {
  const playing = !audio.paused;
  musicIcon.textContent = playing ? 'Ⅱ' : '▶';
  musicToggle.setAttribute('aria-label', playing ? 'Jeda musik' : 'Putar musik');
}
musicToggle.addEventListener('click', async () => {
  if (audio.paused) {
    try { await audio.play(); musicHint.classList.remove('show'); }
    catch { musicHint.textContent = 'Browser belum mengizinkan audio. Coba tekan tombol lagi.'; musicHint.classList.add('show'); }
  } else audio.pause();
  updateMusicButton();
});
audio.addEventListener('play', updateMusicButton);
audio.addEventListener('pause', updateMusicButton);

// Autoplay dicoba, tetapi browser biasanya mensyaratkan interaksi pengguna untuk audio bersuara.
window.addEventListener('load', async () => {
  try { await audio.play(); musicHint.classList.remove('show'); }
  catch {
    musicHint.classList.add('show');
    setTimeout(() => musicHint.classList.remove('show'), 6500);
  }
});

// Subtle pointer tilt for larger screens.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}
