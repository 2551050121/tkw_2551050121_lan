// js/nav.js — menu mobile, navbar phản ứng khi cuộn, nút "lên đầu trang"

// Nhiệm vụ 1: Nút lên đầu trang
export function initToTop(){
    const btn=document.getElementById("to-top");
    if(!btn) return;

    const SHOW_AFTER=400;

    const toggleVisibility=()=>{
        const show=window.scrollY > SHOW_AFTER;
        btn.classList.toggle("hidden", !show);
        btn.classList.toggle("flex", show);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, {passive: true});

    btn.addEventListener("click", ()=>{
        const reduceMotion= window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({top: 0,behavior: reduceMotion ? "auto" : "smooth"});
        
    });
}