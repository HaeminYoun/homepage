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

document.addEventListener("DOMContentLoaded", () => {
    const secretTag = document.querySelector("noway");
    let clickCount = 0;
    const maxClicks = 10;

    function getRandomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`; 
    }

    if (secretTag) {
        secretTag.addEventListener("click", () => {
            clickCount++;

            if (clickCount == maxClicks) {
                // 새 탭 열기
                window.open("https://algosphere.dev", "_blank");

                // 모든 요소 색 랜덤으로 변경
                document.querySelectorAll("*").forEach(el => {
                    // 글자색 랜덤
                    el.style.color = getRandomColor();
                    // 배경색 랜덤
                    el.style.backgroundColor = getRandomColor();
                });

                // 다시 실행 원한다면 카운트 리셋
                clickCount = 0;
            }
        });
    }
});
