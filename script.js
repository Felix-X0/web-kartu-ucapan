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
// 3. FONT CONFIGURATOR & RATIO MODIFIER (FIXED)
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

// PERBAIKAN: Font di halaman editor sekarang langsung berubah real-time saat dipilih
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
// 7. SHARE ENGINE: BASE64 COMPRESSION (LINK RAPI & PENDEK)
// ===================================================
const shareBtn = document.getElementById('shareBtn');

if(shareBtn) {
    shareBtn.addEventListener('click', () => {
        let currentTheme = 'theme-1';
        themeBtns.forEach(b => {
            if(b.classList.contains('active')) currentTheme = b.getAttribute('data-theme');
        });

        let currentRatio = 'ratio-45';
        ratioBtns.forEach(b => {
            if(b.classList.contains('active')) currentRatio = b.getAttribute('data-ratio');
        });

        // Simpan konfigurasi ke dalam satu objek bersih tanpa tanda petik perusak font
        const cardData = {
            to: toInput.value,
            msg: messageInput.value,
            from: fromInput.value,
            size: fontSizeSlider.value,
            font: fontSelector.value.replace(/'/g, ""), 
            fx: effectSelector.value,
            ft: filterSelector.value,
            theme: currentTheme,
            ratio: currentRatio,
            customBg: cardCanvas.style.backgroundColor || ""
        };

        // Enkripsi data objek ke Base64 agar link rapi dan pendek di WhatsApp
        const jsonString = JSON.stringify(cardData);
        const encodedData = btoa(encodeURIComponent(jsonString));

        const finalShareUrl = `${window.location.origin}${window.location.pathname}?v=${encodedData}`;

        if (navigator.share) {
            navigator.share({
                title: 'Amplop Eksklusif Untukmu ✉️',
                text: `Halo ${toInput.value}, ada kiriman surat digital misterius buat kamu nih. Buka di sini ya:`,
                url: finalShareUrl
            }).catch(err => console.log(err));
        } else {
            navigator.clipboard.writeText(finalShareUrl).then(() => {
                alert('Tautan Amplop Digital berhasil disalin! Kirimkan link rapi ini ke temanmu sekarang 📲');
            });
        }
    });
}

// ===================================================
// 8. AUTOMATIC DECODER & LOADER UNTUK PENERIMA
// ===================================================
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Deteksi link kiriman amplop versi terkompresi (?v=...)
    if (urlParams.has('v')) {
        document.getElementById('mainGeneratorWrapper').style.display = 'none';
        const recipientScreen = document.getElementById('recipientScreen');
        recipientScreen.classList.remove('hidden');

        try {
            // Pecahkan kembali kode Base64 menjadi data asli
            const encodedData = urlParams.get('v');
            const decodedData = JSON.parse(decodeURIComponent(atob(encodedData)));

            // Distribusi teks ke elemen amplop & kartu
            document.getElementById('envelopeToName').textContent = decodedData.to;
            document.getElementById('recCardToText').textContent = decodedData.to;
            document.getElementById('recCardMessageText').textContent = decodedData.msg;
            document.getElementById('recCardFromText').textContent = decodedData.from;

            const recCard = document.getElementById('recipientCard');
            const recCardOverlay = document.getElementById('recipientCardOverlay');

            // Kembalikan konfigurasi font & ukuran teks
            document.getElementById('recCardMessageText').style.fontSize = decodedData.size + 'px';
            recCard.style.fontFamily = decodedData.font.includes('sans-serif') ? decodedData.font : `'${decodedData.font}', serif`;
            
            recCard.classList.remove('ratio-45');
            recCard.classList.add(decodedData.ratio);

            // Kembalikan konfigurasi warna
            if (decodedData.customBg) {
                recCard.style.backgroundColor = decodedData.customBg;
            } else {
                recCard.classList.remove('theme-1');
                recCard.classList.add(decodedData.theme);
            }

            // Aktifkan efek atmosfer & filter kontras
            if (decodedData.fx && decodedData.fx !== 'fx-none') recCardOverlay.classList.add(decodedData.fx);
            if (decodedData.ft && decodedData.ft !== 'ft-none') recCard.classList.add(decodedData.ft);

        } catch (e) {
            console.error("Gagal membaca enkripsi data kartu:", e);
            alert("Maaf, link kartu ucapan ini rusak atau tidak valid.");
        }

        // ANIMASI INTERAKTIF AMPLOP SURAT
        const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
        const envelopeWrapper = document.getElementById('envelopeWrapper');
        const recipientCardContainer = document.getElementById('recipientCardContainer');
        const recipientCta = document.getElementById('recipientCta');

        openEnvelopeBtn.addEventListener('click', () => {
            envelopeWrapper.classList.add('opened');
            setTimeout(() => {
                envelopeWrapper.style.display = 'none';
                recipientCardContainer.classList.remove('hidden-card');
                recipientCta.classList.remove('hidden-cta');
            }, 600);
        });
    }
});
