document.addEventListener('DOMContentLoaded', () => {
    
    // NAVIGATION SCREEN EVENT
    const landingScreen = document.getElementById('landingScreen');
    const appScreen = document.getElementById('appScreen');
    const startBtn = document.getElementById('startBtn');
    const backBtn = document.getElementById('backBtn');

    startBtn.addEventListener('click', () => {
        landingScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
        window.scrollTo(0, 0);
    });

    backBtn.addEventListener('click', () => {
        appScreen.classList.add('hidden');
        landingScreen.classList.remove('hidden');
    });

    // MOBILE TABS CORE SYSTEM
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            link.classList.add('active');
            const targetedTab = link.getAttribute('data-tab');
            document.getElementById(targetedTab).classList.add('active');
        });
    });

    // EDITOR ENGINE DOM
    const toInput = document.getElementById('toInput');
    const messageInput = document.getElementById('messageInput');
    const fromInput = document.getElementById('fromInput');
    
    const cardToText = document.getElementById('cardToText');
    const cardMessageText = document.getElementById('cardMessageText');
    const cardFromText = document.getElementById('cardFromText');
    
    const cardCanvas = document.getElementById('cardCanvas');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const fontSelector = document.getElementById('fontSelector');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeVal = document.getElementById('fontSizeVal');
    const ratioBtns = document.querySelectorAll('.ratio-btn');
    const customColorBg = document.getElementById('customColorBg');

    // Terapkan konfigurasi awal
    cardMessageText.style.fontFamily = fontSelector.value;
    cardMessageText.style.fontSize = fontSizeSlider.value + "px";

    // Fungsi Sinkronisasi Teks Real-time
    function updatePreview() {
        cardToText.textContent = toInput.value || "";
        cardMessageText.textContent = messageInput.value || "";
        cardFromText.textContent = fromInput.value || "";
    }

    toInput.addEventListener('input', updatePreview);
    messageInput.addEventListener('input', updatePreview);
    fromInput.addEventListener('input', updatePreview);

    // SLIDER UKURAN FONT DINAMIS
    fontSizeSlider.addEventListener('input', (e) => {
        const size = e.target.value + "px";
        fontSizeVal.textContent = size;
        cardMessageText.style.fontSize = size;
    });

    // GANTI FORMAT RASIO KARTU (1:1, 4:5, 9:16)
    ratioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.ratio-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            const ratioType = btn.getAttribute('data-ratio');
            cardCanvas.classList.remove('ratio-45', 'ratio-11', 'ratio-916');
            
            if(ratioType === 'ratio-11') cardCanvas.classList.add('ratio-11');
            if(ratioType === 'ratio-916') cardCanvas.classList.add('ratio-916');
        });
    });

    // CUSTOM COLOR PICKER BACKGROUND
    customColorBg.addEventListener('input', (e) => {
        cardCanvas.className = "card-canvas"; 
        cardCanvas.style.background = e.target.value;
        cardCanvas.style.color = "#ffffff"; 
    });

    // TOMBOL RESET
    clearBtn.addEventListener('click', () => {
        if(confirm("Apakah kamu ingin mengosongkan semua tulisan kartu?")) {
            toInput.value = "";
            messageInput.value = "";
            fromInput.value = "";
            updatePreview();
        }
    });

    // Fitur Ganti Font
    fontSelector.addEventListener('change', (e) => {
        cardMessageText.style.fontFamily = e.target.value;
    });

    // Fitur Ganti Tema Preset
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.theme-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            cardCanvas.style.background = "";
            cardCanvas.style.color = "";
            
            const selectedTheme = btn.getAttribute('data-theme');
            cardCanvas.className = `card-canvas ${selectedTheme}`;
            
            const currentRatio = document.querySelector('.ratio-btn.active').getAttribute('data-ratio');
            if(currentRatio === 'ratio-11') cardCanvas.classList.add('ratio-11');
            if(currentRatio === 'ratio-916') cardCanvas.classList.add('ratio-916');
        });
    });

    // Fitur Download Gambar Ultra HD Skala 3x
    downloadBtn.addEventListener('click', () => {
        downloadBtn.textContent = 'PROSES...';
        downloadBtn.disabled = true;

        html2canvas(cardCanvas, { 
            scale: 3, 
            useCORS: true, 
            logging: false
        }).then(canvas => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.download = `AtelierCard-${toInput.value || 'Premium'}.png`;
            link.href = image;
            link.click();

            downloadBtn.textContent = 'Simpan Gambar 高画質';
            downloadBtn.disabled = false;
        }).catch(() => {
            downloadBtn.textContent = 'Gagal';
            downloadBtn.disabled = false;
        });
    });

    // Fitur Share API WhatsApp Langsung
    shareBtn.addEventListener('click', () => {
        shareBtn.textContent = 'MENYIAPKAN...';
        shareBtn.disabled = true;

        html2canvas(cardCanvas, { scale: 3, useCORS: true, logging: false }).then(canvas => {
            canvas.toBlob(blob => {
                const file = new File([blob], "AtelierCard.png", { type: "image/png" });
                
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    navigator.share({
                        title: 'Atelier Greeting Card',
                        text: 'Ada sebuah kartu ucapan digital eksklusif dirancang khusus untukmu.',
                        files: [file]
                    }).catch(err => console.log('Batal berbagi:', err));
                } else {
                    alert('Sistem perangkatmu tidak mendukung pengiriman file instan otomatis. Silakan gunakan tombol Simpan Gambar saja ya!');
                }

                shareBtn.textContent = 'Kirim Langsung 📲';
                shareBtn.disabled = false;
            }, 'image/png');
        });
    });

    // Inisialisasi awal teks bawaan
    updatePreview();
});
