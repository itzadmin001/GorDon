import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../MainCon';
import { FaUserFriends, FaMoneyBillWave, FaBell, FaUserPlus } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Dashboard() {
    const {
        fetchMemberData,
        MemberDetails,
        fetchDataFromDatabase,
        supplement,
        notifications,
        fetchNotifications,
        userUID,
    } = useContext(MainContext);

    const [recentMembers, setRecentMembers] = useState([]);
    const [recentBills, setRecentBills] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [packageCounts, setPackageCounts] = useState({});
    const [monthlyRevenue, setMonthlyRevenue] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch all data on mount
    useEffect(() => {
        fetchMemberData();
        fetchDataFromDatabase('bills');
        if (userUID) fetchNotifications(userUID);
    }, [userUID]);

    // Process Members and Bills
    useEffect(() => {
        if (Array.isArray(MemberDetails)) {
            // Recent Members (last 3)
            const sortedMembers = [...MemberDetails].sort((a, b) => {
                const dateA = new Date(a.packageDate || 0);
                const dateB = new Date(b.packageDate || 0);
                return dateB - dateA;
            });
            setRecentMembers(sortedMembers.slice(0, 3));

            // Package-wise count
            const pkgCount = {};
            MemberDetails.forEach(m => {
                if (m.packageName) {
                    pkgCount[m.packageName] = (pkgCount[m.packageName] || 0) + 1;
                }
            });
            setPackageCounts(pkgCount);
        }
    }, [MemberDetails]);

    useEffect(() => {
        if (Array.isArray(supplement)) {
            // Recent Bills (last 2)
            const sortedBills = [...supplement].sort((a, b) => {
                const dateA = new Date(a.billDate || a.date || 0);
                const dateB = new Date(b.billDate || b.date || 0);
                return dateB - dateA;
            });
            setRecentBills(sortedBills.slice(0, 2));

            // Total Revenue
            const revenue = supplement.reduce((sum, b) => {
                let amt = Number(
                    (b.billAmount || b.packagePrice || '0').toString().replace(/[^0-9.]/g, '')
                );
                return sum + (isNaN(amt) ? 0 : amt);
            }, 0);
            setTotalRevenue(revenue);

            // Monthly Revenue
            const monthly = {};
            supplement.forEach(b => {
                const date = new Date(b.billDate || b.date);
                if (!isNaN(date)) {
                    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                    let amt = Number(
                        (b.billAmount || b.packagePrice || '0').toString().replace(/[^0-9.]/g, '')
                    );
                    monthly[key] = (monthly[key] || 0) + (isNaN(amt) ? 0 : amt);
                }
            });
            setMonthlyRevenue(monthly);
        }
        setLoading(false);
    }, [supplement]);

    // Chart Data
    const barData = {
        labels: Object.keys(monthlyRevenue),
        datasets: [
            {
                label: 'Monthly Revenue',
                data: Object.values(monthlyRevenue),
                backgroundColor: '#CAFF33',
            },
        ],
    };

    const pieData = {
        labels: Object.keys(packageCounts),
        datasets: [
            {
                label: 'Members',
                data: Object.values(packageCounts),
                backgroundColor: [
                    '#CAFF33', '#FF6B6B', '#36A2EB', '#FFCE56', '#A259FF', '#43E97B'
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-8">Admin Dashboard</h2>
            {loading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#CAFF33] border-solid"></div>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6 flex items-center gap-4 shadow">
                            <FaUserFriends className="text-3xl text-[#CAFF33]" />
                            <div>
                                <div className="text-lg font-bold text-white">Total Members</div>
                                <div className="text-2xl font-extrabold text-[#CAFF33]">{MemberDetails?.length || 0}</div>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 flex items-center gap-4 shadow">
                            <FaMoneyBillWave className="text-3xl text-[#CAFF33]" />
                            <div>
                                <div className="text-lg font-bold text-white">Total Revenue</div>
                                <div className="text-2xl font-extrabold text-[#CAFF33]">₹{totalRevenue}</div>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 flex items-center gap-4 shadow">
                            <FaUserPlus className="text-3xl text-[#CAFF33]" />
                            <div>
                                <div className="text-lg font-bold text-white">Recent Members</div>
                                <div className="text-2xl font-extrabold text-[#CAFF33]">{recentMembers.length}</div>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 flex items-center gap-4 shadow">
                            <FaBell className="text-3xl text-[#CAFF33]" />
                            <div>
                                <div className="text-lg font-bold text-white">Notifications</div>
                                <div className="text-2xl font-extrabold text-[#CAFF33]">{notifications?.length || 0}</div>
                            </div>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6 shadow">
                            <h3 className="text-lg font-bold text-[#CAFF33] mb-4">Monthly Revenue</h3>
                            <Bar data={barData} />
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 shadow">
                            <h3 className="text-lg font-bold text-[#CAFF33] mb-4">Package-wise Member Count</h3>
                            <Pie data={pieData} />
                        </div>
                    </div>

                    {/* Recent Members & Bills */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6 shadow">
                            <h3 className="text-lg font-bold text-[#CAFF33] mb-4">Recent Members</h3>
                            <ul>
                                {recentMembers.map((m, idx) => (
                                    <li key={idx} className="mb-4 border-b border-gray-700 pb-2">
                                        <div className="text-white font-semibold">{m.displayName}</div>
                                        <div className="text-gray-400 text-sm">{m.email}</div>
                                        <div className="text-gray-500 text-xs">{m.packageDate}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 shadow">
                            <h3 className="text-lg font-bold text-[#CAFF33] mb-4">Recent Bills</h3>
                            <ul>
                                {recentBills.length === 0 ? (
                                    <li className="text-gray-400">No bills found.</li>
                                ) : (
                                    recentBills.map((b, idx) => (
                                        <li key={idx} className="mb-4 border-b border-gray-700 pb-2">
                                            <div className="text-white font-semibold">{b.displayName || b.member}</div>
                                            <div className="text-[#CAFF33] font-bold">₹{b.billAmount || b.packagePrice}</div>
                                            <div className="text-gray-500 text-xs">{b.billDate || b.date}</div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-gray-800 rounded-lg p-6 shadow mb-8">
                        <h3 className="text-lg font-bold text-[#CAFF33] mb-4">Latest Notifications</h3>
                        <ul>
                            {(notifications || []).slice(-5).reverse().map((n, idx) => (
                                <li key={idx} className="mb-4 border-b border-gray-700 pb-2">
                                    <div className="text-white">{n.message}</div>
                                    <div className="text-gray-400 text-xs text-right">{n.timestamp}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;