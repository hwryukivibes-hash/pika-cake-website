PIKA CAKE — VS CODE PROJECT

Cara menjalankan:
1. Extract folder pika-cake-website.
2. Buka folder tersebut di Visual Studio Code.
3. (Disarankan) Install extension "Live Server".
4. Klik kanan index.html > Open with Live Server.

File:
- index.html       Struktur website
- style.css        Warna, layout, animasi, dan responsive design
- i18n.js          Fitur terjemahan (Indonesia / English / 日本語) -> edit terjemahan di sini
- script.js        Navbar mobile, efek tilt, playlist musik, keranjang, sound effect & animasi tombol
- assets/          Foto toko, ilustrasi anime
- assets/music/    Lagu playlist (Kita Lewati Berdua, Blue, Love)
- assets/sfx/      Sound effect tombol beli (tuturu.mp3)
- assets/menu/     Ilustrasi menu (SVG). Bisa diganti foto asli dengan nama file yang sama / ubah src di index.html

Fitur baru (v9):
1. TERJEMAHAN  — tombol ID / EN / JP di navbar. Pilihan bahasa tersimpan otomatis.
   Teks Indonesia = teks asli di index.html. Terjemahan EN & JP ada di i18n.js.
   Pesan WhatsApp ke toko tetap berbahasa Indonesia supaya mudah dibaca penjual.
2. PLAYLIST    — tombol ♫ di pemutar kiri-bawah membuka daftar lagu: pilih lagu, next/prev, geser progres.
   Lagu otomatis lanjut ke lagu berikutnya. Lagu terakhir yang dipilih diingat.
   Tambah lagu: taruh mp3 di assets/music/ lalu tambah satu baris di array "tracks" (script.js).
3. SOUND EFFECT — tombol "+ Tambah", "+ Tambah ke pesanan", "Pesan via WhatsApp", dan "Chat to order"
   memutar assets/sfx/tuturu.mp3 (musik latar dipelankan sebentar). Ganti file-nya kalau mau suara lain.
4. ANIMASI LUCU — semua tombol "kenyal" saat ditekan; tombol biasa mengeluarkan percikan hati;
   tombol tambah: kue terbang ke keranjang + ledakan hati/stroberi; tombol pesan: hujan sakura.
   Otomatis mati kalau perangkat memakai mode "reduce motion".

Yang perlu kamu ubah:
- Nomor WhatsApp sudah diisi: +62 823-8102-8439 (cari wa.me/6282381028439 di index.html & script.js kalau mau ganti)
- Menu dan deskripsi cake: edit bagian #menu di index.html (+ terjemahannya di i18n.js).
- Nama/judul foto: edit caption pada bagian #gallery.

Catatan musik:
Website mencoba autoplay saat halaman dibuka. Browser modern sering memblokir autoplay dengan suara sampai pengunjung berinteraksi.
Kalau autoplay diblokir, tekan tombol play di kiri bawah.

Catatan foto:
Foto Pika ada di bagian About (assets/pika-portrait.jpg).

Foto asli menu: lihat assets/photos/README.txt
Mode gelap/terang: tombol bulan/matahari di navbar (tersimpan otomatis).
