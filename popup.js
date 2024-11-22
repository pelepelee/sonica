document.addEventListener('DOMContentLoaded', () => {
    const keyInput = document.getElementById('macro-key');
    const textInput = document.getElementById('macro-text');
    const saveButton = document.getElementById('save-macro');
    const macrosList = document.getElementById('macros-list');
  
    // Carregar macros salvas
    function loadMacros() {
      chrome.storage.local.get('macros', (data) => {
        const macros = data.macros || {};
        macrosList.innerHTML = '<h3>Saved Macros</h3>';
        Object.keys(macros).forEach((key) => {
          const item = document.createElement('div');
          item.className = 'macro-item';
          item.innerHTML = `<strong>${key}:</strong> ${macros[key]} <button data-key="${key}" class="delete-macro">Delete</button>`;
          macrosList.appendChild(item);
        });
  
        // Adicionar eventos de exclusão
        document.querySelectorAll('.delete-macro').forEach((button) => {
          button.addEventListener('click', (event) => {
            const macroKey = event.target.getAttribute('data-key');
            deleteMacro(macroKey);
          });
        });
      });
    }
  
    // Salvar macro
    saveButton.addEventListener('click', () => {
      const key = keyInput.value.trim();
      const text = textInput.value.trim();
  
      if (key && text) {
        chrome.storage.local.get('macros', (data) => {
          const macros = data.macros || {};
          macros[key] = text;
          chrome.storage.local.set({ macros }, loadMacros);
          keyInput.value = '';
          textInput.value = '';
        });
      } else {
        alert('Both fields are required!');
      }
    });
  
    // Excluir macro
    function deleteMacro(key) {
      chrome.storage.local.get('macros', (data) => {
        const macros = data.macros || {};
        delete macros[key];
        chrome.storage.local.set({ macros }, loadMacros);
      });
    }
  
    // Carregar macros ao abrir o popup
    loadMacros();
  });
  