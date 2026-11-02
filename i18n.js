/* ===== Pika Cake — fitur terjemahan (ID / EN / JP) =====
   Teks Indonesia = teks asli yang ada di index.html (otomatis dibaca sebagai bahasa dasar).
   Di sini cukup isi terjemahan EN dan JA. Mau edit terjemahan? Cari key-nya lalu ubah teksnya.
   Mau tambah bahasa baru? Tambahkan kode bahasanya di LANGS, lalu isi di tiap entri. */
(function () {
  const LANGS = ['id', 'en', 'ja'];

  const D = {
    /* --- Navbar --- */
    'nav.home': { ja: 'ホーム' },
    'nav.menu': { ja: 'ケーキ' },
    'nav.story': { ja: 'ストーリー' },
    'nav.about': { ja: 'ピカのこと' },
    'nav.order': { ja: 'ご注文 ♡' },
    'nav.themeAria': { en: 'Toggle dark / light mode', ja: 'ダーク／ライトモード切り替え' },
    'nav.themeTitle': { en: 'Dark / light mode', ja: 'ダーク／ライトモード' },
    'nav.menuAria': { en: 'Open menu', ja: 'メニューを開く' },
    'nav.langAria': { id: 'Pilih bahasa', en: 'Choose language', ja: '言語を選択' },

    /* --- Hero --- */
    'hero.eyebrow': { ja: '<span>✿</span> ちいさな和風ケーキ屋さん' },
    'hero.h1': { ja: 'ちいさな<br><em>しあわせ</em>の<br>ひとかけ。' },
    'hero.desc': {
      en: 'Sweet cakes, a warm atmosphere, and little stories made with all our heart. Welcome to Pika Cake!',
      ja: '甘いケーキ、あたたかな空間、心を込めてつづる小さな物語。ようこそ、ピカケーキへ！'
    },
    'hero.explore': { ja: 'ケーキを見る <span>↗</span>' },
    'hero.know': { ja: '私たちについて' },
    'hero.note1': { ja: '愛情たっぷり' },
    'hero.note2': { ja: 'ひと口ごとに、ぎゅっと抱きしめられるみたい。' },
    'hero.fresh': { ja: '毎日<br><b>焼きたて</b>' },

    /* --- Menu --- */
    'menu.eyebrow': { ja: 'スイーツコレクション' },
    'menu.h2': { ja: 'どんな気分にも、<em>ごほうび。</em>' },
    'menu.sub': {
      en: 'Find the best companion for your sweet day.',
      ja: 'あなたの甘い一日にぴったりのパートナーを見つけてね。'
    },
    'filter.all': { ja: 'すべて ♡' },
    'filter.cake': { ja: 'ケーキ 🍰' },
    'filter.pastry': { ja: 'ペストリー 🧁' },
    'filter.dessert': { ja: 'デザート 🍮' },
    'filter.drink': { ja: 'ドリンク 🥤' },
    'card.add': { en: '+ Add', ja: '+ 追加' },
    'card.addAria': { en: 'Add to cart', ja: 'カートに追加' },
    'card.view': { en: '🔍 View', ja: '🔍 見る' },
    'card.viewAria': { en: 'View photo and details', ja: '写真と詳細を見る' },
    'menu.disclaimer': {
      en: '*Menu and prices are sample displays. Please replace names, descriptions, and prices to match the shop\'s menu.',
      ja: '※メニューと価格は表示サンプルです。お店のメニューに合わせて名前・説明・価格を変更してください。'
    },

    /* --- Story / About / Order --- */
    'story.h2': { ja: '和のひとさじを添えた、<br><em>やさしい甘さ。</em>' },
    'story.p': {
      en: 'Pika Cake is inspired by the warm, pastel atmosphere of Japanese cake shops, full of adorable little details. We believe that something as simple as a slice of cake can make your day feel better.',
      ja: 'ピカケーキは、あたたかくてパステルカラー、かわいい細部にあふれた日本のケーキ屋さんの雰囲気から生まれました。ケーキ一切れのようなささやかなものが、一日をもっと良くしてくれると信じています。'
    },
    'story.btn': { ja: 'ピカに会う ↗' },
    'about.eyebrow': { ja: 'はじめまして' },
    'about.h2': { ja: 'お店の心、<br><em>ピカ</em>をご紹介。' },
    'about.p': {
      en: 'Behind every cake are hands that make it with patience and love. Pika believes that a cake made from the heart tastes sweeter with every bite.',
      ja: 'どのケーキの裏にも、辛抱強く愛情を込めて作る手があります。心を込めて作ったケーキは、ひと口ごとにもっと甘く感じられるとピカは信じています。'
    },
    'about.btn': { ja: 'ケーキを注文する ↗' },
    'order.eyebrow': { ja: 'もっと甘くしよう' },
    'order.h2': { ja: 'あなたのハッピーな時間は、<br><em>ケーキ</em>から。' },
    'order.p': {
      en: 'Got a special occasion, or just craving something sweet? Contact us to ask about the menu and place your order.',
      ja: '特別なイベントも、ちょっと甘いものが食べたい日も。メニューのご相談やご注文はお気軽にご連絡ください。'
    },
    'order.btn': { ja: 'チャットで注文 <span>↗</span>' },
    'order.phone': {
      en: 'WhatsApp / phone: <a href="tel:+6282381028439">+62 823-8102-8439</a>',
      ja: 'WhatsApp / 電話: <a href="tel:+6282381028439">+62 823-8102-8439</a>'
    },
    'doc.title': { ja: 'Pika Cake ♡ 和風ケーキと甘いひととき' },

    /* --- Preview menu --- */
    'pv.close': { id: 'Tutup', en: 'Close', ja: '閉じる' },
    'pv.prev': { id: 'Menu sebelumnya', en: 'Previous item', ja: '前のメニュー' },
    'pv.next': { id: 'Menu berikutnya', en: 'Next item', ja: '次のメニュー' },
    'pv.add': { en: '+ Add to order', ja: '+ 注文に追加' },

    /* --- Keranjang --- */
    'cart.fabAria': { en: 'Open cart', ja: 'カートを開く' },
    'cart.title': { en: 'Your order ♡', ja: 'ご注文 ♡' },
    'cart.closeAria': { en: 'Close cart', ja: 'カートを閉じる' },
    'cart.clear': { en: '🗑 Clear all', ja: '🗑 すべて削除' },
    'cart.note': { en: 'Note (optional)', ja: 'メモ（任意）' },
    'cart.ph': { en: 'e.g. message on the cake, pickup date', ja: '例：ケーキのメッセージ、受け取り日' },
    'cart.total': { ja: '合計' },
    'cart.order': { en: 'Order via WhatsApp <span>↗</span>', ja: 'WhatsAppで注文 <span>↗</span>' },
    'cart.foot': {
      en: 'Your order is sent via WhatsApp to +62 823-8102-8439',
      ja: 'ご注文はWhatsAppで +62 823-8102-8439 に送信されます'
    },
    'cart.empty': {
      id: 'Keranjangmu masih kosong ♡<br>Pilih kue favoritmu dari menu ya!',
      en: 'Your cart is still empty ♡<br>Pick your favorite treats from the menu!',
      ja: 'カートはまだ空っぽです♡<br>メニューからお気に入りを選んでね！'
    },
    'cart.count': { id: '{n} item', en: '{n} item(s)', ja: '{n}点' },
    'cart.remove': { id: 'Hapus', en: 'Remove', ja: '削除' },
    'cart.dec': { id: 'Kurangi', en: 'Decrease', ja: '減らす' },
    'cart.inc': { id: 'Tambah', en: 'Increase', ja: '増やす' },
    'toast.added': { id: '{name} ditambahkan ♡', en: '{name} added ♡', ja: '{name}を追加しました♡' },
    'toast.cleared': { id: 'Keranjang dikosongkan', en: 'Cart emptied', ja: 'カートを空にしました' },
    'toast.wa': { id: 'Membuka WhatsApp ♡', en: 'Opening WhatsApp ♡', ja: 'WhatsAppを開きます♡' },
    'confirm.clear': {
      id: 'Hapus semua pesanan di keranjang?',
      en: 'Remove everything from your cart?',
      ja: 'カートの中身をすべて削除しますか？'
    },

    /* --- Musik & playlist --- */
    'music.hint': { id: 'Tap ♡ untuk memutar musik', en: 'Tap ♡ to play music', ja: '♡をタップして音楽を再生' },
    'music.blocked': {
      id: 'Browser belum mengizinkan audio. Coba tekan tombol lagi.',
      en: "Your browser hasn't allowed audio yet. Try pressing the button again.",
      ja: 'ブラウザが音声を許可していません。もう一度ボタンを押してください。'
    },
    'music.play': { id: 'Putar musik', en: 'Play music', ja: '音楽を再生' },
    'music.pause': { id: 'Jeda musik', en: 'Pause music', ja: '一時停止' },
    'music.title': { id: 'Putar / jeda musik', en: 'Play / pause music', ja: '再生／一時停止' },
    'pl.open': { id: 'Buka playlist', en: 'Open playlist', ja: 'プレイリストを開く' },
    'pl.close': { id: 'Tutup playlist', en: 'Close playlist', ja: 'プレイリストを閉じる' },
    'pl.title': { id: 'Playlist ♡', en: 'Playlist ♡', ja: 'プレイリスト ♡' },
    'pl.sub': { id: 'Pilih lagu favoritmu', en: 'Pick your favorite song', ja: 'お気に入りの曲を選んでね' },
    'pl.prev': { id: 'Lagu sebelumnya', en: 'Previous song', ja: '前の曲' },
    'pl.next': { id: 'Lagu berikutnya', en: 'Next song', ja: '次の曲' },
    'pl.seek': { id: 'Geser posisi lagu', en: 'Seek', ja: '再生位置' }
  };

  /* --- Menu: teks pendek (p) + deskripsi lengkap (d) per kue --- */
  const M = {
    'ichigo-shortcake': {
      pEn: 'Soft sponge cake with fresh cream and juicy strawberries.',
      pJa: 'ふわふわのスポンジに生クリームと新鮮ないちごをのせました。',
      dEn: 'Light, fluffy sponge cake layered with sweet-and-fresh cream and topped with hand-picked strawberries. A customer favorite for birthdays, little gifts, or simply keeping your afternoon tea company. Gently sweet with a bright hint of strawberry tang.',
      dJa: '軽くてやわらかなスポンジに、甘くてさっぱりした生クリームを重ね、厳選したいちごを飾りました。お誕生日や小さなギフト、午後のティータイムのお供にぴったりの人気者です。やさしい甘さの中に、いちごのさわやかな酸味がふわり。'
    },
    'matcha-cloud': {
      pEn: 'Dreamy, soft matcha cake layered with cream.',
      pJa: '夢みたいにやわらかい抹茶ケーキ、クリーム重ね。',
      dEn: 'A cloud-like matcha cake: soft, melt-in-your-mouth, and not too sweet. Made with matcha that has a distinct green-tea flavor and an elegant touch of bitterness, wrapped in matcha cream on top. Perfect for lovers of Japanese flavors.',
      dJa: '雲のようにふんわりとろける、甘さ控えめの抹茶ケーキ。抹茶ならではの茶の香りと上品なほろ苦さがあり、上には抹茶クリームをたっぷり。和の味わいがお好きな方にぴったりです。'
    },
    'red-velvet': {
      pEn: 'Moist red velvet with cream cheese frosting.',
      pJa: 'しっとりレッドベルベットにクリームチーズフロスティング。',
      dEn: 'Deep-red velvet cake with a moist crumb, covered in creamy, slightly tangy cream cheese frosting. One slice feels luxurious and perfectly sweet.',
      dJa: '深い赤色でしっとり食感のレッドベルベットに、なめらかでほんのり酸味のあるクリームチーズフロスティングを重ねました。ひと切れでも贅沢で、甘さもちょうどいい仕上がりです。'
    },
    'vanilla-cloud': {
      pEn: 'Soft vanilla roll cake with cream and coconut sprinkles.',
      pJa: 'やわらかなバニラロールケーキ、クリームとココナッツ添え。',
      dEn: 'An ultra-soft vanilla roll cake rolled up with milky cream, then dusted with white coconut shavings like snow. Light, fragrant, and never cloying.',
      dJa: 'とてもやわらかいバニラのロールケーキに、ミルククリームを巻き、雪のような白いココナッツをふりかけました。軽くて香りがよく、しつこくありません。'
    },
    'choco-lava': {
      pEn: 'Rich chocolate with a melting ganache drip.',
      pJa: '濃厚チョコに、とろけるガナッシュがたっぷり。',
      dEn: 'A warm chocolate cake with a molten chocolate center that flows out when you cut into it. A dusting of powdered sugar on top makes it look pretty. Best enjoyed warm, with a scoop of vanilla ice cream.',
      dJa: 'ナイフを入れると、中からとろりと溶けたチョコレートが流れ出る温かいチョコレートケーキ。粉砂糖をふんわりかけて見た目もかわいく仕上げました。バニラアイスを添えて、温かいうちにどうぞ。'
    },
    'blueberry-cheesecake': {
      pEn: 'Creamy cheesecake with sweet-tart blueberry sauce.',
      pJa: 'なめらかチーズケーキに甘酸っぱいブルーベリーソース。',
      dEn: 'Smooth, creamy cheesecake on a crisp biscuit base, swirled with a sweet-tart blueberry sauce on top. Garnished with fresh blueberries and a mint leaf.',
      dJa: 'サクサクのビスケット生地にのせた、なめらかでクリーミーなチーズケーキ。上には甘酸っぱいブルーベリーソースをきれいにうずまき状にかけ、新鮮なブルーベリーとミントの葉を飾りました。'
    },
    'strawberry-roll': {
      pEn: 'Soft roll cake filled with cream and strawberry pieces.',
      pJa: 'やわらかロールケーキ、クリームといちごたっぷり。',
      dEn: 'A soft sponge roll filled with strawberry cream and fresh fruit pieces, decorated with pink cream and strawberries on top. Sweet, fresh, and cute enough to share.',
      dJa: 'ふわふわのスポンジに、いちごクリームと新鮮なフルーツを巻き込み、上にはピンクのクリームといちごを飾りました。甘くてさわやかで、みんなでシェアしたくなるかわいさです。'
    },
    'mini-cupcake': {
      pEn: 'Tiny size, cute toppings, perfect for sharing.',
      pJa: 'ちいさくてかわいいトッピング、シェアにぴったり。',
      dEn: 'Bite-sized cupcakes with all kinds of cute toppings: strawberry, chocolate, biscuit, and colorful cream. Just right for one bite, perfect for snack boxes, hampers, or sharing at small gatherings.',
      dJa: 'いちご、チョコ、ビスケット、カラフルなクリームなど、かわいいトッピングをのせたミニカップケーキ。ひと口サイズで、スナックボックスやギフトセット、ちょっとしたパーティーのシェアにぴったりです。'
    },
    'choco-donut': {
      pEn: 'Fluffy donut with chocolate glaze and sprinkles.',
      pJa: 'ふわふわドーナツにチョコグレーズとカラースプレー。',
      dEn: 'A fluffy, fragrant donut coated in thick, glossy chocolate glaze. Soft on the inside with just the right chocolatey sweetness. Great for a sweet breakfast or alongside your coffee.',
      dJa: 'ふっくらいい香りのドーナツに、つやつやの濃厚チョコグレーズをかけました。中はやわらかく、チョコの甘さもちょうどいい。甘い朝ごはんやコーヒーのお供にどうぞ。'
    },
    'pink-donut': {
      pEn: 'Donut with pink strawberry glaze and colorful sprinkles.',
      pJa: 'ピンクのいちごグレーズとカラフルなスプレーのドーナツ。',
      dEn: 'A soft donut with pink strawberry glaze, strawberry powder, and fresh strawberry pieces on top. Sweet, fresh, and photogenic.',
      dJa: 'やわらかいドーナツに、ピンクのいちごグレーズといちごパウダー、新鮮ないちごをトッピング。甘くてさわやかで、写真映えも抜群です。'
    },
    'cheese-tart': {
      pEn: 'Flaky layered tart with soft baked egg custard.',
      pJa: 'サクサクのパイ生地に、やわらかい焼きカスタード。',
      dEn: 'A small tart with a crisp, flaky crust and soft egg custard filling, baked until the top is lightly caramelized. Best enjoyed warm.',
      dJa: 'サクサクの層になったタルト生地に、やわらかな卵のカスタードを詰め、表面がほんのりキャラメル色になるまで焼き上げた小さなタルト。温かいうちが一番おいしいです。'
    },
    'fruit-tart': {
      pEn: 'Custard tart topped with fresh fruit.',
      pJa: 'カスタードタルトに新鮮なフルーツをトッピング。',
      dEn: 'A crisp tart shell filled with soft custard, arranged with colorful fresh fruit: strawberry, kiwi, blueberry, and orange. Brushed with a clear glaze so the fruit stays glossy and fresh.',
      dJa: 'サクサクのタルト生地になめらかなカスタードを入れ、いちご、キウイ、ブルーベリー、オレンジなどカラフルな新鮮フルーツをのせました。透明なナパージュで、フルーツはつやつや、みずみずしいまま。'
    },
    'choco-pudding': {
      pEn: 'Rich chocolate pudding with a silky texture.',
      pJa: 'なめらかで濃厚なチョコプリン。',
      dEn: 'A silky, softly firm chocolate pudding draped in chocolate sauce and dusted with cocoa powder. Served with fresh strawberry and mint. Rich chocolate sweetness that still feels light.',
      dJa: 'シルクのようになめらかで、やわらかく固めたチョコレートプリンに、チョコソースとココアパウダーをかけました。新鮮ないちごとミントを添えて。リッチなチョコの甘さなのに、軽やかです。'
    },
    'caramel-pudding': {
      pEn: 'Classic Japanese purin with warm caramel sauce.',
      pJa: '昔ながらの日本のプリン、あたたかいカラメルソース。',
      dEn: "Japanese-style purin that's soft and a little bouncy, topped with burnt caramel sauce with a slight bitterness. Simple, classic, and addictive. Best enjoyed chilled.",
      dJa: 'やわらかくてほどよい弾力の和風プリンに、ほろ苦いカラメルソースをかけました。シンプルで王道、ついくせになる味。冷やして食べるのが一番おいしいです。'
    },
    'tiramisu-cup': {
      pEn: 'Layers of coffee, mascarpone, and cocoa in a cup.',
      pJa: 'コーヒー、マスカルポーネ、ココアを重ねたカップデザート。',
      dEn: "Layers of coffee-soaked ladyfingers, soft mascarpone cream, and cocoa powder. Served in a clear cup, so it's easy to carry and lovely to look at.",
      dJa: 'コーヒーをしみ込ませたレディフィンガー、なめらかなマスカルポーネクリーム、ココアパウダーを重ねました。透明なカップに入っているので、持ち運びにも便利で見た目もきれいです。'
    },
    'rose-parfait': {
      pEn: 'Strawberry parfait layered with cream and sponge.',
      pJa: 'いちごパフェ、クリームとスポンジの層。',
      dEn: 'A parfait with strawberry ice cream, cream, strawberry sauce, and toppings of cherry and a chocolate stick. Served in a pretty classic sundae glass. The perfect dessert for days that need a little sweetening up.',
      dJa: 'いちごアイス、クリーム、いちごソースを重ね、さくらんぼとチョコレートスティックをトッピングしたパフェ。かわいいクラシックなサンデーグラスで提供します。ちょっと甘やかされたい日にぴったりのデザートです。'
    },
    'sakura-mochi': {
      pEn: 'Chewy three-flavor mochi with a sweet cream filling.',
      pJa: 'もちもち三色もちに、甘いクリームの詰め物。',
      dEn: 'Chewy pink mochi filled with sweet bean paste, wrapped in a salted cherry leaf. A signature Japanese pairing of sweet and slightly salty, with a gentle sakura aroma.',
      dJa: 'ピンク色のもちもちのお餅に甘いあんこを入れ、塩漬けの桜の葉で包みました。甘さとほのかな塩気が合わさった日本らしい味わいで、桜の香りがやさしく広がります。'
    },
    'dango-trio': {
      pEn: 'Three chewy dango balls, hanami-festival style.',
      pJa: 'お花見スタイルの三色だんご。',
      dEn: 'Three chewy dango balls in pink, white, and green on a single skewer, inspired by the hanami festival in cherry blossom season. Chewy, gently sweet, and lovely to photograph.',
      dJa: 'ピンク、白、緑の三色のもちもちだんごを1本の串に刺しました。桜の季節のお花見をイメージしています。もちもち食感でやさしい甘さ、写真映えもばっちりです。'
    },
    'strawberry-milk': {
      pEn: 'Chilled strawberry milk with whipped cream.',
      pJa: '冷たいいちごミルクにホイップクリーム。',
      dEn: 'A creamy strawberry milkshake topped with whipped cream, strawberry sauce, and fresh strawberries. Sweet, cold, and refreshing. Perfect for hot weather.',
      dJa: 'なめらかないちごミルクシェイクに、ホイップクリーム、いちごソース、新鮮ないちごをトッピング。甘くて冷たくて、さわやかな一杯。暑い日にぴったりです。'
    },
    'matcha-latte': {
      pEn: 'Premium matcha with fresh milk and ice.',
      pJa: '上質な抹茶とフレッシュミルク、氷を合わせて。',
      dEn: 'Quality matcha whisked smooth and poured over fresh milk and ice, creating a pretty green-and-white gradient. A balanced bittersweet flavor that is refreshing.',
      dJa: '上質な抹茶をなめらかに点てて、新鮮なミルクと氷の上に注ぎ、きれいな緑と白のグラデーションに。ほろ苦さと甘さのバランスがよく、すっきり飲めます。'
    },
    'strawberry-shortcake-cup': {
      pEn: 'Strawberry drink with whipped cream and strawberry sauce.',
      pJa: 'いちごドリンクにホイップとソースをトッピング。',
      dEn: 'A chilled strawberry drink with whipped cream, strawberry sauce, and fresh strawberries. It tastes like shortcake in a glass: sweet, creamy, and adorable.',
      dJa: '冷たいいちごドリンクに、ホイップクリーム、いちごソース、新鮮ないちごをのせました。グラスの中のショートケーキのような、甘くてクリーミーでとってもかわいい味です。'
    }
  };
  Object.keys(M).forEach(k => {
    D['m.' + k + '.p'] = { en: M[k].pEn, ja: M[k].pJa };
    D['m.' + k + '.d'] = { en: M[k].dEn, ja: M[k].dJa };
  });

  /* --- Engine --- */
  const base = new Map();       // teks asli (Indonesia) dari HTML
  const listeners = [];
  let lang = 'id';
  try { const s = localStorage.getItem('pikaLang'); if (LANGS.includes(s)) lang = s; } catch (e) {}

  function t(key, vars) {
    let v;
    const e = D[key];
    if (e && e[lang] !== undefined) v = e[lang];
    else if (e && e.id !== undefined) v = e.id;
    else if (base.has(key)) v = base.get(key);
    else v = key;
    if (vars) v = v.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
    return v;
  }

  const ATTRS = [['i18nAria', 'aria-label'], ['i18nTitle', 'title'], ['i18nPh', 'placeholder']];

  function capture() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (!base.has(el.dataset.i18n)) base.set(el.dataset.i18n, el.innerHTML);
    });
    ATTRS.forEach(([ds, attr]) => document.querySelectorAll('[data-' + ds.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + ']').forEach(el => {
      const k = el.dataset[ds];
      if (!base.has(k)) base.set(k, el.getAttribute(attr) || '');
    }));
    document.querySelectorAll('.cake-card[data-key]').forEach(c => base.set('m.' + c.dataset.key + '.d', c.dataset.desc));
    base.set('doc.title', document.title);
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t(el.dataset.i18n);
      if (el.innerHTML !== v) el.innerHTML = v;
    });
    ATTRS.forEach(([ds, attr]) => document.querySelectorAll('[data-' + ds.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + ']').forEach(el => {
      el.setAttribute(attr, t(el.dataset[ds]));
    }));
    document.querySelectorAll('.cake-card[data-key]').forEach(c => { c.dataset.desc = t('m.' + c.dataset.key + '.d'); });
    document.title = t('doc.title');
    document.querySelectorAll('#langSwitch button').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  window.I18N = {
    t,
    get lang() { return lang; },
    init() { capture(); apply(); },
    set(l) {
      if (!LANGS.includes(l) || l === lang) return;
      lang = l;
      try { localStorage.setItem('pikaLang', l); } catch (e) {}
      apply();
      listeners.forEach(fn => fn(l));
    },
    onChange(fn) { listeners.push(fn); }
  };
})();
