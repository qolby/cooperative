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
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-slate-200">
            {/* Tabs */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setActiveTab('loan')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-colors ${activeTab === 'loan'
                            ? 'bg-[#2ecc71] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}>
                    Pinjaman
                </button>
                <button
                    onClick={() => setActiveTab('savings')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-colors ${activeTab === 'savings'
                            ? 'bg-[#f39c12] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}>
                    Simpanan
                </button>
            </div>

            {/* Loan View */}
            {activeTab === 'loan' && (
                <div className="fade-in">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Simulasi Pinjaman</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jumlah Pinjaman (Rp)</label>
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            placeholder="Contoh: 10000000"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#2ecc71] focus:outline-none transition-colors"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jangka Waktu (Bulan)</label>
                        <select
                            value={loanDuration}
                            onChange={(e) => setLoanDuration(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#2ecc71] focus:outline-none transition-colors bg-white">
                            <option value="6">6 Bulan</option>
                            <option value="12">12 Bulan</option>
                            <option value="24">24 Bulan</option>
                            <option value="36">36 Bulan</option>
                        </select>
                    </div>
                    <button
                        onClick={calculateLoan}
                        className="w-full py-3.5 rounded-lg bg-[#2ecc71] text-white font-semibold hover:bg-[#27ae60] transition-colors duration-200">
                        Hitung Angsuran
                    </button>

                    {loanResult && (
                        <div className="fade-in mt-6 pt-4 border-t border-dashed border-slate-200">
                            <div className="flex justify-between mb-2 text-slate-600">
                                <span>Pokok:</span>
                                <strong className="text-slate-800">{loanResult.principal}</strong>
                            </div>
                            <div className="flex justify-between mb-2 text-slate-600">
                                <span>Bunga (1%):</span>
                                <strong className="text-slate-800">{loanResult.interest}</strong>
                            </div>
                            <div className="flex justify-between mt-4 text-lg text-[#2ecc71]">
                                <strong>Total / Bulan:</strong>
                                <strong>{loanResult.total}</strong>
                            </div>
                            <p className="text-xs text-slate-400 text-center mt-4">*Simulasi estimasi, bunga flat 12% p.a.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Savings View */}
            {activeTab === 'savings' && (
                <div className="fade-in">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Simulasi Simpanan</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jumlah Simpanan (Rp)</label>
                        <input
                            type="number"
                            value={savingsAmount}
                            onChange={(e) => setSavingsAmount(e.target.value)}
                            placeholder="Contoh: 5000000"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#f39c12] focus:outline-none transition-colors"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Lama Simpan (Bulan)</label>
                        <select
                            value={savingsDuration}
                            onChange={(e) => setSavingsDuration(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#f39c12] focus:outline-none transition-colors bg-white">
                            <option value="6">6 Bulan</option>
                            <option value="12">12 Bulan</option>
                            <option value="24">24 Bulan</option>
                        </select>
                    </div>
                    <button
                        onClick={calculateSavings}
                        className="w-full py-3.5 rounded-lg bg-[#f39c12] text-white font-semibold hover:bg-[#e67e22] transition-colors duration-200">
                        Hitung Keuntungan
                    </button>

                    {savingsResult && (
                        <div className="fade-in mt-6 pt-4 border-t border-dashed border-slate-200">
                            <div className="flex justify-between mb-2 text-slate-600">
                                <span>Bunga (4% p.a):</span>
                                <strong className="text-slate-800">{savingsResult.interest}</strong>
                            </div>
                            <div className="flex justify-between mt-4 text-lg text-[#f39c12]">
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
