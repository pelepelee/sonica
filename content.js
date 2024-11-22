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
          const clip = await navigator.clipboard.readText()
          words[words.length - 1] = macros[lastWord].replace("%clip%", clip);
          activeElement.value = words.join(' ');
        }
      });
    }
  });
  