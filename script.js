document.addEventListener('DOMContentLoaded', () => {
    
    // Inisialisasi Komponen
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

    // Sinkronisasi Input Teks Kilat (Real-time)
    function updatePreview() {
        cardToText.textContent = toInput.value || "[Nama]";
        cardMessageText.textContent = messageInput.value || "[Isi Pesan]";
        cardFromText.textContent = fromInput.value || "[Nama]";
    }

    toInput.addEventListener('input', updatePreview);
    messageInput.addEventListener('input', updatePreview);
    fromInput.addEventListener('input', updatePreview);

    // Fitur Ganti Font Dinamis
    fontSelector.addEventListener('change', (e) => {
        cardMessageText.style.fontFamily = e.target.value;
    });

    // Fitur Ganti Tema & Motif
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.theme-btn.active').classList.remove('active');
            btn.classList.add('active');
            const selectedTheme = btn.getAttribute('data-theme');
            cardCanvas.className = `card-canvas ${selectedTheme}`;
        });
    });

    // Fitur Download Gambar Premium
    downloadBtn.addEventListener('click', () => {
        downloadBtn.textContent = 'Menyimpan...';
        downloadBtn.disabled = true;

        html2canvas(cardCanvas, { 
            scale: 3, // Skala dinaikkan ke 3x biar gambar super tajam dan tidak pecah
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

    // Fitur Kirim Langsung (Share API) ke WhatsApp/Aplikasi HP
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
                    alert('Sistem perangkatmu tidak mendukung fitur kirim otomatis. Silakan klik tombol Simpan Gambar saja ya!');
                }

                shareBtn.textContent = 'Kirim Langsung 📲';
                shareBtn.disabled = false;
            }, 'image/png');
        });
    });

    // Jalankan sinkronisasi pertama kali
    updatePreview();
});
