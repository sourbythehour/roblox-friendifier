function replaceRobloxText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;

    // Replace "Add Connections" → "Add Friends"
    text = text.replace(/\badd connections\b/gi, "Add Friends");

    // Replace standalone "Connections" → "Friends"
    text = text.replace(/\bconnections\b/gi, "Friends");

    // Replace standalone "Connect" → "Friend"
    text = text.replace(/\bconnect\b/gi, "Friend");

    node.textContent = text;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const child of node.childNodes) {
      replaceRobloxText(child);
    }
  }
}

// Initial page load
replaceRobloxText(document.body);

// Observe future changes (dynamic Roblox content)
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      replaceRobloxText(node);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
