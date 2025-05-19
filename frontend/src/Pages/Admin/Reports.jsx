import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../MainCon';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function Reports() {
    const { fetchMemberData, MemberDetails, fetchDataFromDatabase, supplement, notify } = useContext(MainContext);
    const [loading, setLoading] = useState(true);
    const [bills, setBills] = useState([]);

    // Fetch all members and bills on mount
    useEffect(() => {
        fetchMemberData();
        fetchDataFromDatabase('bills');
    }, []);

    // Update bills state when supplement changes
    useEffect(() => {
        setBills(Array.isArray(supplement) ? supplement : []);
        setLoading(false);
    }, [supplement]);

    // PDF Download Handler
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Gym Reports', 105, 15, null, null, 'center');

        // Members Table
        doc.setFontSize(14);
        doc.text('All Members', 14, 28);
        autoTable(doc, {
            startY: 32,
            head: [[
                'Name', 'Email', 'Phone', 'Age', 'Address', 'Package', 'Price', 'Join Date', 'Expiry'
            ]],
            body: (MemberDetails || []).map(m => [
                m.displayName || '',
                m.email || '',
                m.phone || '',
                m.age || '',
                m.address || '',
                m.packageName || '',
                m.packagePrice || '',
                m.packageDate || '',
                m.expiryDate || ''
            ]),
            styles: { fontSize: 9 },
            headStyles: { fillColor: [202, 255, 51], textColor: 30 },
            margin: { left: 14, right: 14 }
        });

        // Bills Table
        let billsStartY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 50;
        doc.setFontSize(14);
        doc.text('All Bills', 14, billsStartY);
        autoTable(doc, {
            startY: billsStartY + 4,
            head: [[
                'Member', 'Amount', 'Bill Date', 'Package', 'Email'
            ]],
            body: (bills || []).map(b => [
                b.displayName || b.member || '',
                b.billAmount || b.packagePrice || '',
                b.billDate || b.date || '',
                b.packageName || '',
                b.email || ''
            ]),
            styles: { fontSize: 9 },
            headStyles: { fillColor: [202, 255, 51], textColor: 30 },
            margin: { left: 14, right: 14 }
        });

        doc.save('Gym_Report.pdf');
        notify && notify('PDF Downloaded!', 'success');
    };

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-8">Reports</h2>
            <div className="flex justify-end mb-6">
                <button
                    onClick={handleDownloadPDF}
                    className="bg-[#CAFF33] text-gray-900 px-6 py-2 rounded font-bold hover:bg-[#b6e62e] transition"
                >
                    Download PDF
                </button>
            </div>
            {loading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#CAFF33] border-solid"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Members Table */}
                    <div className="bg-gray-800 rounded-lg shadow-lg p-4 overflow-x-auto">
                        <h3 className="text-xl font-semibold text-[#CAFF33] mb-4">All Members</h3>
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 text-left text-gray-300">Name</th>
                                    <th className="px-2 py-2 text-left text-gray-300">Email</th>
                                    <th className="px-2 py-2 text-left text-gray-300">Phone</th>
                                    <th className="px-2 py-2 text-left text-gray-300">Package</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(MemberDetails || []).map((m, idx) => (
                                    <tr key={idx} className="border-b border-gray-700">
                                        <td className="px-2 py-2 text-white">{m.displayName || ''}</td>
                                        <td className="px-2 py-2 text-gray-300">{m.email || ''}</td>
                                        <td className="px-2 py-2 text-gray-300">{m.phone || ''}</td>
                                        <td className="px-2 py-2 text-gray-300">{m.packageName || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Bills Table */}
                    <div className="bg-gray-800 rounded-lg shadow-lg p-4 overflow-x-auto">
                        <h3 className="text-xl font-semibold text-[#CAFF33] mb-4">All Bills</h3>
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 text-left text-gray-300">Member</th>
                                    <th className="px-2 py-2 text-left text-gray-300">Amount</th>
                                    <th className="px-2 py-2 text-left text-gray-300">Bill Date</th>
                                    <th className="px-2 py-2 text-left text-gray-300">Package</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(bills || []).map((b, idx) => (
                                    <tr key={idx} className="border-b border-gray-700">
                                        <td className="px-2 py-2 text-white">{b.displayName || b.member || ''}</td>
                                        <td className="px-2 py-2 text-[#CAFF33] font-bold">₹{b.billAmount || b.packagePrice || ''}</td>
                                        <td className="px-2 py-2 text-gray-300">{b.billDate || b.date || ''}</td>
                                        <td className="px-2 py-2 text-gray-300">{b.packageName || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reports;