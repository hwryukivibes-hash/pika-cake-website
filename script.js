// Mode gelap / terang
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('pikaTheme', next); } catch {}
  document.querySelector('meta[name=theme-color]').setAttribute('content', next === 'dark' ? '#1b1218' : '#ffe4ef');
});

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
const $ = id => document.getElementById(id);
const menuData = {};
document.querySelectorAll('#cakeGrid .cake-card').forEach(card => {
  const name = card.querySelector('h3').textContent;
  menuData[name] = { name, price: +card.dataset.price, img: card.querySelector('img').getAttribute('src') };
});
function saveCart() { try { localStorage.setItem('pikaCart', JSON.stringify(cart)); } catch {} }
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 1800); }
function openCart(open) {
  $('cartDrawer').classList.toggle('open', open); $('cartOverlay').classList.toggle('show', open);
  $('cartDrawer').setAttribute('aria-hidden', String(!open));
}
function renderCart() {
  const names = Object.keys(cart).filter(n => menuData[n] && cart[n] > 0);
  let count = 0, total = 0;
  $('cartItems').innerHTML = names.length ? names.map(n => {
    const m = menuData[n], q = cart[n]; count += q; total += q * m.price;
    return `<div class="cart-line"><img src="${m.img}" alt=""><div><b>${m.name}</b><small>${rupiah(m.price)} × ${q}</small></div><div class="cart-ctl"><div class="qty"><button data-act="dec" data-name="${m.name}" aria-label="Kurangi">−</button><span>${q}</span><button data-act="inc" data-name="${m.name}" aria-label="Tambah">+</button></div><button class="cart-del" data-act="del" data-name="${m.name}">Hapus</button></div></div>`;
  }).join('') : '<div class="cart-empty">Keranjangmu masih kosong ♡<br>Pilih kue favoritmu dari menu ya!</div>';
  $('cartCount').textContent = count; $('cartSummary').textContent = count + ' item'; $('cartClear').disabled = !names.length; $('cartTotal').textContent = rupiah(total); $('cartOrder').disabled = !names.length;
  saveCart();
}
function addToCart(name) {
  cart[name] = (cart[name] || 0) + 1; renderCart(); toast(name + ' ditambahkan ♡');
  $('cartFab').classList.remove('bump'); void $('cartFab').offsetWidth; $('cartFab').classList.add('bump');
}
document.querySelectorAll('#cakeGrid .cake-card').forEach(card => {
  const name = card.querySelector('h3').textContent;
  card.querySelector('.add-btn').addEventListener('click', e => { e.stopPropagation(); addToCart(name); });
});
$('cartItems').addEventListener('click', e => {
  const b = e.target.closest('button[data-act]'); if (!b) return;
  const n = b.dataset.name;
  if (b.dataset.act === 'del') { delete cart[n]; renderCart(); return; }
  cart[n] = Math.max(0, (cart[n] || 0) + (b.dataset.act === 'inc' ? 1 : -1));
  if (!cart[n]) delete cart[n]; renderCart();
});
$('cartClear').addEventListener('click', () => { if (confirm('Hapus semua pesanan di keranjang?')) { cart = {}; renderCart(); toast('Keranjang dikosongkan'); } });
$('cartFab').addEventListener('click', () => openCart(true));
$('cartClose').addEventListener('click', () => openCart(false));
$('cartOverlay').addEventListener('click', () => openCart(false));
$('cartOrder').addEventListener('click', () => {
  const names = Object.keys(cart).filter(n => menuData[n] && cart[n] > 0); if (!names.length) return;
  let total = 0;
  const lines = names.map((n, i) => { const sub = cart[n] * menuData[n].price; total += sub; return `${i + 1}. ${n} x${cart[n]} - ${rupiah(sub)}`; });
  const note = $('cartNote').value.trim();
  const msg = `Halo Pika Cake! Aku mau pesan:\n\n${lines.join('\n')}\n\nTotal: ${rupiah(total)}` + (note ? `\nCatatan: ${note}` : '') + '\n\nTerima kasih ♡';
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});
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
let pvIndex = 0;
const visibleCards = () => [...document.querySelectorAll('#cakeGrid .cake-card')].filter(c => !c.hidden);
function showPreview(card) {
  const name = card.querySelector('h3').textContent, tag = card.querySelector('.tag');
  $('pvImg').src = card.querySelector('.cake-img img').getAttribute('src'); $('pvImg').alt = name;
  $('pvName').textContent = name; $('pvDesc').textContent = card.dataset.desc || card.querySelector('p').textContent;
  $('pvPrice').textContent = rupiah(+card.dataset.price);
  $('pvTag').textContent = tag.textContent; $('pvTag').className = tag.className;
  $('pvAdd').dataset.name = name;
}
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
$('pvAdd').addEventListener('click', e => addToCart(e.currentTarget.dataset.name));
document.addEventListener('keydown', e => {
  if (!pv.classList.contains('open')) return;
  if (e.key === 'Escape') closePreview(); if (e.key === 'ArrowLeft') stepPreview(-1); if (e.key === 'ArrowRight') stepPreview(1);
});
