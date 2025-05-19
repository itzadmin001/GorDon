import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../MainCon';
import { FaFilePdf, FaFileCsv, FaSearch } from 'react-icons/fa';
import { db } from '../../Firebase';
import { push, ref as dbRef, set } from 'firebase/database';

function Billing() {
    const { fetchMemberData, MemberDetails, notify } = useContext(MainContext);
    const [bills, setBills] = useState([]);
    const [filterMember, setFilterMember] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMemberData();
    }, []);

    useEffect(() => {
        if (Array.isArray(MemberDetails)) {
            setBills(MemberDetails.map((m, i) => ({
                id: m.id || i + 1,
                date: m.packageDate || '',
                member: m.displayName || '',
                amount: m.packagePrice ? String(m.packagePrice).replace(/[^0-9.]/g, '') : '',
            })));
            setLoading(false);
        }
    }, [MemberDetails]);

    const filteredBills = bills.filter(bill => {
        const matchMember = filterMember ? bill.member.toLowerCase().includes(filterMember.toLowerCase()) : true;
        const matchMonth = filterMonth ? (bill.date && bill.date.slice(0, 7) === filterMonth) : true;
        return matchMember && matchMonth;
    });

    const exportCSV = () => {
        let csv = "Date,Member,Amount\n";
        filteredBills.forEach(bill => {
            csv += `${bill.date},${bill.member},${bill.amount}\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bills.csv';
        a.click();
    };

    const exportPDF = () => {
        alert("PDF Export functionality can be implemented using jsPDF or similar libraries.");
    };

    // Add new bill and store all member fields in /bills
    const handleAddBill = async (e) => {
        e.preventDefault();
        const form = e.target;
        const memberName = form.member.value;
        const memberObj = MemberDetails.find(m => m.displayName === memberName);

        if (!memberObj) {
            notify("Member not found!", 2);
            return;
        }

        // Store all member fields + bill date + bill amount
        const newBill = {
            ...memberObj,
            billDate: form.date.value,
            billAmount: Number(form.amount.value)
        };

        try {
            const newBillRef = push(dbRef(db, 'bills'));
            await set(newBillRef, newBill);
            notify("Bill created and saved to database!✅");
            setBills([{ id: newBillRef.key, ...newBill }, ...bills]);
            form.reset();
        } catch (err) {
            notify("Error saving bill!", 2);
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Billing Management</h2>

            {/* Add New Bill */}
            <form onSubmit={handleAddBill} className="bg-gray-800 rounded-lg p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow">
                <input type="date" name="date" required className="p-2 rounded bg-gray-700 border border-gray-600" />
                <select name="member" required className="p-2 rounded bg-gray-700 border border-gray-600">
                    <option value="">Select Member</option>
                    {Array.isArray(MemberDetails) && MemberDetails.map((m) => (
                        <option key={m.id} value={m.displayName}>{m.displayName}</option>
                    ))}
                </select>
                <input type="number" name="amount" placeholder="Amount" required className="p-2 rounded bg-gray-700 border border-gray-600" />
                <button type="submit" className="bg-[#CAFF33] text-gray-900 px-4 py-2 rounded font-bold hover:bg-[#b6e62e] transition">Create Bill</button>
            </form>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                <div className="flex items-center gap-2">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Filter by member"
                        value={filterMember}
                        onChange={e => setFilterMember(e.target.value)}
                        className="p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FaSearch />
                    <input
                        type="month"
                        value={filterMonth}
                        onChange={e => setFilterMonth(e.target.value)}
                        className="p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>

            </div>

            {/* Bills Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Member</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBills.length > 0 ? (
                            filteredBills.map(bill => (
                                <tr key={bill.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                    <td className="px-4 py-3">{bill.billDate || bill.date}</td>
                                    <td className="px-4 py-3">{bill.displayName || bill.member}</td>
                                    <td className="px-4 py-3 text-[#CAFF33] font-bold">₹{bill.billAmount || bill.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center text-gray-400 py-8">
                                    No bills found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Billing;