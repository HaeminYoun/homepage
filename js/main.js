const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        const action = card.getAttribute('data-action');
        if (action === 'game') alert(`${action} page is not ready yet..`);
        else if (action === 'discord') window.location.href = 'https://discord.com/oauth2/authorize?client_id=1355963437716476238';
        else if (action === 'terraria') alert(`${action} page is not ready yet..`);
    });
});

const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', toggle.checked);
});

const emailElement = document.getElementById('email');
emailElement?.addEventListener('click', () => {
    navigator.clipboard.writeText(emailElement.textContent).then(() => {
        showToast("Email copied to clipboard!");
    });
});

function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

document.addEventListener("DOMContentLoaded", () => {
    const secretTag = document.querySelector("noway");
    let clickCount = 0;
    const maxClicks = 10;
    const audio2 = new Audio("../src/2.mp3");
    audio2.loop = true;
    audio2.volume = 1;

    function getRandomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`; 
    }

    if (secretTag) {
        secretTag.addEventListener("click", () => {
            clickCount++;
            // console.log(clickCount);
                const clickSound = new Audio("../src/1.mp3");
                clickSound.volume = 0.8;
                clickSound.play();

            if (clickCount == maxClicks) {
                audio2.play();

                document.querySelectorAll("*").forEach(el => {
                    el.style.color = getRandomColor();
                    el.style.backgroundColor = getRandomColor();
                });
            }
        });
    }
});
