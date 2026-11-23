/* ============================================================
   NORTHZERO NAV ENGINE v2.4 | 2026
   Targets: #hamburger-menu / #nav-links-container / .active
   v2.4: Defensive DOM checks, keyboard dropdown sync & Escape
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks  = document.getElementById('nav-links-container');

    // ── 1. Automatic Active Link Highlighting ────────────────
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks    = document.querySelectorAll('.nav-links a');

    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const cleanHref = href.split('#')[0];
        if (cleanHref === currentPath || (currentPath === '' && cleanHref === 'index.html')) {
            link.style.color = 'var(--nz-gold)';
            link.style.fontWeight = '700';
        }
    });

    if (!hamburger || !navLinks) return;

    // ── 2. Helpers ───────────────────────────────────────────
    function isMobile() {
        return window.innerWidth <= 900;
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-content.open').forEach(d => {
            d.classList.remove('open');
            const btn = d.previousElementSibling;
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        closeAllDropdowns();
    }

    // ── 3. Hamburger Toggle ──────────────────────────────────
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        if (!isOpen) closeAllDropdowns();
    });

    // ── 4. Nav Link Clicks (non-dropdown) ────────────────────
    navLinks.querySelectorAll('a:not(.dropbtn)').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ── 5. Mobile & Keyboard Dropdown Toggle ─────────────────
    document.querySelectorAll('.dropbtn').forEach(btn => {
        const dropdown = btn.nextElementSibling;
        if (!dropdown) return;

        btn.setAttribute('aria-haspopup', 'true');
        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', function (e) {
            if (!isMobile()) return;
            e.preventDefault();
            e.stopPropagation();

            const isOpen = dropdown.classList.contains('open');
            closeAllDropdowns();

            if (!isOpen) {
                dropdown.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });

        btn.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                dropdown.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                const firstLink = dropdown.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });

        const parentDropdown = btn.closest('.dropdown');
        if (parentDropdown) {
            parentDropdown.addEventListener('focusout', function (e) {
                if (!parentDropdown.contains(e.relatedTarget)) {
                    dropdown.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // ── 6. Keyboard Escape Key ───────────────────────────────
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const wasMobileOpen = navLinks.classList.contains('active');
            const openDropBtn = document.querySelector('.dropbtn[aria-expanded="true"]');
            closeMenu();
            if (wasMobileOpen) {
                hamburger.focus();
            } else if (openDropBtn) {
                openDropBtn.focus();
            }
        }
    });

    // ── 7. Outside Click/Tap to Close ────────────────────────
    ['click', 'touchstart'].forEach(evtType => {
        document.addEventListener(evtType, function (e) {
            if (
                navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                closeMenu();
            }
        }, { passive: true });
    });
});
