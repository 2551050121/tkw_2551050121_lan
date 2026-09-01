// js/main.js — điểm khởi động duy nhất cho cả 3 trang
// Mỗi hàm init tự kiểm tra phần tử mình phụ trách có tồn tại không,
// nên một file main.js này dùng chung được cho index / pricing / contact.

import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initFaq } from "./faq.js";
import { initTheme } from "./theme.js";
import { initPricing } from "./pricing.js";
import { initReveal } from "./reveal.js";
import { initSlider } from "./slider.js";



initNav();
initHeaderOnScroll();
initToTop();
initFaq();
initTheme();
initPricing();
initReveal();
initSlider();