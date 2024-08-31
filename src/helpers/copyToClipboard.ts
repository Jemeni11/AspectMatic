function unsecuredCopyToClipboard(text: string): void {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");

    if (!successful) {
      console.error("Unsecured clipboard copy failed");
    }
  } catch (err) {
    console.error("Failed to copy content to clipboard", err);
  } finally {
    document.body.removeChild(textArea);
  }
}

export default function copyToClipboard(content: string): void {
  if (window.isSecureContext && navigator?.clipboard?.writeText) {
    navigator.clipboard
      .writeText(content)
      .catch((err) =>
        console.error("Failed to copy content to clipboard", err),
      );
  } else {
    unsecuredCopyToClipboard(content);
  }
}
