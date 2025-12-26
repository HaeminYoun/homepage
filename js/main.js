const imageMap = {
    coin: ["../src/img/coin1.png", "../src/img/coin2.png", "../src/img/coin3.png", "../src/img/coin4.png", "../src/img/coin5.png"],
    tetris: ["../src/img/tetris1.png", "../src/img/tetris2.png", "../src/img/tetris3.png"],
    minesweeper: ["../src/img/minesweeper1.png", "../src/img/minesweeper2.png", "../src/img/minesweeper3.png", "../src/img/minesweeper4.png", "../src/img/minesweeper5.png", "../src/img/minesweeper6.png"],
};

const state = {
    currentProject: null,
    currentIndex: 0,
    lastScrollY: 0
};

const dom = {
    dialog: document.getElementById("projectDialog"),
    dialogImg: document.getElementById("dialogImage"),
    counter: document.getElementById("imageCounter"),
    themeToggle: document.getElementById('darkModeToggle'),
    email: document.getElementById('email'),
    cards: document.querySelectorAll('.card'),
    noway: document.querySelector("noway")
};

function updateDialog() {
    if (!state.currentProject) return;
    const images = imageMap[state.currentProject];
    dom.dialogImg.src = images[state.currentIndex];
    dom.counter.textContent = `${state.currentIndex + 1}/${images.length}`;
}

function openDialog() {
    state.lastScrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed; 
        top: -${state.lastScrollY}px; 
        width: 100%;
    `;
    dom.dialog.showModal();
}

function closeDialogFunc() {
    dom.dialog.close();
    document.body.style.cssText = "";
    window.scrollTo(0, state.lastScrollY);
}

dom.cards.forEach(card => {
    card.addEventListener('click', () => {
        const action = card.getAttribute('data-action');

        if (imageMap[action]) {
            state.currentProject = action;
            state.currentIndex = 0;
            updateDialog();
            openDialog();
        } else if (action === 'discord') {
            window.open('https://discord.com/oauth2/authorize?client_id=1355963437716476238', '_blank');
        } else if (action === 'terraria') {
            window.open('https://steamcommunity.com/sharedfiles/filedetails/?id=3583667968', '_blank');
        } else if (action === 'game') {
            alert("Game 페이지는 준비 중입니다!");
        }
    });
});

dom.dialog.addEventListener("click", (e) => {
    if (e.target === dom.dialog) closeDialogFunc();
});

document.getElementById("closeDialog").addEventListener("click", closeDialogFunc);

document.getElementById("prevBtn").addEventListener("click", () => {
    const images = imageMap[state.currentProject];
    state.currentIndex = (state.currentIndex - 1 + images.length) % images.length;
    updateDialog();
});

document.getElementById("nextBtn").addEventListener("click", () => {
    const images = imageMap[state.currentProject];
    state.currentIndex = (state.currentIndex + 1) % images.length;
    updateDialog();
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dom.dialog.open) closeDialogFunc();
});

dom.themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', dom.themeToggle.checked);
});

dom.email?.addEventListener('click', () => {
    const text = dom.email.textContent;

    const pop = new Audio("../src/audio/1.mp3");
    pop.volume = 0.5;
    pop.play();

    navigator.clipboard.writeText(text).then(() => {
        showToast("Email copied to clipboard!");
    });
});

function showToast(message) {
    const toast = document.createElement("div");
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
    let clickCount = 0;
    const MAX_CLICKS = 10;
    const screamAudio = new Audio("../src/audio/2.mp3");
    screamAudio.loop = true;

    const getRandomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 80%, 50%)`;

    if (dom.noway) {
        dom.noway.addEventListener("click", () => {
            clickCount++;
            
            const pop = new Audio("../src/audio/1.mp3");
            pop.volume = 0.6;
            pop.play();

            if (clickCount === MAX_CLICKS) {
                document.body.classList.add('chaos-mode', 'shake');
                screamAudio.play();

                setInterval(() => {
                    document.querySelectorAll("*").forEach(el => {
                        el.style.color = getRandomColor();
                        el.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 5%)`;
                    });
                }, 100);
            }
        });
    }
});