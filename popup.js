
document.getElementById('openManager').addEventListener('click', () => {
    chrome.tabs.create({ url: 'full_page.html' });
});
