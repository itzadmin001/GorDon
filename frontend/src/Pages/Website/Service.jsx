import React from "react";
import Container from "../../Components/Website/Container";
import SlickSlider from "../../Components/Website/SlickSlider";
import { FaDumbbell, FaRunning } from "react-icons/fa";
import { GiMuscleFat } from "react-icons/gi";
import { IoMdFitness } from "react-icons/io";
import { IoNutritionSharp } from "react-icons/io5";

function Service() {
    const ServiceDetails = [
        {
            name: "Resistance Training",
            icon: <FaDumbbell />,
            des: "Build strength and endurance with our expert-designed resistance training programs."
        },
        {
            name: "Cardio Strength",
            icon: <FaRunning />,
            des: "Boost your cardiovascular health and stamina with our high-energy cardio sessions."
        },
        {
            name: "Fat Loss",
            icon: <GiMuscleFat />,
            des: "Achieve your weight loss goals with personalized fat-burning workout plans."
        },
        {
            name: "Muscle Gain",
            icon: <IoMdFitness />,
            des: "Gain muscle mass and sculpt your body with our advanced training techniques."
        },
        {
            name: "Nutrition Guidance",
            icon: <IoNutritionSharp />,
            des: "Get tailored nutrition advice to complement your fitness journey and maximize results."
        }
    ];

    return (
        <div className=" text-white">
            {/* Hero Section */}
            <section className="py-16 ">
                <Container classes="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        Our <span className="text-[#CAFF33]">Services</span>
                    </h1>
                    <p className="text-gray-400 md:w-2/3 mx-auto mt-4">
                        Explore a wide range of fitness services tailored to meet your unique goals. From strength training to nutrition guidance, we have everything you need to succeed.
                    </p>
                </Container>
            </section>

            {/* Services Section */}
            <section className="bg-[#1C1C1C] py-16">
                <Container classes="p-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                        Explore Our <span className="text-[#CAFF33]">Offerings</span>
                    </h2>
                    <SlickSlider
                        data={ServiceDetails}
                        type="service"
                        settings={{
                            slidesToShow: 4,
                            autoplaySpeed: 3000,
                            dots: true,
                            responsive: [
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1
                                    }
                                }
                            ]
                        }}
                    />
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
                    <button className="bg-black cursor-pointer text-[#CAFF33] px-6 py-3 rounded-full font-semibold hover:bg-gray-800">
                        Get Started
                    </button>
                </Container>
            </section>
        </div>
    );
}

export default Service;