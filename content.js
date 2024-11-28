
// Escutar eventos de digitação
document.addEventListener('keyup', () => {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        chrome.storage.local.get('macros', async (data) => {
            const macros = data.macros || {};
            const words = activeElement.value.split(' ');
            const lastWord = words[words.length - 1];
            
            // Verificar se o último "comando" corresponde a uma macro
            if (macros[lastWord]) {
                // Expande a macro
                const newValue = words.slice(0, -1).join(' ') + ' ' + macros[lastWord];
                activeElement.value = newValue;

                // Adiciona feedback visual
                const feedback = document.createElement('div');
                feedback.innerText = 'Macro expandida: ' + macros[lastWord];
                feedback.style.position = 'fixed';
                feedback.style.bottom = '10px';
                feedback.style.right = '10px';
                feedback.style.backgroundColor = '#4caf50';
                feedback.style.color = '#fff';
                feedback.style.padding = '10px';
                feedback.style.borderRadius = '5px';
                feedback.style.zIndex = '10000';
                document.body.appendChild(feedback);
                setTimeout(() => feedback.remove(), 2000);
            }
        });
    }
});

// Permitir edição dinâmica de macros
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'updateMacros') {
        chrome.storage.local.set({ macros: request.macros }, () => {
            sendResponse({ success: true, message: 'Macros atualizadas com sucesso!' });
        });
        return true; // Indica que a resposta será enviada de forma assíncrona
    }
});
