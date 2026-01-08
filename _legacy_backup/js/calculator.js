function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

function calculateLoan() {
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const months = parseInt(document.getElementById('loanDuration').value);
    const ratePerYear = 12; // Flat 12% per year for example
    const ratePerMonth = ratePerYear / 12 / 100;

    if (isNaN(amount) || isNaN(months) || amount <= 0 || months <= 0) {
        alert("Mohon masukkan jumlah dan durasi yang valid.");
        return;
    }

    // Flat Interest Calculation (Bunga Tetap)
    const principalPerMonth = amount / months;
    const interestPerMonth = amount * ratePerMonth;
    const totalInstallment = principalPerMonth + interestPerMonth;

    document.getElementById('resultPrincipal').innerText = formatRupiah(principalPerMonth);
    document.getElementById('resultInterest').innerText = formatRupiah(interestPerMonth);
    document.getElementById('resultTotal').innerText = formatRupiah(totalInstallment);

    document.getElementById('resultSection').classList.remove('hidden');
    document.getElementById('resultSection').classList.add('fade-in');
}

function calculateSavings() {
    const amount = parseFloat(document.getElementById('savingsAmount').value);
    const months = parseInt(document.getElementById('savingsDuration').value);
    const ratePerYear = 4; // Example 4% per year for savings

    if (isNaN(amount) || isNaN(months) || amount <= 0 || months <= 0) {
        alert("Mohon masukkan jumlah dan durasi yang valid.");
        return;
    }

    // Simple Interest for Savings
    const interestTotal = amount * (ratePerYear / 100) * (months / 12);
    const totalSavings = amount + interestTotal;

    document.getElementById('resultSavingsInterest').innerText = formatRupiah(interestTotal);
    document.getElementById('resultSavingsTotal').innerText = formatRupiah(totalSavings);

    document.getElementById('resultSavingsSection').classList.remove('hidden');
    document.getElementById('resultSavingsSection').classList.add('fade-in');
}

document.addEventListener('DOMContentLoaded', () => {
    // Calculator Buttons
    const calcLoanBtn = document.getElementById('calculateBtn');
    if (calcLoanBtn) {
        calcLoanBtn.addEventListener('click', calculateLoan);
    }

    const calcSavingsBtn = document.getElementById('calculateSavingsBtn');
    if (calcSavingsBtn) {
        calcSavingsBtn.addEventListener('click', calculateSavings);
    }

    // Tab Logic
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
});
