/* ============================================================
   NORTHZERO NAV ENGINE v2.3 | 2026
   Targets: #hamburger-menu / #nav-links-container / .active
   v2.3: Reliable cross-browser mobile dropdown fix
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks  = document.getElementById('nav-links-container');

    if (!hamburger || !navLinks) return;

    // ── Helpers ──────────────────────────────────────────────

    function isMobile() {
        // Check by screen width rather than computed style —
        // more reliable across all mobile browsers including iOS Safari
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

    // ── Hamburger ────────────────────────────────────────────
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        // Close dropdowns when menu itself closes
        if (!isOpen) closeAllDropdowns();
    });

    // ── Nav link clicks (non-dropdown) ───────────────────────
    navLinks.querySelectorAll('a:not(.dropbtn)').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ── Dropdown toggle ──────────────────────────────────────
    document.querySelectorAll('.dropbtn').forEach(btn => {
        btn.setAttribute('aria-haspopup', 'true');
        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', function (e) {
            // On desktop let the link navigate normally
            if (!isMobile()) return;

            e.preventDefault();
            e.stopPropagation();

            const dropdown = btn.nextElementSibling;
            if (!dropdown) return;

            const isOpen = dropdown.classList.contains('open');

            // Close any other open dropdown first
            closeAllDropdowns();

            // Toggle this one
            if (!isOpen) {
                dropdown.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ── Escape key ───────────────────────────────────────────
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeMenu();
            hamburger.focus();
        }
    });

    // ── Outside click/tap to close ───────────────────────────
    // Use both click and touchstart for maximum browser compatibility.
    // touchstart fires before click and is more reliable on iOS Safari.
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

document.addEventListener('DOMContentLoaded', () => {
    // Get the current page filename from the URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Select all menu links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Compare href attribute with current pathname
        if (link.getAttribute('href') === currentPath) {
            link.style.color = 'var(--nz-gold)';
            link.style.fontWeight = '700';
        }
    });
});
