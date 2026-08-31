// js/main.js — điểm khởi động duy nhất cho cả 3 trang
// Mỗi hàm init tự kiểm tra phần tử mình phụ trách có tồn tại không,
// nên một file main.js này dùng chung được cho index / pricing / contact.

import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initTheme } from "./theme.js";
import { initFaq } from "./faq.js";
import { initPricing } from "./pricing.js";
import { initSlider } from "./slider.js";
import { initReveal } from "./reveal.js";

initNav();
initHeaderOnScroll();
initToTop();
initTheme();
initFaq();
initPricing();
initSlider();
initReveal();
