document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTOR
    const toInput = document.getElementById('toInput');
    const msgInput = document.getElementById('messageInput');
    const fromInput = document.getElementById('fromInput');
    const cardTo = document.getElementById('cardToText');
    const cardMsg = document.getElementById('cardMessageText');
    const cardFrom = document.getElementById('cardFromText');
    const cardCanvas = document.getElementById('cardCanvas');
    const shareBtn = document.getElementById('shareBtn');
    const startBtn = document.getElementById('startBtn');
    const landingScreen = document.getElementById('landingScreen');
    const appScreen = document.getElementById('appScreen');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // 2. NAVIGASI AWAL
    startBtn.addEventListener('click', () => {
        landingScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
    });

    // 3. TAB SWITCHING
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            link.classList.add('active');
            document.getElementById(link.getAttribute('data-tab')).classList.add('active');
        });
    });

    // 4. SINKRONISASI TEKS
    const updateCard = () => {
        cardTo.textContent = toInput.value || "Kak Shinta";
        cardMsg.textContent = msgInput.value;
        cardFrom.textContent = fromInput.value || "Adun";
    };

    [toInput, msgInput, fromInput].forEach(el => {
        el.addEventListener('input', updateCard);
    });

    // 5. GANTI TEMA
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            // Menghapus semua class theme yang ada
            cardCanvas.className = cardCanvas.className.replace(/theme-\d+/g, '');
            cardCanvas.classList.add(theme);
            
            // UI feedback
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 6. GENERATE & SHARE
    shareBtn.addEventListener('click', () => {
        const currentTheme = Array.from(cardCanvas.classList).find(c => c.startsWith('theme-'));
        const data = {
            to: toInput.value,
            msg: msgInput.value,
            from: fromInput.value,
            theme: currentTheme
        };
        
        const encoded = btoa(JSON.stringify(data));
        const url = window.location.origin + window.location.pathname + "?data=" + encoded;
        
        navigator.clipboard.writeText(url);
        alert("Tautan kartu berhasil disalin! Silakan kirim ke orang tersayang.");
    });

    // 7. LOAD DATA DARI URL
    const params = new URLSearchParams(window.location.search);
    if (params.has('data')) {
        try {
            const decoded = JSON.parse(atob(params.get('data')));
            toInput.value = decoded.to;
            msgInput.value = decoded.msg;
            fromInput.value = decoded.from;
            
            // Terapkan tema
            cardCanvas.className = cardCanvas.className.replace(/theme-\d+/g, '');
            cardCanvas.classList.add(decoded.theme);
            
            updateCard();
            
            // Tampilkan app langsung
            landingScreen.classList.add('hidden');
            appScreen.classList.remove('hidden');
        } catch(e) { console.error("Data link tidak valid"); }
    }
});
