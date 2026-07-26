
/* confetti.js
   Lightweight celebration effect
*/

function launchConfetti(duration = 3000) {
    const colors = ["#c7a44c", "#e6d3a3", "#6d2032", "#ffffff"];
    const end = Date.now() + duration;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    container.style.overflow = "hidden";
    container.style.zIndex = "9999";
    document.body.appendChild(container);

    const timer = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(timer);
            setTimeout(() => container.remove(), 1200);
            return;
        }

        for (let i = 0; i < 12; i++) {
            const piece = document.createElement("div");
            piece.style.position = "absolute";
            piece.style.top = "-20px";
            piece.style.left = Math.random() * 100 + "vw";
            piece.style.width = (6 + Math.random() * 6) + "px";
            piece.style.height = (10 + Math.random() * 10) + "px";
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.opacity = "0.9";
            piece.style.borderRadius = "2px";
            piece.style.transform = `rotate(${Math.random()*360}deg)`;

            const fall = 4 + Math.random() * 3;
            piece.animate([
                { transform: piece.style.transform + " translateY(0)", opacity: 1 },
                { transform: piece.style.transform + ` translateY(110vh) rotate(${720+Math.random()*360}deg)`, opacity: 0.2 }
            ], {
                duration: fall * 1000,
                easing: "linear",
                fill: "forwards"
            });

            container.appendChild(piece);
            setTimeout(() => piece.remove(), fall * 1000);
        }
    }, 180);
}

// Call launchConfetti() after a successful guest search.
// Example:
// if(foundGuest){ launchConfetti(); }
