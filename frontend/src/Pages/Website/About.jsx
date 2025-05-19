import React from 'react';
import { FaDumbbell, FaRunning, FaUsers, FaAward } from 'react-icons/fa';
import { GiStrongMan, GiHeartBeats } from 'react-icons/gi';
import Container from '../../Components/Website/Container';
import Button from '../../Components/Website/Button';
import MobileBG from "../../assets/Images/MobileBG.png"
function About() {
    return (
        <div className=" text-white">
            {/* Hero Section */}
            <section className="relative py-16">
                <Container classes="flex flex-col items-center text-center gap-6">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        About <span className="text-[#CAFF33]">Us</span>
                    </h1>
                    <p className="text-gray-400 md:w-2/3">
                        Welcome to our fitness community! We are dedicated to helping you achieve your fitness goals with personalized training, expert guidance, and a supportive environment. Whether you're a beginner or a seasoned athlete, we have something for everyone.
                    </p>
                    <Button classes="bg-[#CAFF33] text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-[#c9ff3387]">
                        Join Us Today
                    </Button>
                </Container>
            </section>

            {/* Our Mission Section */}
            <section className="py-16">
                <Container classes="grid md:grid-cols-2 gap-10 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Our <span className="text-[#CAFF33]">Mission</span>
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Our mission is to empower individuals to lead healthier, happier lives through fitness. We believe in creating a community where everyone feels welcome and motivated to achieve their personal best.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-4">
                                <FaDumbbell className="text-[#CAFF33] text-2xl" />
                                <span>Provide world-class fitness training and resources.</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <GiStrongMan className="text-[#CAFF33] text-2xl" />
                                <span>Help you build strength, endurance, and confidence.</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <GiHeartBeats className="text-[#CAFF33] text-2xl" />
                                <span>Promote overall physical and mental well-being.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center">
                        <img
                            src={MobileBG}
                            alt="Our Mission"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </Container>
            </section>

            {/* Why Choose Us Section */}
            <section className=" py-16">
                <Container classes="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Why <span className="text-[#CAFF33]">Choose Us</span>
                    </h2>
                    <p className="text-gray-400 md:w-2/3 mx-auto mb-10">
                        We are more than just a gym. We are a community of fitness enthusiasts who are passionate about helping you succeed. Here's why you should choose us:
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <FaUsers className="text-[#CAFF33] text-4xl mb-4" />
                            <h3 className="text-xl font-bold mb-2">Community Support</h3>
                            <p className="text-gray-400">
                                Join a supportive community that motivates and inspires you to reach your goals.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <FaAward className="text-[#CAFF33] text-4xl mb-4" />
                            <h3 className="text-xl font-bold mb-2">Expert Trainers</h3>
                            <p className="text-gray-400">
                                Work with certified trainers who are dedicated to your success.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <FaRunning className="text-[#CAFF33] text-4xl mb-4" />
                            <h3 className="text-xl font-bold mb-2">State-of-the-Art Facilities</h3>
                            <p className="text-gray-400">
                                Train in a modern facility equipped with the latest fitness technology.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Call to Action Section */}
            <section className="bg-[#CAFF33] py-16">
                <Container classes="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Ready to Transform Your Life?
                    </h2>
                    <p className="text-gray-800 md:w-2/3 mx-auto mb-8">
                        Take the first step towards a healthier, stronger, and more confident you. Join our fitness community today and start your journey to greatness.
                    </p>
                    <Button classes="bg-black text-[#CAFF33] px-6 py-3 rounded-full font-semibold hover:">
                        Get Started
                    </Button>
                </Container>
            </section>
        </div>
    );
}

export default About;