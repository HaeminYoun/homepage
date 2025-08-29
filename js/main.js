const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const action = card.getAttribute('data-action');
        if (action === 'game') alert(`${action} page is not ready yet..`);
        else if (action === 'discord') window.location.href = 'https://discord.com/oauth2/authorize?client_id=1355963437716476238';
        else if (action === 'terraria') alert(`${action} page is not ready yet..`);
    });
});
