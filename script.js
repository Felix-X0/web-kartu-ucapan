document.addEventListener('DOMContentLoaded', () => {
    const landingScreen = document.getElementById('landingScreen');
    const appScreen = document.getElementById('appScreen');
    const startBtn = document.getElementById('startBtn');
    const backBtn = document.getElementById('backBtn');

    // Navigasi Layar
    startBtn.addEventListener('click', () => {
        landingScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
    });

    backBtn.addEventListener('click', () => {
        appScreen.classList.add('hidden');
        landingScreen.classList.remove('hidden');
    });

    // Sinkronisasi Teks
    const inputs = ['toInput', 'messageInput', 'fromInput'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            document.getElementById('cardToText').textContent = "Untuk: " + document.getElementById('toInput').value;
            document.getElementById('cardMessageText').textContent = document.getElementById('messageInput').value;
            document.getElementById('cardFromText').textContent = "Dari: " + document.getElementById('fromInput').value;
        });
    });

    // Share Link
    document.getElementById('shareBtn').addEventListener('click', () => {
        const data = {
            to: document.getElementById('toInput').value,
            msg: document.getElementById('messageInput').value,
            from: document.getElementById('fromInput').value
        };
        const encoded = btoa(JSON.stringify(data));
        const url = window.location.origin + window.location.pathname + "?data=" + encoded;
        navigator.clipboard.writeText(url);
        alert("Link disalin!");
    });
});
