// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Ambil semua elemen HTML yang kita butuhkan
    const toInput = document.getElementById('toInput');
    const messageInput = document.getElementById('messageInput');
    const fromInput = document.getElementById('fromInput');
    
    const cardToText = document.getElementById('cardToText');
    const cardMessageText = document.getElementById('cardMessageText');
    const cardFromText = document.getElementById('cardFromText');
    
    const cardCanvas = document.getElementById('cardCanvas');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const downloadBtn = document.getElementById('downloadBtn');

    // 2. Fungsi untuk meng-update preview kartu secara real-time
    function updatePreview() {
        cardToText.textContent = toInput.value || "[Nama Penerima]";
        cardMessageText.textContent = messageInput.value || "[Tulis pesanmu di sini]";
        cardFromText.textContent = fromInput.value || "[Nama Pengirim]";
    }

    // 3. Tambahkan event listener ke input teks (buat update real-time)
    toInput.addEventListener('input', updatePreview);
    messageInput.addEventListener('input', updatePreview);
    fromInput.addEventListener('input', updatePreview);

    // 4. Logika untuk mengganti tema kartu
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus kelas 'active' dari tombol tema lainnya
            document.querySelector('.theme-btn.active').classList.remove('active');
            // Tambahkan kelas 'active' ke tombol yang diklik
            btn.classList.add('active');
            
            // Ambil nama tema dari atribut 'data-theme'
            const selectedTheme = btn.getAttribute('data-theme');
            
            // Ganti kelas tema di elemen kanvas kartu
            // (kita hapus kelas tema lama, tambahkan kelas tema baru)
            cardCanvas.className = `card-canvas ${selectedTheme}`;
        });
    });

    // 5. Fitur Bintang: Download Kartu sebagai Gambar PNG
    downloadBtn.addEventListener('click', () => {
        // Tampilkan loading di tombol (biar keren)
        downloadBtn.textContent = 'Sedang memproses...';
        downloadBtn.style.backgroundColor = '#95a5a6'; // Warna abu-abu saat proses
        downloadBtn.disabled = true;

        // Trik Ajaib: Pakai library html2canvas
        // Fungsi ini bakal nge-scan elemen #cardCanvas dan ngubahnya jadi gambar
        html2canvas(cardCanvas, {
            scale: 2, // Kita naikkan resolusinya agar tidak pecah/blur
            useCORS: true, // Biar bisa baca gambar/font dari luar
            logging: false, // Matikan log biar cepat
        }).then(canvas => {
            // Ubah kanvas gambar jadi URL data PNG
            const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            
            // Buat link download palsu di belakang layar
            const link = document.createElement('a');
            const fileName = `ucapan-estetik-${toInput.value || 'untuk-kamu'}.png`;
            link.download = fileName;
            link.href = image;
            
            // Klik link-nya secara otomatis buat mulai download
            link.click();

            // Kembalikan tombol ke keadaan semula
            downloadBtn.textContent = 'Download sebagai Gambar (PNG)';
            downloadBtn.style.backgroundColor = '#2ecc71';
            downloadBtn.disabled = false;
        }).catch(err => {
            console.error('Ada kesalahan saat membuat gambar:', err);
            downloadBtn.textContent = 'Gagal men-download :(';
            downloadBtn.style.backgroundColor = '#e74c3c';
            downloadBtn.disabled = false;
        });
    });

    // Jalankan fungsi update preview pertama kali saat halaman dimuat
    updatePreview();
});
