
const eventDate = new Date("August 15, 2026 18:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const countdown = document.getElementById("countdown");
    if (!countdown) return;

    if (distance <= 0) {
        countdown.innerHTML = "<strong>🎉 The celebration has begun!</strong>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `
        <div style="display:flex;justify-content:center;gap:18px;flex-wrap:wrap;">
            <div><strong style="font-size:2rem;">${days}</strong><br>Days</div>
            <div><strong style="font-size:2rem;">${hours}</strong><br>Hours</div>
            <div><strong style="font-size:2rem;">${minutes}</strong><br>Minutes</div>
            <div><strong style="font-size:2rem;">${seconds}</strong><br>Seconds</div>
        </div>
    `;
}

updateCountdown();
setInterval(updateCountdown, 1000);
