// js/reveal.js — Tính năng 7: hiệu ứng lộ dần khi cuộn tới.   (tiết 4)
//
// Phần tử có sẵn: các khối mang thuộc tính [data-reveal].
// CSS có sẵn trong src/input.css:
//   .js [data-reveal]              → mờ và đẩy xuống 16px
//   .js [data-reveal].is-visible   → hiện lên đúng chỗ
// Việc của file này chỉ là gắn class "is-visible" đúng lúc.
export function initReveal() {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (items.length === 0) return;

  // TODO 1 — TÔN TRỌNG NGƯỜI DÙNG TRƯỚC, làm hiệu ứng sau.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return; // hiện luôn, không quan sát, không animate
  }

  // TODO 2 — IntersectionObserver với { threshold: 0.15 }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // hiện rồi thì thôi, đừng theo dõi nữa
      });
    },
    { threshold: 0.15 }
  );

  // TODO 3 — cho observer quan sát từng phần tử trong `items`
  items.forEach((el) => observer.observe(el));
}