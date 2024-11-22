console.log("Background script running!");

// Teste de evento
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});
