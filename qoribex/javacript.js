const playlist = [
        "videos/WhatsApp Video 2025-12-04 at 10.19.31 AM (1).mp4",
        "videos/WhatsApp Video 2025-12-04 at 10.19.31 AM.mp4",
        "videos/WhatsApp Video 2025-12-04 at 10.47.58 AM.mp4",
        "videos/“Cómo documentar un proceso en 10 minutos sin morir en el intento” (1).mp4"
    ];

    let index = 0; // empieza con el primero

    const player = document.getElementById("player");
    const videoSource = document.getElementById("videoSource");

    // Cuando termine un video
    player.addEventListener("ended", () => {
        index++;

        if (index < playlist.length) {
            videoSource.src = playlist[index];
            player.load();
            player.play();
        }
    });