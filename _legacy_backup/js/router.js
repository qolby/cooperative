const routes = {
    'home': 'views/home.html',
    'about': 'views/about.html',
    'services': 'views/services.html',
    'membership': 'views/membership.html',
    'transparency': 'views/transparency.html',
    'news': 'views/news.html',
    'contact': 'views/contact.html'
};

async function loadPage(page) {
    const app = document.getElementById('app');
    const viewPath = routes[page] || routes['home'];

    try {
        const response = await fetch(viewPath);
        if (!response.ok) throw new Error(`Page ${page} not found`);
        const html = await response.text();
        app.innerHTML = html;

        // Update Active State in Navbar
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${page}`) {
                link.classList.add('active');
            }
        });

        // Re-initialize specific page scripts
        if (page === 'services') initCalculator();
        if (page === 'news') loadNews();
        if (page === 'contact') initContactForm();

        // Mobile Menu Cleanup
        document.querySelector('.mobile-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');

        // Scroll to top or element
        window.scrollTo(0, 0);

    } catch (error) {
        console.error('Router Error:', error);
        app.innerHTML = '<h2>404 - Halaman Tidak Ditemukan</h2>';
    }
}

// Router Event Listener
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || 'home';
    loadPage(hash);
});

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.slice(1) || 'home';
    loadPage(hash);
});


// --- Helper Functions for Page Logic re-initialization ---

function initCalculator() {
    // Logic from calculator.js, brought inline or re-attached here
    // We can rely on global functions if calculator.js is loaded in index.html head
    // But we need to re-attach listeners because the DOM is new.

    const calcLoanBtn = document.getElementById('calculateBtn');
    if (calcLoanBtn) calcLoanBtn.addEventListener('click', calculateLoan);

    const calcSavingsBtn = document.getElementById('calculateSavingsBtn');
    if (calcSavingsBtn) calcSavingsBtn.addEventListener('click', calculateSavings);

    const tabLoan = document.getElementById('tabLoan');
    const tabSavings = document.getElementById('tabSavings');
    const viewLoan = document.getElementById('viewLoan');
    const viewSavings = document.getElementById('viewSavings');

    if (tabLoan && tabSavings) {
        tabLoan.addEventListener('click', () => {
            tabLoan.classList.add('btn-primary');
            tabLoan.classList.remove('btn-outline-white');
            tabLoan.style.background = 'var(--primary-green)';
            tabLoan.style.color = 'white';

            tabSavings.classList.remove('btn-primary');
            tabSavings.style.background = '#eee';
            tabSavings.style.color = 'var(--text-dark)';

            viewLoan.classList.remove('hidden');
            viewSavings.classList.add('hidden');
        });

        tabSavings.addEventListener('click', () => {
            tabSavings.classList.add('btn-primary');
            tabSavings.style.background = 'var(--accent-orange)';
            tabSavings.style.color = 'white';

            tabLoan.classList.remove('btn-primary');
            tabLoan.style.background = '#eee';
            tabLoan.style.color = 'var(--text-dark)';

            viewSavings.classList.remove('hidden');
            viewLoan.classList.add('hidden');
        });
    }
}

async function loadNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    try {
        const response = await fetch('data/news.json');
        const newsData = await response.json();

        if (newsData.length === 0) {
            container.innerHTML = '<p>Belum ada berita.</p>';
            return;
        }

        container.innerHTML = newsData.map(item => `
            <article class="card news-card fade-in">
                <div class="news-img-placeholder">Foto Kegiatan</div>
                <div class="news-content">
                    <span class="date">${new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <a href="#" class="read-more">Baca Selengkapnya</a>
                </div>
            </article>
        `).join('');

    } catch (error) {
        console.error('Error loading news:', error);
        container.innerHTML = '<p>Gagal memuat berita.</p>';
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        if (!name.value.trim()) { name.parentElement.classList.add('error'); isValid = false; }
        if (!email.value.trim() || !email.value.includes('@')) { email.parentElement.classList.add('error'); isValid = false; }
        if (!subject.value.trim()) { subject.parentElement.classList.add('error'); isValid = false; }
        if (!message.value.trim()) { message.parentElement.classList.add('error'); isValid = false; }

        if (isValid) {
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'block';
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        }
    });
}
