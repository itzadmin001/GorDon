import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../MainCon';

function PushNotification() {
    const { fetchMemberData, MemberDetails, sendNotification, notify } = useContext(MainContext);
    const [selectedMember, setSelectedMember] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMemberData();
        setLoading(false);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedMember || !message.trim()) {
            notify("Please select a member and enter a message.", "error");
            return;
        }
        sendNotification(selectedMember, message);
        notify("Notification sent!", "success");
        setMessage('');
        setSelectedMember('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full">
                <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-6">Send Notification</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-semibold text-gray-200">Select Member</label>
                        <select
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                            value={selectedMember}
                            onChange={e => setSelectedMember(e.target.value)}
                            required
                        >
                            <option value="">-- Select Member --</option>
                            {Array.isArray(MemberDetails) && MemberDetails.map(member => (
                                <option key={member.id} value={member.id}>
                                    {member.displayName || member.email || member.id}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-200">Message</label>
                        <textarea
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                            rows={4}
                            placeholder="Enter your message..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#CAFF33] text-gray-900 py-2 rounded font-bold hover:bg-[#b6e62e] transition"
                    >
                        Send Notification
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PushNotification;