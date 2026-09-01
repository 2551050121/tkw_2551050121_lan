// js/slider.js — Tính năng 6: slider cảm nhận, TỰ VIẾT, không thư viện.  (tiết 5)
//
// Phần tử có sẵn trong HTML:
//   khu vực : #slider-camnhan
//   dải     : [data-slider-track]   ← thứ sẽ bị dịch sang trái
//   slide   : [data-slide]          ← mỗi slide rộng đúng 100% khung nhìn
//   ô chấm  : [data-slider-dots]    ← RỖNG, chấm do JavaScript sinh ra
//   nút     : [data-slider-prev] / [data-slider-next]
//
// Ý tưởng: xếp các slide thành một dải ngang, rồi dịch cả dải bằng
//   track.style.transform = `translateX(-${index * 100}%)`
const TU_CHAY = 6000; // ms — thời gian giữa hai lần tự chuyển

export function initSlider() {
  const root = document.getElementById("slider-camnhan");
  if (!root) return;
  const track = root.querySelector("[data-slider-track]");
  const slides = [...root.querySelectorAll("[data-slide]")];
  const dotsBox = root.querySelector("[data-slider-dots]");
  const prev = root.querySelector("[data-slider-prev]");
  const next = root.querySelector("[data-slider-next]");
  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  // TODO 1 — sinh chấm chỉ dẫn bằng JavaScript, từ số slide thật
  const dots = [];
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `Xem cảm nhận ${i + 1} trên ${slides.length}`);
    dot.addEventListener("click", () => {
      go(i);
      restart();
    });
    dotsBox?.appendChild(dot);
    dots.push(dot);
  });

  function go(next_) {
    // TODO 2 — một dòng lo cả hai đầu, không dùng if
    index = (next_ + slides.length) % slides.length;

    // TODO 3 — dịch dải
    track.style.transform = `translateX(-${index * 100}%)`;

    // TODO 4 — slide không phải slide hiện tại thì không nhận được tiêu điểm
    slides.forEach((s, i) => {
      const isCurrent = i === index;
      s.toggleAttribute("inert", !isCurrent);
      s.setAttribute("aria-hidden", String(!isCurrent));
    });

    // TODO 5 — cập nhật chấm đang hiện
    dots.forEach((d, i) => d.setAttribute("aria-current", String(i === index)));
  }

  function start() {
    // TODO 6 — tôn trọng người dùng giảm chuyển động; luôn clear trước khi đặt mới
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stop();
    timer = setInterval(() => go(index + 1), TU_CHAY);
  }
  function stop() {
    clearInterval(timer);
    timer = null;
  }
  function restart() {
    stop();
    start();
  }

  // TODO 7 — nút prev/next
  prev?.addEventListener("click", () => {
    go(index - 1);
    restart();
  });
  next?.addEventListener("click", () => {
    go(index + 1);
    restart();
  });

  // TODO 8 — bàn phím khi tiêu điểm đang trong slider
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      go(index - 1);
      restart();
    } else if (e.key === "ArrowRight") {
      go(index + 1);
      restart();
    }
  });

  // TODO 9 — dừng khi người dùng đang xem, chạy lại khi rời đi
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });

  // TODO 10 — trạng thái đầu
  go(0);
  start();
}