document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Ambil elemen input dan preview
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

    // 2. Sinkronisasi Teks Otomatis (Real-time)
    function updatePreview() {
        cardToText.textContent = toInput.value || "[Penerima]";
        cardMessageText.textContent = messageInput.value || "[Isi Ucapan]";
        cardFromText.textContent = fromInput.value || "[Pengirim]";
    }

    toInput.addEventListener('input', updatePreview);
    messageInput.addEventListener('input', updatePreview);
    fromInput.addEventListener('input', updatePreview);

    // 3. Mengubah Font Pilihan Pengguna
    fontSelector.addEventListener('change', (e) => {
        cardMessageText.style.fontFamily = e.target.value;
    });

    // 4. Mengubah Tema & Motif Warna Kartu
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.theme-btn.active').classList.remove('active');
            btn.classList.add('active');
            const selectedTheme = btn.getAttribute('data-theme');
            cardCanvas.className = `card-canvas ${selectedTheme}`;
        });
    });

    // 5. Logika Download Gambar PNG
    downloadBtn.addEventListener('click', () => {
        downloadBtn.textContent = 'Memproses...';
        downloadBtn.disabled = true;

        html2canvas(cardCanvas, { scale: 2, useCORS: true, logging: false }).then(canvas => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.download = `ucapan-${toInput.value || 'card'}.png`;
            link.href = image;
            link.click();

            downloadBtn.textContent = 'Download Gambar';
            downloadBtn.disabled = false;
        }).catch(() => {
            downloadBtn.textContent = 'Gagal :(';
            downloadBtn.disabled = false;
        });
    });

    // 6. Logika Kirim Langsung (Share API) ke WhatsApp/Aplikasi Lain
    shareBtn.addEventListener('click', () => {
        shareBtn.textContent = 'Menyiapkan...';
        shareBtn.disabled = true;

        html2canvas(cardCanvas, { scale: 2, useCORS: true, logging: false }).then(canvas => {
            canvas.toBlob(blob => {
                const file = new File([blob], "kartu-ucapan.png", { type: "image/png" });
                
                // Cek apakah sistem browser mendukung fitur Berbagi File
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    navigator.share({
                        title: 'Kartu Ucapan Digital',
                        text: 'Hai, ada kartu ucapan spesial nih buat kamu!',
                        files: [file]
                    }).catch(err => console.log('Batal berbagi:', err));
                } else {
                    alert('Sistem perangkatmu tidak mendukung kirim langsung otomatis. Silakan download gambarnya secara manual ya!');
                }

                shareBtn.textContent = 'Kirim Langsung 📲';
                shareBtn.disabled = false;
            }, 'image/png');
        });
    });

    // Jalankan preview awal
    updatePreview();
});
