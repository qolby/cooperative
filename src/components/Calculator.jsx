import React, { useState } from 'react';

export default function Calculator() {
    const [activeTab, setActiveTab] = useState('loan');

    // Loan State
    const [loanAmount, setLoanAmount] = useState('');
    const [loanDuration, setLoanDuration] = useState('6');
    const [loanResult, setLoanResult] = useState(null);

    // Savings State
    const [savingsAmount, setSavingsAmount] = useState('');
    const [savingsDuration, setSavingsDuration] = useState('6');
    const [savingsResult, setSavingsResult] = useState(null);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const calculateLoan = () => {
        const amount = parseFloat(loanAmount);
        const months = parseInt(loanDuration);
        const ratePerYear = 12; // 12% p.a.

        if (!amount || !months || amount <= 0) {
            alert("Mohon masukkan jumlah yang valid.");
            return;
        }

        const ratePerMonth = ratePerYear / 12 / 100;
        const principalPerMonth = amount / months;
        const interestPerMonth = amount * ratePerMonth;
        const totalInstallment = principalPerMonth + interestPerMonth;

        setLoanResult({
            principal: formatRupiah(principalPerMonth),
            interest: formatRupiah(interestPerMonth),
            total: formatRupiah(totalInstallment)
        });
    };

    const calculateSavings = () => {
        const amount = parseFloat(savingsAmount);
        const months = parseInt(savingsDuration);
        const ratePerYear = 4; // 4% p.a.

        if (!amount || !months || amount <= 0) {
            alert("Mohon masukkan jumlah yang valid.");
            return;
        }

        const interestTotal = amount * (ratePerYear / 100) * (months / 12);
        const totalSavings = amount + interestTotal;

        setSavingsResult({
            interest: formatRupiah(interestTotal),
            total: formatRupiah(totalSavings)
        });
    };

    return (
        <div className="card calculator-card">
            <div className="calc-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setActiveTab('loan')}
                    className={`btn ${activeTab === 'loan' ? 'btn-primary' : ''}`}
                    style={{ flex: 1, padding: '10px', background: activeTab === 'loan' ? 'var(--primary-green)' : '#eee', color: activeTab === 'loan' ? 'white' : 'var(--text-dark)' }}>
                    Pinjaman
                </button>
                <button
                    onClick={() => setActiveTab('savings')}
                    className={`btn ${activeTab === 'savings' ? 'btn-primary' : ''}`}
                    style={{ flex: 1, padding: '10px', background: activeTab === 'savings' ? 'var(--accent-orange)' : '#eee', color: activeTab === 'savings' ? 'white' : 'var(--text-dark)' }}>
                    Simpanan
                </button>
            </div>

            {/* Loan View */}
            {activeTab === 'loan' && (
                <div className="fade-in">
                    <h3>🔢 Simulasi Pinjaman</h3>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Jumlah Pinjaman (Rp)</label>
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            placeholder="Contoh: 10000000"
                            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Jangka Waktu (Bulan)</label>
                        <select
                            value={loanDuration}
                            onChange={(e) => setLoanDuration(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}>
                            <option value="6">6 Bulan</option>
                            <option value="12">12 Bulan</option>
                            <option value="24">24 Bulan</option>
                            <option value="36">36 Bulan</option>
                        </select>
                    </div>
                    <button onClick={calculateLoan} className="btn btn-primary" style={{ width: '100%' }}>Hitung Angsuran</button>

                    {loanResult && (
                        <div className="fade-in" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #ddd' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span>Pokok:</span>
                                <strong>{loanResult.principal}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span>Bunga (1%):</span>
                                <strong>{loanResult.interest}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '1.1rem', color: 'var(--primary-green)' }}>
                                <strong>Total / Bulan:</strong>
                                <strong>{loanResult.total}</strong>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '10px', textAlign: 'center' }}>*Simulasi estimasi, bunga flat 12% p.a.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Savings View */}
            {activeTab === 'savings' && (
                <div className="fade-in">
                    <h3>💰 Simulasi Simpanan</h3>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Jumlah Simpanan (Rp)</label>
                        <input
                            type="number"
                            value={savingsAmount}
                            onChange={(e) => setSavingsAmount(e.target.value)}
                            placeholder="Contoh: 5000000"
                            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Lama Simpan (Bulan)</label>
                        <select
                            value={savingsDuration}
                            onChange={(e) => setSavingsDuration(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}>
                            <option value="6">6 Bulan</option>
                            <option value="12">12 Bulan</option>
                            <option value="24">24 Bulan</option>
                        </select>
                    </div>
                    <button onClick={calculateSavings} className="btn btn-yellow" style={{ width: '100%' }}>Hitung Keuntungan</button>

                    {savingsResult && (
                        <div className="fade-in" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #ddd' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span>Bunga (4% p.a):</span>
                                <strong>{savingsResult.interest}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '1.1rem', color: 'var(--accent-orange)' }}>
                                <strong>Total Saldo Akhir:</strong>
                                <strong>{savingsResult.total}</strong>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
