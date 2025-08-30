const cards = document.querySelectorAll('.card');   // 프로젝트 카드
cards.forEach(card => {
    card.addEventListener('click', () => {
        const action = card.getAttribute('data-action');
        if (action === 'game') alert(`${action} page is not ready yet..`);
        else if (action === 'discord') window.location.href = 'https://discord.com/oauth2/authorize?client_id=1355963437716476238';
        else if (action === 'terraria') alert(`${action} page is not ready yet..`);
    });
});

const toggle = document.getElementById('darkModeToggle');   // 다크모드
toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', toggle.checked);
});

const emailElement = document.getElementById('email');   // 메일 복사
emailElement?.addEventListener('click', () => {
    navigator.clipboard.writeText(emailElement.textContent).then(() => {
        showToast("Email copied to clipboard!");
    });
});

function showToast(message) {   //토스트 메시지
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
