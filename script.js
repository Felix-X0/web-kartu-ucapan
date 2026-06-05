document.addEventListener('DOMContentLoaded', () => {
    
    // ELEMEN NAVIGASI HALAMAN (2 HALAMAN SYSTEM)
    const landingScreen = document.getElementById('landingScreen');
    const appScreen = document.getElementById('appScreen');
    const startBtn = document.getElementById('startBtn');
    const backBtn = document.getElementById('backBtn');

    // Klik tombol Mulai -> Pindah ke Studio Editor
    startBtn.addEventListener('click', () => {
        landingScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
        window.scrollTo(0, 0); // Biar halaman langsung fokus ke atas
    });

    // Klik tombol Kembali -> Pulang ke Landing Page
    backBtn.addEventListener('click', () => {
        appScreen.classList.add('hidden');
        landingScreen.classList.remove('hidden');
    });

    // ELEMEN INPUT & CANVAS STUDIO
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

    // Terapkan font awal bawaan selector
    cardMessageText.style.fontFamily = fontSelector.value;

    // Sinkronisasi teks real-time
    function updatePreview() {
        cardToText.textContent = toInput.value || "[Nama]";
        cardMessageText.textContent = messageInput.value || "[Isi Ucapan]";
        cardFromText.textContent = fromInput.value || "[Nama]";
    }

    toInput.addEventListener('input', updatePreview);
    messageInput.addEventListener('input', updatePreview);
    fromInput.addEventListener('input', updatePreview);

    // Ganti Font Langsung via Inline Style agar terbaca pas di-download
    fontSelector.addEventListener('change', (e) => {
        cardMessageText.style.fontFamily = e.target.value;
    });

    // Ganti Tema Warna & Motif
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.theme-btn.active').classList.remove('active');
            btn.classList.add('active');
            const selectedTheme = btn.getAttribute('data-theme');
            cardCanvas.className = `card-canvas ${selectedTheme}`;
        });
    });

    // Download Gambar Premium (HD Skala 3x)
    downloadBtn.addEventListener('click', () => {
        downloadBtn.textContent = 'Menyimpan...';
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

            downloadBtn.textContent = 'Simpan Gambar';
            downloadBtn.disabled = false;
        }).catch(() => {
            downloadBtn.textContent = 'Gagal';
            downloadBtn.disabled = false;
        });
    });

    // Kirim Langsung (Share API)
    shareBtn.addEventListener('click', () => {
        shareBtn.textContent = 'Menyiapkan...';
        shareBtn.disabled = true;

        html2canvas(cardCanvas, { scale: 3, useCORS: true, logging: false }).then(canvas => {
            canvas.toBlob(blob => {
                const file = new File([blob], "AtelierCard.png", { type: "image/png" });
                
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    navigator.share({
                        title: 'Kartu Ucapan Premium',
                        text: 'Ada kartu ucapan spesial yang dibuat khusus untukmu.',
                        files: [file]
                    }).catch(err => console.log('Batal berbagi:', err));
                } else {
                    alert('Sistem perangkatmu tidak mendukung fitur kirim otomatis. Silakan gunakan tombol Simpan Gambar saja ya!');
                }

                shareBtn.textContent = 'Kirim Langsung 📲';
                shareBtn.disabled = false;
            }, 'image/png');
        });
    });

    // Jalankan preview teks bawaan saat pertama buka
    updatePreview();
});
