// ===================================================
// 1. ELEMEN NAVIGASI HALAMAN & TAB MOBILE
// ===================================================
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const landingScreen = document.getElementById('landingScreen');
const appScreen = document.getElementById('appScreen');

// Berpindah dari Beranda ke Studio Aplikasi
startBtn.addEventListener('click', () => {
    landingScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
});

// Kembali ke Beranda
backBtn.addEventListener('click', () => {
    appScreen.classList.add('hidden');
    landingScreen.classList.remove('hidden');
});

// Sistem Ganti Tab Konten & Gaya di Tampilan HP
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        tabLinks.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        link.classList.add('active');
        const tabId = link.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ===================================================
// 2. INPUT KONTEN TEKS & SINKRONISASI REAL-TIME
// ===================================================
const toInput = document.getElementById('toInput');
const messageInput = document.getElementById('messageInput');
const fromInput = document.getElementById('fromInput');

const cardToText = document.getElementById('cardToText');
const cardMessageText = document.getElementById('cardMessageText');
const cardFromText = document.getElementById('cardFromText');
const clearBtn = document.getElementById('clearBtn');

// Fungsi memperbarui tampilan teks kartu secara berkala
function updateCardText() {
    cardToText.textContent = toInput.value || '';
    cardMessageText.textContent = messageInput.value || '';
    cardFromText.textContent = fromInput.value || '';
}

toInput.addEventListener('input', updateCardText);
messageInput.addEventListener('input', updateCardText);
fromInput.addEventListener('input', updateCardText);

// Tombol Reset (Kosongkan Semua Input)
clearBtn.addEventListener('click', () => {
    toInput.value = '';
    messageInput.value = '';
    fromInput.value = '';
    updateCardText();
});

// ===================================================
// 3. KONTROL FORMAT, UKURAN FONT & TIPOGRAFI
// ===================================================
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeVal = document.getElementById('fontSizeVal');

// Mengatur ukuran font isi pesan ucapan
fontSizeSlider.addEventListener('input', () => {
    const size = fontSizeSlider.value + 'px';
    fontSizeVal.textContent = size;
    cardMessageText.style.fontSize = size;
});

// Mengatur Rasio Ukuran Kartu (4:5, 1:1, 10:16)
const ratioBtns = document.querySelectorAll('.ratio-btn');
const cardCanvas = document.getElementById('cardCanvas');

ratioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        ratioBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Reset kelas rasio yang ada sebelumnya
        cardCanvas.classList.remove('ratio-45', 'ratio-11', 'ratio-916');
        
        // Pasang kelas rasio yang baru dipilih
        const ratioClass = btn.getAttribute('data-ratio');
        cardCanvas.classList.add(ratioClass);
    });
});

// Mengatur Pilihan Font Eksklusif (Tipografi)
const fontSelector = document.getElementById('fontSelector');
fontSelector.addEventListener('change', () => {
    cardCanvas.style.fontFamily = fontSelector.value;
});

// ===================================================
// 4. KONTROL PALET WARNA TEMA & WARNA KUSTOM
// ===================================================
const themeBtns = document.querySelectorAll('.theme-btn');
const customColorBg = document.getElementById('customColorBg');

// Memilih tema warna kurasi bawaan aplikasi
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Hapus style warna kustom jika sebelumnya pernah memilih color picker
        cardCanvas.style.backgroundColor = '';

        // Hapus semua kelas tema lama (dari theme-1 sampai theme-10)
        for (let i = 1; i <= 10; i++) {
            cardCanvas.classList.remove(`theme-${i}`);
        }

        // Pasang tema baru
        const themeClass = btn.getAttribute('data-theme');
        cardCanvas.classList.add(themeClass);
    });
});

// Mengatur Latar Belakang Kartu via Custom Color Picker
customColorBg.addEventListener('input', () => {
    // Nonaktifkan tanda aktif pada palet warna bawaan
    themeBtns.forEach(b => b.classList.remove('active'));
    
    // Terapkan warna pilihan langsung ke canvas kartu ucapan
    cardCanvas.style.backgroundColor = customColorBg.value;
});

// ===================================================
// 5. FITUR PREMIUM UNDUH GAMBAR (HD / 4K RENDER)
// ===================================================
const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', () => {
    // Beri feedback visual kalau sistem sedang memproses gambar
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = 'Merender... ⏳';
    downloadBtn.disabled = true;
    
    // Konfigurasi premium agar hasil download super tajam dan anti-pecah
    const renderOptions = {
        scale: 3,            // Meningkatkan resolusi render gambar 3x lipat (HD/4K)
        useCORS: true,       // Memaksa font eksternal dari Google Fonts ter-render sempurna
        allowTaint: false,
        logging: false,
        backgroundColor: null // Menjaga transparansi atau warna latar asli kartu tetap utuh
    };

    // Eksekusi render canvas HTML ke bentuk file gambar PNG
    html2canvas(cardCanvas, renderOptions).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Atelier-Studio-Card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Kembalikan status tombol seperti semula setelah selesai unduh
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    }).catch(err => {
        console.error('Gagal merender gambar:', err);
        alert('Waduh, ada sedikit masalah saat menyimpan gambar. Coba lagi ya!');
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    });
});

// ===================================================
// 6. FITUR BERBAGI LINK (SHARE BUTTON)
// ===================================================
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', () => {
    // Cek apakah browser mendukung fitur Web Share bawaan sistem HP
    if (navigator.share) {
        navigator.share({
            title: 'Atelier Card Studio',
            text: 'Yuk lihat kartu ucapan estetik buatan saya di Atelier Card Studio!',
            url: window.location.href
        }).catch(err => console.log('Batal berbagi:', err));
    } else {
        // Fallback: Jika tidak didukung, otomatis salin link website ke clipboard HP
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link website berhasil disalin! Kamu bisa langsung membagikannya ke WhatsApp atau Instagram.');
        }).catch(() => {
            alert('Gagal menyalin secara otomatis. Silakan salin manual URL di browser kamu.');
        });
    }
});
