import { useCallback, useState } from "react";

export type CopyState = "idle" | "success" | "fallback";

// Clipboard API first, then a hidden-textarea copy; 'fallback' means the caller should show the text to copy by hand.
export function useCopyText(text: string) {
  const [state, setState] = useState<CopyState>("idle");
  const copy = useCallback(async () => {
    let success = false;
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      try {
        success = document.execCommand("copy");
      } catch {
        success = false;
      } finally {
        field.remove();
      }
    }
    setState(success ? "success" : "fallback");
    return success;
  }, [text]);
  return { state, copy };
}
