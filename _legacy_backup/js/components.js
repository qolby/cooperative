async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Could not load ${file}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;

        // If loading header, re-initialize hamburger menu and active state
        if (id === 'header-placeholder') {
            initMobileMenu();
            setActiveLink();
        }
    } catch (error) {
        console.error("Error loading component:", error);
    }
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active'); // Add active class for X animation if CSS supports it
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

function setActiveLink() {
    const currentPage = document.body.getAttribute('data-page');
    if (!currentPage) return;

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        } else {
            // Check for dropdown parents if needed, though simple check is fine for now
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');
});
