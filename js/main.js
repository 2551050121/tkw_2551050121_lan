// js/main.js — điểm khởi động duy nhất cho cả 3 trang
// Mỗi hàm init tự kiểm tra phần tử mình phụ trách có tồn tại không,
// nên một file main.js này dùng chung được cho index / pricing / contact.

import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initFaq } from "./faq.js";
import { initTheme } from "./theme.js";

// TODO tiết 3: import initTheme từ theme.js
// TODO tiết 4: import initPricing từ pricing.js, initReveal từ reveal.js
// TODO tiết 5: import initSlider từ slider.js

initNav();
initHeaderOnScroll();
initToTop();
initFaq();
initTheme();