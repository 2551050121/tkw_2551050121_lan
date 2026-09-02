// js/pricing.js — Tính năng 5: công tắc giá Tháng / Năm.   (tiết 4)
//
// Phần tử có sẵn trong HTML:
//   công tắc   : #cong-tac-gia  — <button role="switch" aria-checked="false">
//   số tiền    : <span data-price data-monthly="390000" data-yearly="3744000">
//   nhãn kỳ hạn: <span data-price-unit>/tháng</span>
//
// Số tiền nằm trong HTML, KHÔNG nằm trong JavaScript. Người sửa giá là người
// làm nội dung, không phải lập trình viên: sửa giá không được đụng tới file này.
// Cho sẵn — đây là cú pháp tra tài liệu chứ không phải bài học của buổi.
// Đừng tự viết hàm chèn dấu chấm: hàm tự viết luôn sai ở số âm và số lẻ.
const dong = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function initPricing() {
  const sw = document.getElementById("cong-tac-gia");
  if (!sw) return;
  const prices = [...document.querySelectorAll("[data-price]")];
  const units = [...document.querySelectorAll("[data-price-unit]")];
  if (prices.length === 0) return;

  function render(yearly) {
    // a. trạng thái nằm ở ARIA — CSS tự đọc qua .cong-tac[aria-checked="true"]
    sw.setAttribute("aria-checked", String(yearly));

    // b. đổi số tiền theo kỳ hạn
    prices.forEach((el) => {
      const amount = Number(yearly ? el.dataset.yearly : el.dataset.monthly);
      el.textContent = dong.format(amount);
    });

    // c. đổi nhãn kỳ hạn
    units.forEach((el) => {
      el.textContent = yearly ? "/năm" : "/tháng";
    });
  }

  // TODO 1 — vẽ lần đầu theo trạng thái đang có trong HTML
  render(sw.getAttribute("aria-checked") === "true");

  // TODO 2 — bấm công tắc thì đảo trạng thái rồi gọi render()
  sw.addEventListener("click", () => {
    const yearly = sw.getAttribute("aria-checked") !== "true";
    render(yearly);
  });

  // TODO 3 — bàn phím: Space và Enter đều phải bật/tắt được.
  // <button> đã tự lo Enter, viết rõ Space ra để người đọc thấy đã cân nhắc.
  sw.addEventListener("keydown", (e) => {
    if (e.key !== " ") return;
    e.preventDefault(); // chặn trang cuộn xuống khi nhấn Space
    sw.click();
  });
}