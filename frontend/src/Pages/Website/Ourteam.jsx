import React from "react";
import Container from "../../Components/Website/Container";
import Tainer1 from "../../assets/Images/Trainer-1.jpg";
import Tainer2 from "../../assets/Images/Trainer-2.jpg";
import Tainer3 from "../../assets/Images/Trainer-3.avif";
import Tainer4 from "../../assets/Images/Traiiner-4.jpg";
import Tainer5 from "../../assets/Images/Trainer-5.jpg";
import Tainer6 from "../../assets/Images/Tainer-6.jpg";
import Tainer7 from "../../assets/Images/Trainer-7.jpg";
import Tainer8 from "../../assets/Images/Tainer-8.jpg";

function Ourteam() {
    const ourteam = [
        {
            name: "Ryan Carter",
            Special: ["Powerlifting", "Routines"],
            des: "Strength & Muscle Gain Expert",
            clients: 7,
            year: 3,
            image: Tainer4,
        },
        {
            name: "Sophia Bennett",
            Special: ["Yoga", "Flexibility"],
            des: "Certified Yoga Instructor & Wellness Coach",
            clients: 12,
            year: 5,
            image: Tainer8,
        },
        {
            name: "Ethan Brooks",
            Special: ["Cardio Training", "Endurance"],
            des: "Cardiovascular Fitness Specialist",
            clients: 10,
            year: 4,
            image: Tainer3,
        },
        {
            name: "Isabella Harper",
            Special: ["Pilates", "Core Strength"],
            des: "Pilates Trainer & Core Strength Expert",
            clients: 8,
            year: 3,
            image: Tainer5,
        },
        {
            name: "Liam Hayes",
            Special: ["Bodybuilding", "Nutrition"],
            des: "Bodybuilding Coach & Nutrition Advisor",
            clients: 15,
            year: 6,
            image: Tainer2,
        },
        {
            name: "Olivia Reed",
            Special: ["Zumba", "Dance Fitness", "Discipline"],
            des: "Zumba Instructor & Dance Fitness Enthusiast",
            clients: 20,
            year: 4,
            image: Tainer6,
        },
        {
            name: "Noah Mitchell",
            Special: ["HIIT", "Strength Training"],
            des: "High-Intensity Interval Training Specialist",
            clients: 9,
            year: 3,
            image: Tainer7,
        },
        {
            name: "Ava Morgan",
            Special: ["Meditation", "Mindfulness"],
            des: "Meditation Coach & Stress Management Expert",
            clients: 11,
            year: 5,
            image: Tainer1,
        },
    ];

    return (
        <section className="py-16  text-white">
            <Container>
                <h2 className="text-3xl font-bold text-center mb-8">
                    Meet Our <span className="text-[#CAFF33]">Team</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {ourteam.map((member) => (
                        <div
                            key={member.name}
                            className="bg-gray-900 shadow-md rounded-lg p-6 text-center"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-48 object-top object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                            <p className="text-gray-400 mb-4">{member.des}</p>
                            <ul className="text-gray-300 mb-4">
                                {member.Special.map((specialization) => (
                                    <li key={specialization} className="text-sm">
                                        • {specialization}
                                    </li>
                                ))}
                            </ul>
                            <div className="text-sm text-gray-400">
                                <p>
                                    <span className="font-bold text-[#CAFF33]">Clients:</span>{" "}
                                    {member.clients}
                                </p>
                                <p>
                                    <span className="font-bold text-[#CAFF33]">Experience:</span>{" "}
                                    {member.year} years
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default Ourteam;