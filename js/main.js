const cards = document.querySelectorAll('.card');

const dialog = document.getElementById("projectDialog");
const dialogImage = document.getElementById("dialogImage");
const closeDialog = document.getElementById("closeDialog");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const counter = document.getElementById("imageCounter");

const imageMap = {
    coin: ["../src/img/coin1.png", "../src/img/coin2.png", "../src/img/coin3.png", "../src/img/coin4.png", "../src/img/coin5.png"],
    tetris: ["../src/img/tetris1.png", "../src/img/tetris2.png", "../src/img/tetris3.png"],
    minesweeper: ["../src/img/minesweeper1.png", "../src/img/minesweeper2.png", "../src/img/minesweeper3.png", "../src/img/minesweeper4.png", "../src/img/minesweeper5.png", "../src/img/minesweeper6.png"],
};

let currentProject = null;
let currentIndex = 0;
let scrollY = 0;

function updateDialog() {
    if (!currentProject) return;
    const images = imageMap[currentProject];
    dialogImage.src = images[currentIndex];
    counter.textContent = `${currentIndex + 1}/${images.length}`;
}

function openDialog() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    dialog.showModal();
}

function closeDialogFunc() {
    dialog.close();
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        const action = card.getAttribute('data-action');

        if (imageMap[action]) {
            currentProject = action;
            currentIndex = 0;
            updateDialog();
            openDialog();
        } else if (action === 'discord') {
            window.location.href = 'https://discord.com/oauth2/authorize?client_id=1355963437716476238';
        } else if (action === 'game' || action === 'terraria') {
            window.location.href = 'https://steamcommunity.com/sharedfiles/filedetails/?id=3583667968';
        }
    });
});

dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

    if (!clickedInDialog) {
        closeDialogFunc();
    }
});

closeDialog.addEventListener("click", () => {
    closeDialogFunc();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialog.open) {
        closeDialogFunc();
    }
});

prevBtn.addEventListener("click", () => {
    if (!currentProject) return;
    const images = imageMap[currentProject];
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateDialog();
});

nextBtn.addEventListener("click", () => {
    if (!currentProject) return;
    const images = imageMap[currentProject];
    currentIndex = (currentIndex + 1) % images.length;
    updateDialog();
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
    const audio2 = new Audio("../src/audio/2.mp3");
    audio2.loop = true;
    audio2.volume = 1;

    function getRandomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`; 
    }

    if (secretTag) {
        secretTag.addEventListener("click", () => {
            clickCount++;
            const clickSound = new Audio("../src/audio/1.mp3");
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
