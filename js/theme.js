// js/theme.js — công tắc dark mode

export function initTheme() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const root = document.documentElement;

  const applyTheme = (dark) => {
    root.classList.toggle("dark", dark);
    btn.setAttribute("aria-checked", String(dark));
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  btn.addEventListener("click", () => {
    const isDark = root.classList.contains("dark");
    applyTheme(!isDark);
  });

  // Đồng bộ trạng thái nút với class đã có sẵn từ script inline trong <head>
  btn.setAttribute("aria-checked", String(root.classList.contains("dark")));
}