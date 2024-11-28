
document.addEventListener('DOMContentLoaded', () => {
    const macrosContainer = document.getElementById('macros');
    const macroKeyInput = document.getElementById('macroKey');
    const macroValueInput = document.getElementById('macroValue');
    const addMacroButton = document.getElementById('addMacro');

    // Load existing macros
    chrome.storage.local.get('macros', (data) => {
        const macros = data.macros || {};
        for (const [key, value] of Object.entries(macros)) {
            addMacroToUI(key, value);
        }
    });

    // Add or Edit macro
    addMacroButton.addEventListener('click', () => {
        const key = macroKeyInput.value.trim();
        const value = macroValueInput.value.trim();

        if (key && value) {
            chrome.storage.local.get('macros', (data) => {
                const macros = data.macros || {};
                macros[key] = value;
                chrome.storage.local.set({ macros }, () => {
                    macrosContainer.innerHTML = ''; // Clear and rebuild the list
                    for (const [key, value] of Object.entries(macros)) {
                        addMacroToUI(key, value);
                    }
                    macroKeyInput.value = '';
                    macroValueInput.value = '';
                });
            });
        }
    });

    // Add macro to UI
    function addMacroToUI(key, value) {
        const macroDiv = document.createElement('div');
        macroDiv.className = 'macro-item';
        macroDiv.innerHTML = `
            <span><b>${key}</b>: ${value}</span>
            <div class="macro-controls">
                <button class="editMacro" data-key="${key}" data-value="${value}">Editar</button>
                <button class="deleteMacro" data-key="${key}">Excluir</button>
            </div>
        `;
        macrosContainer.appendChild(macroDiv);

        // Delete macro
        macroDiv.querySelector('.deleteMacro').addEventListener('click', (event) => {
            const keyToDelete = event.target.getAttribute('data-key');
            chrome.storage.local.get('macros', (data) => {
                const macros = data.macros || {};
                delete macros[keyToDelete];
                chrome.storage.local.set({ macros }, () => {
                    macroDiv.remove();
                });
            });
        });

        // Edit macro
        macroDiv.querySelector('.editMacro').addEventListener('click', (event) => {
            const keyToEdit = event.target.getAttribute('data-key');
            const valueToEdit = event.target.getAttribute('data-value');

            // Prefill inputs with current macro values
            macroKeyInput.value = keyToEdit;
            macroValueInput.value = valueToEdit;
        });
    }
});
