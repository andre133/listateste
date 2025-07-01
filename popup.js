document.getElementById('extract').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Injetar primeiro o xlsx
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["xlsx.full.min.js"]
  });

  // Depois o script que extrai os dados e gera a planilha
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});
