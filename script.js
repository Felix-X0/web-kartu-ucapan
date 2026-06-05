// ===================================================
// 1. ELEMEN NAVIGASI HALAMAN & TAB MOBILE
// ===================================================
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const landingScreen = document.getElementById('landingScreen');
const appScreen = document.getElementById('appScreen');

startBtn.addEventListener('click', () => {
    landingScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
});

backBtn.addEventListener('click', () => {
    appScreen.classList.add('hidden');
    landingScreen.classList.remove('hidden');
});

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

function updateCardText() {
    cardToText.textContent = toInput.value || '';
    cardMessageText.textContent = messageInput.value || '';
    cardFromText.textContent = fromInput.value || '';
}

toInput.addEventListener('input', updateCardText);
messageInput.addEventListener('input', updateCardText);
fromInput.addEventListener('input', updateCardText);

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

fontSizeSlider.addEventListener('input', () => {
    const size = fontSizeSlider.value + 'px';
    fontSizeVal.textContent = size;
    cardMessageText.style.fontSize = size;
});

const ratioBtns = document.querySelectorAll('.ratio-btn');
const cardCanvas = document.getElementById('cardCanvas');

ratioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        ratioBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cardCanvas.classList.remove('ratio-45', 'ratio-11', 'ratio-916');
        const ratioClass = btn.getAttribute('data-ratio');
        cardCanvas.add(ratioClass);
    });
});

const fontSelector = document.getElementById('fontSelector');
fontSelector.addEventListener('change', () => {
    cardCanvas.style.fontFamily = fontSelector.value;
});

// ===================================================
// 4. BARU: FITUR EFEK ATMOSFER & FILTER LIGHTING
// ===================================================
const effectSelector = document.getElementById('effectSelector');
const cardOverlay = document.getElementById('cardOverlay');

effectSelector.addEventListener('change', () => {
    // Hapus semua kelas efek atmosfer yang ada sebelumnya
    cardOverlay.classList.remove('fx-grain', 'fx-snow', 'fx-bokeh');
    
    // Pasang efek baru jika dipilih
    const selectedEffect = effectSelector.value;
    if (selectedEffect !== 'fx-none') {
        cardOverlay.classList.add(selectedEffect);
    }
});

const filterSelector = document.getElementById('filterSelector');
filterSelector.addEventListener('change', () => {
    // Hapus semua kelas filter pencahayaan sebelumnya
    cardCanvas.classList.remove('ft-highcontrast', 'ft-vintage', 'ft-cyber');
    
    // Terapkan filter pencahayaan baru jika dipilih
    const selectedFilter = filterSelector.value;
    if (selectedFilter !== 'ft-none') {
        cardCanvas.classList.add(selectedFilter);
    }
});

// ===================================================
// 5. KONTROL TEMA WARNA & WARNA KUSTOM
// ===================================================
const themeBtns = document.querySelectorAll('.theme-btn');
const customColorBg = document.getElementById('customColorBg');

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cardCanvas.style.backgroundColor = '';

        for (let i = 1; i <= 8; i++) {
            cardCanvas.classList.remove(`theme-${i}`);
        }

        const themeClass = btn.getAttribute('data-theme');
        cardCanvas.classList.add(themeClass);
    });
});

customColorBg.addEventListener('input', () => {
    themeBtns.forEach(b => b.classList.remove('active'));
    cardCanvas.style.backgroundColor = customColorBg.value;
});

// ===================================================
// 6. FITUR RENDER LENGKAP GAMBAR HD (3X RESOLUSI)
// ===================================================
const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = 'Merender HD... ⏳';
    downloadBtn.disabled = true;
    
    const renderOptions = {
        scale: 3,            // Menjamin ketajaman tekstur & font (Kualitas Render 4K)
        useCORS: true,       // Menjaga kestabilan integrasi Google Fonts
        allowTaint: false,
        logging: false,
        backgroundColor: null
    };

    html2canvas(cardCanvas, renderOptions).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Atelier-Premium-Card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    }).catch(err => {
        console.error('Gagal merender gambar:', err);
        alert('Gagal merender kartu ucapan, coba ulangi sebentar lagi ya!');
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    });
});

// ===================================================
// 7. FITUR BERBAGI LINK SITUS
// ===================================================
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Atelier Card Studio',
            text: 'Ciptakan kartu ucapan digital premium karyamu sendiri di sini!',
            url: window.location.href
        }).catch(err => console.log('Batal berbagi:', err));
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link studio berhasil disalin! Tinggal tempel dan bagikan ke media sosial.');
        }).catch(() => {
            alert('Gagal menyalin link secara otomatis.');
        });
    }
});
