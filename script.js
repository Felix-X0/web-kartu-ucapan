const toInput = document.getElementById('toInput');
const msgInput = document.getElementById('messageInput');
const fromInput = document.getElementById('fromInput');
const cardTo = document.getElementById('cardToText');
const cardMsg = document.getElementById('cardMessageText');
const cardFrom = document.getElementById('cardFromText');
const fontSelector = document.getElementById('fontSelector');
const themeSelector = document.getElementById('themeSelector');
const cardCanvas = document.getElementById('cardCanvas');
const shareBtn = document.getElementById('shareBtn');

// SINKRONISASI TEKS
[toInput, msgInput, fromInput].forEach(el => {
    el.addEventListener('input', () => {
        cardTo.textContent = "Untuk: " + toInput.value;
        cardMsg.textContent = msgInput.value;
        cardFrom.textContent = "Dari: " + fromInput.value;
    });
});

// GANTI FONT
fontSelector.addEventListener('change', () => {
    cardMsg.style.fontFamily = fontSelector.value;
});

// GANTI TEMA
themeSelector.addEventListener('change', () => {
    cardCanvas.className = 'card-container ' + themeSelector.value;
});

// GENERATE LINK PENDEK (BASE64)
shareBtn.addEventListener('click', () => {
    const data = {
        to: toInput.value,
        msg: msgInput.value,
        from: fromInput.value,
        font: fontSelector.value,
        theme: themeSelector.value
    };
    
    const encoded = btoa(JSON.stringify(data));
    const url = window.location.origin + window.location.pathname + "?data=" + encoded;
    
    navigator.clipboard.writeText(url);
    alert("Link pendek berhasil disalin! (Versi rapi)");
});

// LOAD DATA DARI LINK
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('data')) {
        try {
            const decoded = JSON.parse(atob(params.get('data')));
            toInput.value = decoded.to;
            msgInput.value = decoded.msg;
            fromInput.value = decoded.from;
            fontSelector.value = decoded.font;
            themeSelector.value = decoded.theme;
            
            // Terapkan ke kartu
            cardTo.textContent = "Untuk: " + decoded.to;
            cardMsg.textContent = decoded.msg;
            cardMsg.style.fontFamily = decoded.font;
            cardFrom.textContent = "Dari: " + decoded.from;
            cardCanvas.className = 'card-container ' + decoded.theme;
        } catch(e) { console.error("Data tidak valid"); }
    }
});
