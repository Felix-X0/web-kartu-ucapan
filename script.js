// ===================================================
// 1. NAVIGATION CONTROL & MOBILE TABS
// ===================================================
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const landingScreen = document.getElementById('landingScreen');
const appScreen = document.getElementById('appScreen');

if (startBtn) {
    startBtn.addEventListener('click', () => {
        landingScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
    });
}

if (backBtn) {
    backBtn.addEventListener('click', () => {
        appScreen.classList.add('hidden');
        landingScreen.classList.remove('hidden');
    });
}

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
// 2. TEXT FIELDS & LIVE SYNC ENGINE
// ===================================================
const toInput = document.getElementById('toInput');
const messageInput = document.getElementById('messageInput');
const fromInput = document.getElementById('fromInput');

const cardToText = document.getElementById('cardToText');
const cardMessageText = document.getElementById('cardMessageText');
const cardFromText = document.getElementById('cardFromText');
const clearBtn = document.getElementById('clearBtn');

function updateCardText() {
    if(cardToText) cardToText.textContent = toInput.value || '';
    if(cardMessageText) cardMessageText.textContent = messageInput.value || '';
    if(cardFromText) cardFromText.textContent = fromInput.value || '';
}

if(toInput) {
    toInput.addEventListener('input', updateCardText);
    messageInput.addEventListener('input', updateCardText);
    fromInput.addEventListener('input', updateCardText);
}

if(clearBtn) {
    clearBtn.addEventListener('click', () => {
        toInput.value = '';
        messageInput.value = '';
        fromInput.value = '';
        updateCardText();
    });
}

// ===================================================
// 3. FONT CONFIGURATOR & RATIO MODIFIER
// ===================================================
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeVal = document.getElementById('fontSizeVal');

if(fontSizeSlider) {
    fontSizeSlider.addEventListener('input', () => {
        const size = fontSizeSlider.value + 'px';
        fontSizeVal.textContent = size;
        cardMessageText.style.fontSize = size;
    });
}

const ratioBtns = document.querySelectorAll('.ratio-btn');
const cardCanvas = document.getElementById('cardCanvas');

ratioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        ratioBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cardCanvas.classList.remove('ratio-45', 'ratio-11', 'ratio-916');
        const ratioClass = btn.getAttribute('data-ratio');
        cardCanvas.classList.add(ratioClass);
    });
});

const fontSelector = document.getElementById('fontSelector');
if(fontSelector) {
    fontSelector.addEventListener('change', () => {
        cardCanvas.style.fontFamily = fontSelector.value;
    });
}

// ===================================================
// 4. ATMOSPHERIC FX & LIGHTING INTERACTION
// ===================================================
const effectSelector = document.getElementById('effectSelector');
const cardOverlay = document.getElementById('cardOverlay');

if(effectSelector) {
    effectSelector.addEventListener('change', () => {
        cardOverlay.classList.remove('fx-grain', 'fx-snow', 'fx-bokeh');
        const selectedEffect = effectSelector.value;
        if (selectedEffect !== 'fx-none') {
            cardOverlay.classList.add(selectedEffect);
        }
    });
}

const filterSelector = document.getElementById('filterSelector');
if(filterSelector) {
    filterSelector.addEventListener('change', () => {
        cardCanvas.classList.remove('ft-highcontrast', 'ft-vintage', 'ft-cyber');
        const selectedFilter = filterSelector.value;
        if (selectedFilter !== 'ft-none') {
            cardCanvas.classList.add(selectedFilter);
        }
    });
}

// ===================================================
// 5. COLORS ARCHITECT (THEMES & CUSTOM COLOR)
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

if(customColorBg) {
    customColorBg.addEventListener('input', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        cardCanvas.style.backgroundColor = customColorBg.value;
    });
}

// ===================================================
// 6. HD DOWNLOAD ENGINE (4K RESOLUTION SCRIPT)
// ===================================================
const downloadBtn = document.getElementById('downloadBtn');

if(downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = 'Merender HD... ⏳';
        downloadBtn.disabled = true;
        
        const renderOptions = {
            scale: 3,
            useCORS: true,
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
            console.error(err);
            alert('Gagal merender gambar.');
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
        });
    });
}

// ===================================================
// 7. NEW FEATURE: ENVELOPE DYNAMIC URL LINKS GENERATOR
// ===================================================
const shareBtn = document.getElementById('shareBtn');

if(shareBtn) {
    shareBtn.addEventListener('click', () => {
        // Ambil info tema aktif
        let currentTheme = 'theme-1';
        themeBtns.forEach(b => {
            if(b.classList.contains('active')) currentTheme = b.getAttribute('data-theme');
        });

        // Ambil info rasio aktif
        let currentRatio = 'ratio-45';
        ratioBtns.forEach(b => {
            if(b.classList.contains('active')) currentRatio = b.getAttribute('data-ratio');
        });

        // Buat enkripsi query data parameter
        const params = new URLSearchParams();
        params.set('to', toInput.value);
        params.set('msg', messageInput.value);
        params.set('from', fromInput.value);
        params.set('size', fontSizeSlider.value);
        params.set('font', fontSelector.value);
        params.set('fx', effectSelector.value);
        params.set('ft', filterSelector.value);
        params.set('theme', currentTheme);
        params.set('ratio', currentRatio);
        if(cardCanvas.style.backgroundColor) {
            params.set('customBg', cardCanvas.style.backgroundColor);
        }

        // Tautan unik khusus pengiriman amplop kejutan
        const finalShareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

        if (navigator.share) {
            navigator.share({
                title: 'Amplop Eksklusif Untukmu ✉️',
                text: `Halo ${toInput.value}, ada kiriman surat digital estetik misterius buat kamu nih. Buka di sini ya:`,
                url: finalShareUrl
            }).catch(err => console.log(err));
        } else {
            navigator.clipboard.writeText(finalShareUrl).then(() => {
                alert('Tautan Amplop Digital berhasil disalin! Kirimkan link ini ke WhatsApp atau Instagram temanmu sekarang 📲');
            });
        }
    });
}

// ===================================================
// 8. AUTOMATIC LOADER: SYSTEM DECODER FOR RECIPIENT
// ===================================================
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Jika link mengandung query parameter "?to=", tandanya ini diakses oleh si penerima kartu!
    if (urlParams.has('to')) {
        // Sembunyikan generator utama sepenuhnya agar rahasia
        document.getElementById('mainGeneratorWrapper').style.display = 'none';
        
        // Munculkan layar amplop penerima
        const recipientScreen = document.getElementById('recipientScreen');
        recipientScreen.classList.remove('hidden');

        // Tarik data parameter dari URL tautan
        const rTo = urlParams.get('to');
        const rMsg = urlParams.get('msg');
        const rFrom = urlParams.get('from');
        const rSize = urlParams.get('size');
        const rFont = urlParams.get('font');
        const rFx = urlParams.get('fx');
        const rFt = urlParams.get('ft');
        const rTheme = urlParams.get('theme');
        const rRatio = urlParams.get('ratio');
        const rCustomBg = urlParams.get('customBg');

        // Isi data teks pada nama sampul depan amplop & isi kartu
        document.getElementById('envelopeToName').textContent = rTo;
        document.getElementById('recCardToText').textContent = rTo;
        document.getElementById('recCardMessageText').textContent = rMsg;
        document.getElementById('recCardFromText').textContent = rFrom;

        // Racik penampilan kartu sesuai konfigurasi pembuatnya
        const recCard = document.getElementById('recipientCard');
        const recCardOverlay = document.getElementById('recipientCardOverlay');

        // Pasang ukuran font, tipografi, dan aspek format rasio ukuran
        document.getElementById('recCardMessageText').style.fontSize = rSize + 'px';
        recCard.style.fontFamily = rFont;
        recCard.classList.remove('ratio-45');
        recCard.classList.add(rRatio);

        // Pasang skema warna tema / warna kustom pilihan
        if (rCustomBg) {
            recCard.style.backgroundColor = rCustomBg;
        } else {
            recCard.classList.remove('theme-1');
            recCard.classList.add(rTheme);
        }

        // Aktifkan efek atmosfer & filter kontras sinematik
        if (rFx && rFx !== 'fx-none') recCardOverlay.classList.add(rFx);
        if (rFt && rFt !== 'ft-none') recCard.classList.add(rFt);

        // TRIGGER ANIMASI PEMBUKAAN AMPLOP EKSKLUSIF
        const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
        const envelopeWrapper = document.getElementById('envelopeWrapper');
        const recipientCardContainer = document.getElementById('recipientCardContainer');
        const recipientCta = document.getElementById('recipientCta');

        openEnvelopeBtn.addEventListener('click', () => {
            // Amplop meluncur naik dan memudar menghilang
            envelopeWrapper.classList.add('opened');
            
            // Kartu kejutan meluncur keluar secara dramatis beberapa saat kemudian
            setTimeout(() => {
                envelopeWrapper.style.display = 'none';
                recipientCardContainer.classList.remove('hidden-card');
                recipientCta.classList.remove('hidden-cta');
            }, 600);
        });
    }
});
