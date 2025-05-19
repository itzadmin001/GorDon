import React, { useContext, useEffect, useState } from 'react';
import { FaAppleAlt, FaReceipt, FaStore, FaSignOutAlt, FaCalendarAlt, FaDumbbell, FaExclamationTriangle, FaUserTie, FaLightbulb } from 'react-icons/fa';
import Container from '../../Components/Website/Container';
import { MainContext } from '../../MainCon';
import { Link, useNavigate } from 'react-router-dom';
import LoadingComponent from "../../Components/Website/Loading"

function MemberHome() {
    const { notify, member, handleLogout, userUID, fetchNotifications, fetchDataFromDatabase, supplement, deleteUserFromdataBase, notifications } = useContext(MainContext)
    const [loading, Setloading] = useState(true)
    const [trainerDetails, setTrainerDetails] = useState([]);

    const navigate = useNavigate()

    console.log(member)


    useEffect(() => {
        if (member) {
            navigate("/member");
            Setloading(false)
            fetchNotifications(userUID)
        } else navigate("/member-login");

    }, [member]);

    useEffect(() => {
        fetchDataFromDatabase('trainers');


    }, [])

    useEffect(() => {
        setTrainerDetails(Array.isArray(supplement) ? supplement : []);
    }, [supplement]);


    if (loading) return <LoadingComponent />

    return (
        <div className="bg-[#1C1C1C] min-h-screen text-white">
            <PaymentDetails member={member} />
            <MainMenu handleLogout={handleLogout} />
            <TrainerDetails trainerDetails={trainerDetails} member={member} />
            <QuickTips />
        </div>
    );
}



const MainMenu = ({ handleLogout }) => {
    const menuItems = [
        { title: 'My Diet Plan', icon: <FaAppleAlt />, bgColor: 'bg-[#FF6B6B]', path: "/member/my-diet" },
        { title: 'Fee Receipts', icon: <FaReceipt />, bgColor: 'bg-[#4ECDC4]', path: "/member/fee-receipt" },
        { title: 'Supplement Store', icon: <FaStore />, bgColor: 'bg-[#FFD93D]', path: "/member/supplements" },
    ];

    return (
        <section className="py-2">
            <Container>
                <div className="grid grid-cols-2 gap-4">
                    {menuItems.map((item, index) => (
                        <Link to={item.path}
                            key={index}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-lg ${item.bgColor} hover:scale-105 transition-transform duration-300`}
                        >
                            <div className="text-3xl text-white">{item.icon}</div>
                            <h3 className="mt-2 text-sm font-semibold text-white">{item.title}</h3>
                        </Link>
                    ))}
                    <div
                        className={`flex cursor-pointer flex-col items-center justify-center p-4 rounded-lg shadow-lg bg-gray-600 hover:scale-105 transition-transform duration-300`}
                        onClick={() => {
                            handleLogout()
                            notify("logout successfully", 1)
                            navigate("/member-login")
                        }}>
                        <div className="text-3xl text-white"><FaSignOutAlt /></div>
                        <h3 className="mt-2 text-sm font-semibold text-white">Logout</h3>
                    </div>
                </div>
            </Container>
        </section>
    );
};

const PaymentDetails = ({ member }) => (
    <section className="py-2">
        <Container>
            <div className="bg-[#333333] p-4 rounded-lg shadow-lg flex items-center gap-4">
                <FaCalendarAlt className="text-3xl text-[#FFD93D]" />
                <div>
                    <p className="text-sm">Upcoming Payment Date: <span className="font-bold">{member ? member.expiryDate : "Loading..."}</span></p>
                    <p className="text-sm">Remaining Package: <span className="font-bold">{member?.packageName}</span></p>
                </div>
            </div>
        </Container>
    </section>
);



const TrainerDetails = ({ trainerDetails, member }) => {
    // Find the first trainer whose gender matches the member's gender
    const matchedTrainer = trainerDetails.find(item => item.gender === member?.gender);

    return (
        <section className="py-2">
            <Container>
                {matchedTrainer ? (
                    <div className="bg-[#5a4b10] p-4 rounded-lg shadow-lg flex items-center gap-4">
                        <img
                            src="https://via.placeholder.com/80"
                            alt="Trainer"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm font-bold">
                                Your Trainer: <span className="font-normal">{matchedTrainer.name}</span>
                            </p>
                            <p className="text-sm">
                                Specialization: {Array.isArray(matchedTrainer.special) ? matchedTrainer.special.join(', ') : (matchedTrainer.special || 'Strength + Diet')}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-400 text-center py-4">No matching trainer found.</div>
                )}
            </Container>
        </section>
    );
};

const QuickTips = () => (
    <section className="py-2">
        <Container>
            <div className="bg-[#333333] p-4 rounded-lg shadow-lg flex items-center gap-4">
                <FaLightbulb className="text-3xl text-[#FFD93D]" />
                <p className="text-sm">Health Tip: Stay hydrated before and after workout!</p>
            </div>
        </Container>
    </section>
);

export default MemberHome;
