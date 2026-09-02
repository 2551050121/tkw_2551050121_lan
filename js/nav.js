// js/nav.js — menu mobile, navbar phản ứng khi cuộn, nút "lên đầu trang"

// Nhiệm vụ 1: Nút lên đầu trang
export function initToTop(){
    const btn=document.getElementById("to-top");
    if(!btn) return;

    const SHOW_AFTER=400;

    const toggleVisibility = () => {
        const show=window.scrollY > SHOW_AFTER;
        btn.classList.toggle("hidden", !show);
        btn.classList.toggle("flex", show);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, {passive: true});

    btn.addEventListener("click", () => {
        const reduceMotion= window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({top: 0,behavior: reduceMotion ? "auto" : "smooth"});

    });
}

// Nhiệm vụ 2: Menu mobile
export function initNav() {
    const toggle = document.querySelector("[aria-controls='mobile-menu']");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    const header = toggle.closest("header");

    const setOpen = (open) => {
        menu.classList.toggle("hidden", !open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu điều hướng");
        document.body.classList.toggle("overflow-hidden", open);
    };

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        setOpen(!isOpen);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            setOpen(false);
            toggle.focus();
        }
    });

    document.addEventListener("click", (e) => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        if (isOpen && header && !header.contains(e.target)) {
            setOpen(false);
        }
    });

    const mq = window.matchMedia("(min-width: 1024px)");
    mq.addEventListener("change", (e) => {
        if (e.matches) setOpen(false);
    });
}

// Nhiệm vụ 2: Navbar đổi trạng thái khi cuộn
export function initHeaderOnScroll() {
    const header = document.querySelector("header");
    const sentinel = document.getElementById("nav-sentinel");
    if (!header || !sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
        const scrolled = !entry.isIntersecting;
        header.classList.toggle("shadow-sm", scrolled);
        header.classList.toggle("is-scrolled", scrolled);
    });

    observer.observe(sentinel);
}