/* ============================================================
   NORTHZERO NAV ENGINE v2.3 | 2026
   Targets: #hamburger-menu / #nav-links-container / .active
   v2.3: Reliable cross-browser mobile dropdown + active page highlight
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks  = document.getElementById('nav-links-container');

    // ── 1. Automatic Active Link Highlighting ────────────────
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks    = document.querySelectorAll('.nav-links a');

    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
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

    // ── 5. Mobile Dropdown Toggle ───────────────────────────
    document.querySelectorAll('.dropbtn').forEach(btn => {
        btn.setAttribute('aria-haspopup', 'true');
        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', function (e) {
            if (!isMobile()) return;
            e.preventDefault();
            e.stopPropagation();

            const dropdown = btn.nextElementSibling;
            if (!dropdown) return;

            const isOpen = dropdown.classList.contains('open');
            closeAllDropdowns();

            if (!isOpen) {
                dropdown.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ── 6. Keyboard Escape Key ───────────────────────────────
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeMenu();
            hamburger.focus();
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
