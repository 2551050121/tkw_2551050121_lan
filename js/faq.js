// js/faq.js — Tính năng 3: accordion câu hỏi thường gặp.   (tiết 3)

export function initFaq() {
  const root = document.getElementById("cau-hoi");
  if (!root) return;
  const triggers = [...root.querySelectorAll("[data-faq-trigger]")];
  if (triggers.length === 0) return;

  // TODO 1
  function setOpen(trigger, open) {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    trigger.setAttribute("aria-expanded", String(open));
    if (panel) panel.hidden = !open;
  }

  // TODO 2
  root.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    const willOpen = trigger.getAttribute("aria-expanded") !== "true";
    triggers.forEach((t) => setOpen(t, false));
    if (willOpen) setOpen(trigger, true);
  });

  // TODO 3 — điều hướng bằng bàn phím giữa các câu hỏi
  root.addEventListener("keydown", (e) => {
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    const currentIndex = triggers.indexOf(trigger);
    let nextIndex = null;

    switch (e.key) {
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = triggers.length - 1;
        break;
      default:
        return; // phím khác thì bỏ qua, không preventDefault
    }

    e.preventDefault(); // chặn trang cuộn theo mũi tên/Home/End
    triggers[nextIndex].focus();
  });

  // TODO 4
  triggers.forEach((t) => setOpen(t, false));
}