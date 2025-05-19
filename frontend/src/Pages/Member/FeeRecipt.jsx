import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../MainCon';
import jsPDF from 'jspdf';

function FeeRecipt() {
    const { user, userUID } = useContext(MainContext);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch bills for the logged-in member
    useEffect(() => {
        const fetchBills = async () => {
            try {
                const res = await fetch(`https://gym-managment-d7337-default-rtdb.firebaseio.com/bills.json`);
                const data = await res.json();
                // Filter bills for the logged-in user (by UID or displayName)
                const filtered = Object.entries(data || {})
                    .map(([id, bill]) => ({ id, ...bill }))
                    .filter(bill =>
                        (bill.id === userUID) ||
                        (user && bill.displayName && bill.displayName === user.displayName)
                    );
                setBills(filtered);
            } catch (err) {
                setBills([]);
            }
            setLoading(false);
        };
        fetchBills();
    }, [user, userUID]);

    // Download receipt as PDF
    const handleDownload = (bill) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Fee Receipt', 105, 20, null, null, 'center');
        doc.setFontSize(12);
        doc.text(`Name: ${bill.displayName || ''}`, 20, 40);
        doc.text(`Email: ${bill.email || ''}`, 20, 50);
        doc.text(`Phone: ${bill.phone || ''}`, 20, 60);
        doc.text(`Address: ${bill.address || ''}`, 20, 70);
        doc.text(`Package: ${bill.packageName || ''}`, 20, 80);
        doc.text(`Package Price: ₹${bill.billAmount || bill.packagePrice || ''}`, 20, 90);
        doc.text(`Join Date: ${bill.packageDate || ''}`, 20, 100);
        doc.text(`Expiry Date: ${bill.expiryDate || ''}`, 20, 110);
        doc.text(`Diet Plan: ${bill.dietPlan || ''}`, 20, 120);
        doc.text(`Status: ${bill.isActive ? 'Active' : 'Inactive'}`, 20, 130);
        doc.text(`Bill Date: ${bill.billDate || ''}`, 20, 140);
        doc.text('Thank you for your payment!', 20, 160);
        doc.save(`FeeReceipt_${bill.displayName || 'member'}.pdf`);
    };

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-8">Your Fee Receipts</h2>
            {loading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#CAFF33] border-solid"></div>
                </div>
            ) : bills.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No receipts found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Package</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Bill Date</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => (
                                <tr key={bill.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                    <td className="px-4 py-3 text-white">{bill.displayName || ''}</td>
                                    <td className="px-4 py-3 text-gray-300">{bill.packageName || ''}</td>
                                    <td className="px-4 py-3 text-[#CAFF33] font-bold">₹{bill.billAmount || bill.packagePrice || ''}</td>
                                    <td className="px-4 py-3 text-gray-300">{bill.billDate || ''}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => handleDownload(bill)}
                                            className="bg-[#CAFF33] text-gray-900 px-4 py-2 rounded font-bold hover:bg-[#b6e62e] transition"
                                        >
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default FeeRecipt;