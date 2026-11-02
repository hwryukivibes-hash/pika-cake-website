const $ = id => document.getElementById(id);
const tx = (k, v) => window.I18N.t(k, v);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Terapkan bahasa tersimpan (ID / EN / JP) ke seluruh halaman
I18N.init();

// ===== Mode gelap / terang =====
const themeBtn = $('themeToggle');
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('pikaTheme', next); } catch {}
  document.querySelector('meta[name=theme-color]').setAttribute('content', next === 'dark' ? '#1b1218' : '#ffe4ef');
});

// ===== Pilih bahasa =====
document.querySelectorAll('#langSwitch button').forEach(b => b.addEventListener('click', () => I18N.set(b.dataset.lang)));
I18N.onChange(() => { renderCart(); refreshPreview(); updateMusicButton(); });

const menuToggle = $('menuToggle');
const navLinks = $('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
$('year').textContent = new Date().getFullYear();

// ===== Musik & playlist =====
const audio = $('bgMusic');
const musicToggle = $('musicToggle');
const musicIcon = $('musicIcon');
const musicHint = $('musicHint');
const plPanel = $('playlist');
// Mau tambah lagu? Taruh file mp3 di assets/music/ lalu tambahkan satu baris di sini.
const tracks = [
  { title: 'Kita Lewati Berdua', artist: 'Overnight',     src: 'assets/music/kita-lewati-berdua.mp3' },
  { title: 'Blue',               artist: 'Yung Kai',      src: 'assets/music/blue-yung-kai.mp3' },
  { title: 'Love',               artist: 'wave to earth', src: 'assets/music/love-wave-to-earth.mp3' }
];
let cur = 0;
try { const s = parseInt(localStorage.getItem('pikaTrack'), 10); if (s >= 0 && s < tracks.length) cur = s; } catch {}
const fmt = s => (isFinite(s) && s > 0) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';

function showHint(key, ms) {
  musicHint.textContent = tx(key); musicHint.classList.add('show');
  if (ms) setTimeout(() => musicHint.classList.remove('show'), ms);
}
function renderPlaylist() {
  $('plList').innerHTML = tracks.map((tr, i) =>
    `<li><button type="button" class="pl-track no-jelly" data-i="${i}"><span class="pl-num">${i + 1}</span><span class="pl-meta"><b>${tr.title}</b><small>${tr.artist}</small></span><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span></button></li>`
  ).join('');
}
function updateTrackUI() {
  $('trackTitle').textContent = tracks[cur].title;
  $('trackArtist').textContent = tracks[cur].artist;
  if ('mediaSession' in navigator && window.MediaMetadata) {
    navigator.mediaSession.metadata = new MediaMetadata({ title: tracks[cur].title, artist: tracks[cur].artist, album: 'Pika Cake ♡' });
  }
}
function updateMusicButton() {
  const playing = !audio.paused;
  musicIcon.textContent = playing ? 'Ⅱ' : '▶';
  $('plPlay').textContent = playing ? 'Ⅱ' : '▶';
  const label = tx(playing ? 'music.pause' : 'music.play');
  musicToggle.setAttribute('aria-label', label); $('plPlay').setAttribute('aria-label', label);
  $('musicPlayer').classList.toggle('is-playing', playing);
  document.querySelectorAll('.pl-track').forEach((b, i) => {
    b.classList.toggle('active', i === cur);
    b.classList.toggle('playing', i === cur && playing);
    b.setAttribute('aria-current', String(i === cur));
  });
}
function loadTrack(i, autoplay) {
  cur = (i + tracks.length) % tracks.length;
  audio.src = tracks[cur].src;
  try { localStorage.setItem('pikaTrack', cur); } catch {}
  $('plSeek').value = 0; $('plCur').textContent = '0:00'; $('plDur').textContent = '0:00';
  updateTrackUI(); updateMusicButton();
  if (autoplay) audio.play().then(() => musicHint.classList.remove('show')).catch(() => showHint('music.blocked', 6500));
}
const nextTrack = () => loadTrack(cur + 1, true);
const prevTrack = () => (audio.currentTime > 3 ? (audio.currentTime = 0) : loadTrack(cur - 1, true));

async function togglePlay() {
  if (audio.paused) {
    try { await audio.play(); musicHint.classList.remove('show'); }
    catch { showHint('music.blocked'); }
  } else audio.pause();
  updateMusicButton();
}
musicToggle.addEventListener('click', togglePlay);
$('plPlay').addEventListener('click', togglePlay);
$('plNext').addEventListener('click', nextTrack);
$('plPrev').addEventListener('click', prevTrack);
$('plList').addEventListener('click', e => {
  const b = e.target.closest('.pl-track'); if (!b) return;
  const i = +b.dataset.i;
  if (i === cur) togglePlay(); else loadTrack(i, true);
});
audio.addEventListener('play', updateMusicButton);
audio.addEventListener('pause', updateMusicButton);
audio.addEventListener('ended', nextTrack);
audio.addEventListener('loadedmetadata', () => { $('plDur').textContent = fmt(audio.duration); });
let seeking = false;
audio.addEventListener('timeupdate', () => {
  $('plCur').textContent = fmt(audio.currentTime);
  if (!seeking && audio.duration) $('plSeek').value = Math.round(audio.currentTime / audio.duration * 1000);
});
$('plSeek').addEventListener('input', e => { seeking = true; if (audio.duration) $('plCur').textContent = fmt(e.target.value / 1000 * audio.duration); });
$('plSeek').addEventListener('change', e => { if (audio.duration) audio.currentTime = e.target.value / 1000 * audio.duration; seeking = false; });

function openPlaylist(open) {
  plPanel.classList.toggle('open', open);
  plPanel.setAttribute('aria-hidden', String(!open));
  $('plBtn').setAttribute('aria-expanded', String(open));
  if (open) musicHint.classList.remove('show');
}
$('plBtn').addEventListener('click', () => openPlaylist(!plPanel.classList.contains('open')));
$('plClose').addEventListener('click', () => openPlaylist(false));
document.addEventListener('click', e => {
  if (plPanel.classList.contains('open') && !e.target.closest('#musicPlayer, #playlist')) openPlaylist(false);
});
if ('mediaSession' in navigator) {
  try {
    navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
    navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    navigator.mediaSession.setActionHandler('play', () => audio.play());
    navigator.mediaSession.setActionHandler('pause', () => audio.pause());
  } catch {}
}
renderPlaylist();
loadTrack(cur, false);

// Autoplay dicoba, tetapi browser biasanya mensyaratkan interaksi pengguna untuk audio bersuara.
window.addEventListener('load', async () => {
  try { await audio.play(); musicHint.classList.remove('show'); }
  catch { showHint('music.hint', 6500); }
  updateMusicButton();
});

// ===== Efek suara + animasi lucu =====
// Suara "tuturu" ada di assets/sfx/tuturu.mp3 (ganti file-nya kalau mau suara lain).
const sfx = new Audio('assets/sfx/tuturu.mp3');
sfx.preload = 'auto';
let duckCount = 0;
function playSfx() {
  try {
    const s = sfx.cloneNode(); s.volume = 1;
    duckCount++; audio.volume = 0.25;                    // musik dipelankan sebentar
    const restore = () => { if (--duckCount <= 0) { duckCount = 0; audio.volume = 1; } };
    let done = false; const once = () => { if (!done) { done = true; restore(); } };
    s.addEventListener('ended', once); s.addEventListener('error', once); setTimeout(once, 2500);
    s.play().catch(once);
  } catch {}
}
const PARTICLES = ['♡', '✦', '🍓', '🍰', '✿', '🧁', '🌸'];
const PINKS = ['#e995b3', '#d66f98', '#f6a623', '#c8a2e8', '#f48fb1'];
const rand = (a, b) => a + Math.random() * (b - a);
function burst(x, y, { count = 12, dist = 85 } = {}) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span'); el.className = 'fx-particle';
    el.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
    el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.fontSize = rand(15, 26) + 'px'; el.style.color = PINKS[i % PINKS.length];
    document.body.appendChild(el);
    const ang = (i / count) * Math.PI * 2 + rand(-.3, .3), d = dist * rand(.6, 1.3);
    const dx = Math.cos(ang) * d, dy = Math.sin(ang) * d - 25;
    const a = el.animate([
      { transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1.15) rotate(${rand(-40, 40)}deg)`, opacity: 1, offset: .55 },
      { transform: `translate(calc(-50% + ${dx * 1.1}px),calc(-50% + ${dy + 45}px)) scale(.6) rotate(${rand(-90, 90)}deg)`, opacity: 0 }
    ], { duration: rand(750, 1150), easing: 'cubic-bezier(.2,.8,.3,1)' });
    a.onfinish = () => el.remove();
  }
}
function rain() {                                       // hujan sakura & hati (untuk tombol pesan)
  if (reduceMotion) return;
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('span'); el.className = 'fx-particle';
    el.textContent = ['🌸', '♡', '🍓', '✦', '🍰'][i % 5];
    el.style.left = rand(0, 100) + 'vw'; el.style.top = '-30px'; el.style.fontSize = rand(16, 32) + 'px'; el.style.color = PINKS[i % PINKS.length];
    document.body.appendChild(el);
    const sway = rand(-60, 60);
    const a = el.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${sway}px,${innerHeight * .55}px) rotate(180deg)`, opacity: 1, offset: .6 },
      { transform: `translate(${-sway}px,${innerHeight + 40}px) rotate(360deg)`, opacity: 0 }
    ], { duration: rand(1400, 2400), delay: rand(0, 500), easing: 'ease-in', fill: 'backwards' });
    a.onfinish = () => el.remove();
  }
}
function bumpFab() { const f = $('cartFab'); f.classList.remove('bump'); void f.offsetWidth; f.classList.add('bump'); }
function flyToCart(imgEl) {                             // gambar kue "terbang" ke keranjang
  if (reduceMotion || !imgEl) return;
  const a = imgEl.getBoundingClientRect(), b = $('cartFab').getBoundingClientRect(), size = 56;
  const sx = a.left + a.width / 2, sy = a.top + a.height / 2, dx = b.left + b.width / 2 - sx, dy = b.top + b.height / 2 - sy;
  const el = document.createElement('img'); el.className = 'fx-fly'; el.alt = ''; el.src = imgEl.currentSrc || imgEl.src;
  el.style.left = (sx - size / 2) + 'px'; el.style.top = (sy - size / 2) + 'px';
  document.body.appendChild(el);
  const anim = el.animate([
    { transform: 'translate(0,0) scale(1.4) rotate(0deg)', opacity: 1 },
    { transform: `translate(${dx * .45}px,${dy * .45 - 110}px) scale(1) rotate(160deg)`, opacity: 1, offset: .45 },
    { transform: `translate(${dx}px,${dy}px) scale(.25) rotate(360deg)`, opacity: .3 }
  ], { duration: 850, easing: 'cubic-bezier(.45,.05,.55,.95)' });
  anim.onfinish = () => { el.remove(); bumpFab(); };
}
// Dipanggil tiap tombol "beli" ditekan: suara tuturu + ledakan hati + (opsional) kue terbang / hujan sakura
function fxBuy(btn, { img = null, big = false } = {}) {
  playSfx();
  const r = btn.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, big ? { count: 22, dist: 130 } : { count: 12, dist: 85 });
  if (big) rain();
  if (img) flyToCart(img);
}
// Semua tombol dapat efek "kenyal" (jelly); tombol biasa dapat percikan kecil.
const JELLY = 'button, .btn-primary, .btn-outline, .nav-order, .text-link';
const JELLY_SKIP = '.no-jelly, .pv-nav, .cart-fab, [disabled]';
const SPARK = '.btn-primary:not([data-buy]), .btn-outline, .nav-order, .menu-filters button, .theme-toggle, .lang-switch button, #musicToggle, .text-link';
document.addEventListener('click', e => {
  const el = e.target.closest(JELLY); if (!el || el.matches(JELLY_SKIP)) return;
  el.classList.remove('jelly'); void el.offsetWidth; el.classList.add('jelly');
  if (el.matches(SPARK)) { const r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, { count: 5, dist: 45 }); }
});
document.addEventListener('animationend', e => { if (e.animationName === 'jelly') e.target.classList.remove('jelly'); });

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

// Filter kategori menu
const filterBtns = document.querySelectorAll('#menuFilters button');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.classList.toggle('active', b === btn));
  const f = btn.dataset.filter;
  document.querySelectorAll('#cakeGrid .cake-card').forEach(card => { card.hidden = !(f === 'all' || card.dataset.cat === f); });
}));

// ===== Keranjang & pesan via WhatsApp =====
const WA_NUMBER = '6282381028439';
const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');
let cart = {};
try { cart = JSON.parse(localStorage.getItem('pikaCart') || '{}'); } catch { cart = {}; }
const menuData = {};
document.querySelectorAll('#cakeGrid .cake-card').forEach(card => {
  const name = card.querySelector('h3').textContent;
  menuData[name] = { name, price: +card.dataset.price, img: card.querySelector('img').getAttribute('src') };
});
function saveCart() { try { localStorage.setItem('pikaCart', JSON.stringify(cart)); } catch {} }
function toast(msg) { const el = $('toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 1800); }
function openCart(open) {
  $('cartDrawer').classList.toggle('open', open); $('cartOverlay').classList.toggle('show', open);
  $('cartDrawer').setAttribute('aria-hidden', String(!open));
}
function renderCart() {
  const names = Object.keys(cart).filter(n => menuData[n] && cart[n] > 0);
  let count = 0, total = 0;
  $('cartItems').innerHTML = names.length ? names.map(n => {
    const m = menuData[n], q = cart[n]; count += q; total += q * m.price;
    return `<div class="cart-line"><img src="${m.img}" alt=""><div><b>${m.name}</b><small>${rupiah(m.price)} × ${q}</small></div><div class="cart-ctl"><div class="qty"><button data-act="dec" data-name="${m.name}" aria-label="${tx('cart.dec')}">−</button><span>${q}</span><button data-act="inc" data-name="${m.name}" aria-label="${tx('cart.inc')}">+</button></div><button class="cart-del" data-act="del" data-name="${m.name}">${tx('cart.remove')}</button></div></div>`;
  }).join('') : `<div class="cart-empty">${tx('cart.empty')}</div>`;
  $('cartCount').textContent = count; $('cartSummary').textContent = tx('cart.count', { n: count }); $('cartClear').disabled = !names.length; $('cartTotal').textContent = rupiah(total); $('cartOrder').disabled = !names.length;
  saveCart();
}
function addToCart(name) {
  cart[name] = (cart[name] || 0) + 1; renderCart(); toast(tx('toast.added', { name }));
  bumpFab();
}
document.querySelectorAll('#cakeGrid .cake-card').forEach(card => {
  const name = card.querySelector('h3').textContent;
  card.querySelector('.add-btn').addEventListener('click', e => {
    e.stopPropagation(); addToCart(name);
    fxBuy(e.currentTarget, { img: card.querySelector('.cake-img img') });
  });
});
$('cartItems').addEventListener('click', e => {
  const b = e.target.closest('button[data-act]'); if (!b) return;
  const n = b.dataset.name;
  if (b.dataset.act === 'del') { delete cart[n]; renderCart(); return; }
  cart[n] = Math.max(0, (cart[n] || 0) + (b.dataset.act === 'inc' ? 1 : -1));
  if (!cart[n]) delete cart[n]; renderCart();
});
$('cartClear').addEventListener('click', () => { if (confirm(tx('confirm.clear'))) { cart = {}; renderCart(); toast(tx('toast.cleared')); } });
$('cartFab').addEventListener('click', () => openCart(true));
$('cartClose').addEventListener('click', () => openCart(false));
$('cartOverlay').addEventListener('click', () => openCart(false));

// Buka WhatsApp sebentar setelah animasi & suara terlihat (pesan ke toko selalu berbahasa Indonesia).
function openWA(url) {
  toast(tx('toast.wa'));
  setTimeout(() => { const w = window.open(url, '_blank'); if (w) w.opener = null; else location.href = url; }, 950);
}
$('cartOrder').addEventListener('click', e => {
  const names = Object.keys(cart).filter(n => menuData[n] && cart[n] > 0); if (!names.length) return;
  const btn = e.currentTarget;
  let total = 0;
  const lines = names.map((n, i) => { const sub = cart[n] * menuData[n].price; total += sub; return `${i + 1}. ${n} x${cart[n]} - ${rupiah(sub)}`; });
  const note = $('cartNote').value.trim();
  const msg = `Halo Pika Cake! Aku mau pesan:\n\n${lines.join('\n')}\n\nTotal: ${rupiah(total)}` + (note ? `\nCatatan: ${note}` : '') + '\n\nTerima kasih ♡';
  fxBuy(btn, { big: true });
  btn.disabled = true; setTimeout(renderCart, 1300);     // cegah klik ganda
  openWA(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`);
});
// Tombol "Chat to order" di bagian bawah juga dapat efek yang sama
document.querySelectorAll('a[data-buy="wa"]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault(); fxBuy(a, { big: true }); openWA(a.href);
}));
renderCart();

// Foto asli menu: taruh file di assets/photos/<nama-menu>.jpg (lihat assets/photos/README.txt).
// Kalau filenya ada, otomatis dipakai menggantikan ilustrasi.
document.querySelectorAll('#cakeGrid .cake-card').forEach(card => {
  const img = card.querySelector('.cake-img img');
  if (!img.getAttribute('src').endsWith('.svg')) return;
  const slug = img.getAttribute('src').split('/').pop().replace('.svg', '');
  const name = card.querySelector('h3').textContent;
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  (function tryNext(i) {
    if (i >= exts.length) return;
    const src = `assets/photos/${slug}.${exts[i]}`, probe = new Image();
    probe.onload = () => { img.src = src; menuData[name].img = src; renderCart(); };
    probe.onerror = () => tryNext(i + 1);
    probe.src = src;
  })(0);
});

// ===== Preview foto + deskripsi menu =====
const pv = $('pv'), pvOverlay = $('pvOverlay');
let pvIndex = 0, pvCard = null;
const visibleCards = () => [...document.querySelectorAll('#cakeGrid .cake-card')].filter(c => !c.hidden);
function showPreview(card) {
  pvCard = card;
  const name = card.querySelector('h3').textContent, tag = card.querySelector('.tag');
  $('pvImg').src = card.querySelector('.cake-img img').getAttribute('src'); $('pvImg').alt = name;
  $('pvName').textContent = name; $('pvDesc').textContent = card.dataset.desc || card.querySelector('p').textContent;
  $('pvPrice').textContent = rupiah(+card.dataset.price);
  $('pvTag').textContent = tag.textContent; $('pvTag').className = tag.className;
  $('pvAdd').dataset.name = name;
}
function refreshPreview() { if (pvCard && pv.classList.contains('open')) showPreview(pvCard); }
function openPreview(card) {
  pvIndex = visibleCards().indexOf(card); showPreview(card);
  pv.classList.add('open'); pvOverlay.classList.add('show'); pv.setAttribute('aria-hidden', 'false'); document.body.classList.add('lock');
  $('pvClose').focus();
}
function closePreview() { pv.classList.remove('open'); pvOverlay.classList.remove('show'); pv.setAttribute('aria-hidden', 'true'); document.body.classList.remove('lock'); }
function stepPreview(d) { const v = visibleCards(); if (!v.length) return; pvIndex = (pvIndex + d + v.length) % v.length; showPreview(v[pvIndex]); }
document.querySelectorAll('#cakeGrid .cake-card').forEach(card => {
  const trigger = card.querySelector('.cake-img');
  trigger.addEventListener('click', () => openPreview(card));
  trigger.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPreview(card); } });
});
$('pvClose').addEventListener('click', closePreview); pvOverlay.addEventListener('click', closePreview);
$('pvPrev').addEventListener('click', () => stepPreview(-1)); $('pvNext').addEventListener('click', () => stepPreview(1));
$('pvAdd').addEventListener('click', e => {
  addToCart(e.currentTarget.dataset.name);
  fxBuy(e.currentTarget, { img: $('pvImg') });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && plPanel.classList.contains('open')) openPlaylist(false);
  if (!pv.classList.contains('open')) return;
  if (e.key === 'Escape') closePreview(); if (e.key === 'ArrowLeft') stepPreview(-1); if (e.key === 'ArrowRight') stepPreview(1);
});
