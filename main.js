document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro-video-container");
    const video = document.getElementById("intro-video");

    video.addEventListener("ended", () => {
        intro.classList.add("fade-out");

        setTimeout(() => {
            intro.style.display = "none";
        }, 1200);
    });
});