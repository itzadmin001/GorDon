import React, { useContext, useEffect, useState } from 'react'
import Container from "../../Components/Website/Container"
import Button from '../../Components/Website/Button'
import { FaRegCirclePlay } from "react-icons/fa6";
import cantainerImg from "../../assets/Images/Container-1.png"
import MobileBG from "../../assets/Images/MobileBG.png"
import SlickSlider from "../../Components/Website/SlickSlider"
import AbstractDesign2 from "../../assets/Images/AbstractDesign-2.png"
import AbstractDesign3 from "../../assets/Images/AbstractDesign-3.png"
import Tainer1 from "../../assets/Images/Trainer-1.jpg";
import Tainer2 from "../../assets/Images/Trainer-2.jpg";
import Tainer3 from "../../assets/Images/Trainer-3.avif";
import Tainer4 from "../../assets/Images/Traiiner-4.jpg";
import Tainer5 from "../../assets/Images/Trainer-5.jpg";
import Tainer6 from "../../assets/Images/Tainer-6.jpg";
import Tainer7 from "../../assets/Images/Trainer-7.jpg";
import Tainer8 from "../../assets/Images/Tainer-8.jpg";
import frame2 from "../../assets/Images/Frame 2.png";
import frame3 from "../../assets/Images/Frame-3.png";
import frame1 from "../../assets/Images/Frame-1.png";
import { FaDumbbell } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { GiMuscleFat } from "react-icons/gi";
import { IoMdFitness } from "react-icons/io";
import { IoNutritionSharp } from "react-icons/io5";
import OurTeam from "../../Components/Website/OurTeam"
import { MainContext } from '../../MainCon';
import { useNavigate } from 'react-router-dom';


function Home() {
    const { user, PricingDetails, selectPackage, fetchPackageDetails, SetSelectPackage } = useContext(MainContext)
    const navigate = useNavigate()

    const fetchData = async () => {
        await fetchPackageDetails();
    };
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div >
            <Hero />
            <Service />
            <Gallary />
            <Pricing PricingDetails={PricingDetails} selectPackage={selectPackage} SetSelectPackage={SetSelectPackage} />
            <SubcribeOur />
            <Ourteam />
            <LevelUp />
        </div>
    )
}
const Hero = () => {
    return (
        <section >
            <Container classes="mt-5 grid md:grid-cols-2 grid-cols-1 h-[100vh] items-center">
                {/* Left Content */}
                <div className="flex flex-col justify-center gap-6 md:items-start items-center text-center md:text-left">
                    <h1 className="text-[6vw] md:text-[3vw] font-bold leading-tight">
                        <span className="text-[#CAFF33]">Unleash</span> Your Potential. <br />
                        <span className="text-[#CAFF33]">Forge</span> Your Future.
                    </h1>
                    <p className="md:w-[80%] w-full text-sm md:text-base text-gray-400">
                        Ready to transform your body and mind? We're more than just a gym, we're your community to conquer your fitness goals. Join us and experience personalized training, motivating classes, and the support you need to achieve greatness. Start your journey today!
                    </p>
                    <div className="mt-5 flex flex-col md:flex-row items-center gap-5">
                        <Button classes="w-fit duration-300 py-3 px-6 rounded-full bg-[#CAFF33] hover:bg-[#c9ff3387] text-gray-900 font-semibold cursor-pointer">
                            Start Training
                        </Button>
                        <div className="flex items-center gap-2 hover:bg-[#2e2b2b8e] py-2 px-4 rounded-full cursor-pointer">
                            <FaRegCirclePlay className="text-xl text-[#CAFF33]" />
                            <Button classes="cursor-pointer">Watch Demo</Button>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="relative flex justify-center items-center">
                    <img
                        src={cantainerImg}
                        alt="Hero Image"
                        className="hidden md:block w-[38vw] object-contain"
                    />
                    <img
                        src={MobileBG}
                        alt="Hero Image"
                        className="block md:hidden w-[52vw] object-contain"
                    />

                </div>
            </Container>
        </section>
    );
};


const Service = () => {
    const ServiceDetails = [
        {
            name: "Resistance Training",
            icon: <FaDumbbell />,
            des: "Id eaque rerum aliquid nostrum, corporis tempora fugit totam ullam deserunt quia, molestiae esse nihil omnis, quam ab mollitia. Et, odit fugit?"
        },
        {
            name: "Cardio Strength",
            icon: <FaRunning />,
            des: "Id eaque rerum aliquid nostrum, corporis tempora fugit totam ullam deserunt quia, molestiae esse nihil omnis, quam ab mollitia. Et, odit fugit?"
        },
        {
            name: "Fat Lose",
            icon: <GiMuscleFat />,
            des: "Id eaque rerum aliquid nostrum, corporis tempora fugit totam ullam deserunt quia, molestiae esse nihil omnis, quam ab mollitia. Et, odit fugit?"
        },
        {
            name: "Muscle Gain",
            icon: <IoMdFitness />,
            des: "Id eaque rerum aliquid nostrum, corporis tempora fugit totam ullam deserunt quia, molestiae esse nihil omnis, quam ab mollitia. Et, odit fugit?"
        },
        {
            name: "Nutritions",
            icon: <IoNutritionSharp />,
            des: "Id eaque rerum aliquid nostrum, corporis tempora fugit totam ullam deserunt quia, molestiae esse nihil omnis, quam ab mollitia. Et, odit fugit?"
        }
    ]

    return (
        <section className='bg-[#1C1C1C]'>
            <Container classes=" md:h-[70vh] p-6 flex flex-col justify-center gap-5">
                <h1 className='md:text-[2.8vw] text-[8vw] font-semibold md:px-4 text-center'>Explore Our <span className='text-[#CAFF33]'>Services</span></h1>
                <div className="mt-10">
                    <SlickSlider
                        data={ServiceDetails}
                        type="service"
                        settings={{
                            slidesToShow: 5,
                            autoplaySpeed: 2000,
                            dots: false,
                            breakpoint: 1198,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 2,
                                infinite: true,
                                dots: true
                            }
                        }}
                    />
                </div>
            </Container>
        </section>
    )
}


const Gallary = () => {

    return (
        <section className="relative p-8 md:h-[100vh] ">
            <Container classes="mt-20 mb-20">
                {/* Background Abstract Designs */}
                <div>
                    <img
                        src={AbstractDesign2}
                        alt=""
                        className="absolute top-0 left-0 z-[-1] md:w-[20vw] w-[40vw]"
                    />
                    <img
                        src={AbstractDesign3}
                        alt=""
                        className="absolute bottom-0 right-0 z-[-1] md:w-[20vw] w-[40vw]"
                    />
                </div>

                {/* Content Section */}
                <div className="grid lg:grid-cols-2 items-center gap-5 ">
                    {/* Left Content */}
                    <div className="md:p-4 w-full">
                        <div className="flex items-center lg:justify-evenly justify-center gap-4 mb-4">
                            <img
                                src={frame1}
                                alt=""
                                className="w-[45%] md:w-1/3 rounded-2xl"
                            />
                            <img
                                src={frame2}
                                alt=""
                                className="w-[45%] md:w-1/3 rounded-2xl"
                            />
                        </div>
                        <div className="bg-[#CAFF33] text-black md:p-6 p-4 rounded-2xl w-full md:w-auto">
                            <h2 className="md:text-xl text-lg font-semibold mb-4 text-center md:text-left">
                                Get ripped, get strong, get the results you crave with our
                                scientifically designed fitness plan.
                            </h2>
                            <ul className="mb-6 space-y-2 text-sm md:text-base">
                                <li className="flex items-center gap-2">
                                    <span className="text-black">✔️</span> Increase Muscle and
                                    Strength
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-black">✔️</span> Be Healthier than before
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-black">✔️</span> Increase Stamina
                                </li>
                            </ul>
                            <div className="flex flex-wrap gap-5 items-center font-semibold">
                                <Button classes="bg-black text-[#CAFF33] px-4 py-2 rounded-full cursor-pointer">
                                    Join now
                                </Button>
                                <Button classes="cursor-pointer">Contact us</Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Image (Desktop Only) */}
                    <div className="lg:flex hidden justify-start">
                        <img
                            src={frame3}
                            alt=""
                            className="md:w-[22vw]  rounded-2xl"
                        />
                    </div>

                </div>
            </Container>
        </section>
    );
};

const Pricing = ({ PricingDetails, selectPackage, SetSelectPackage, user }) => {
    return (
        <section className="bg-[#1C1C1C] ">
            <Container classes="lg:h-[90vh] flex flex-col justify-center gap-5 p-8">
                <div className='md:flex flex flex-col items-center justify-between md:gap-0 gap-5 '>
                    <h1 className="md:text-[2.8vw] text-[6vw] font-semibold px-4">
                        Our <span className="text-[#CAFF33] ">Packages</span>
                    </h1>
                    <div className='flex items-center gap-5'>
                        <Button classes="px-4 py-2 bg-[#CAFF33] text-gray-900 font-semibold rounded-full cursor-pointer">Billed Montly</Button>
                        <Button classes="px-4 py-2  cursor-pointer hover:bg-[#CAFF33] hover:text-gray-900 hover:rounded-full duration-300">Billed Montly</Button>
                    </div>
                </div>
                <div className="mt-10">
                    <SlickSlider
                        data={PricingDetails}
                        type="pricing"
                        selectPackage={selectPackage} SetSelectPackage={SetSelectPackage}
                        settings={{
                            slidesToShow: 4,
                            autoplaySpeed: 3000,
                            dots: false,
                        }}
                    />
                </div>
            </Container>
        </section>
    );
};

const SubcribeOur = () => {
    return (
        <section>
            <Container classes="bg-[#CAFF33] w-full md:h-[40vh] flex justify-center items-center mt-20 text-gray-900 rounded-3xl md:p-0 p-6">
                <div className="flex flex-col items-center justify-center md:gap-6 gap-2 w-full">
                    <h1 className="md:text-[2.5vw] text-[5vw] font-bold text-center">
                        Subscribe our fitness tips
                    </h1>
                    <p className="md:w-2/3 w-full px-4 text-center text-sm md:text-base">
                        Clearly communicate the benefits of subscribing, such as exclusive content and breaking news.
                    </p>
                    <div className="bg-white py-2 px-4 rounded-full flex items-center gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Enter your email address"
                            className="px-4 py-2 w-full md:w-auto flex-1 text-sm md:text-base border-none focus:outline-none rounded-full"
                        />
                        <Button classes="py-2 px-6 bg-black text-white rounded-full text-sm md:text-base">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
};


const Ourteam = () => {
    const ourteam = [
        {
            name: "Ryan Carter",
            Special: ["Powerlifting", "Routines"],
            des: "Strength & Muscle Gain Expert",
            clients: 7,
            year: 3,
            image: Tainer4
        },
        {
            name: "Sophia Bennett",
            Special: ["Yoga", "Flexibility"],
            des: "Certified Yoga Instructor & Wellness Coach",
            clients: 12,
            year: 5,
            image: Tainer8
        },
        {
            name: "Ethan Brooks",
            Special: ["Cardio Training", "Endurance"],
            des: "Cardiovascular Fitness Specialist",
            clients: 10,
            year: 4,
            image: Tainer3
        },
        {
            name: "Isabella Harper",
            Special: ["Pilates", "Core Strength"],
            des: "Pilates Trainer & Core Strength Expert",
            clients: 8,
            year: 3,
            image: Tainer5
        },
        {
            name: "Liam Hayes",
            Special: ["Bodybuilding", "Nutrition"],
            des: "Bodybuilding Coach & Nutrition Advisor",
            clients: 15,
            year: 6,
            image: Tainer2
        },
        {
            name: "Olivia Reed",
            Special: ["Zumba", "Dance Fitness", "Discipline"],
            des: "Zumba Instructor & Dance Fitness Enthusiast",
            clients: 20,
            year: 4,
            image: Tainer6
        },
        {
            name: "Noah Mitchell",
            Special: ["HIIT", "Strength Training"],
            des: "High-Intensity Interval Training Specialist",
            clients: 9,
            year: 3,
            image: Tainer7
        },
        {
            name: "Ava Morgan",
            Special: ["Meditation", "Mindfulness"],
            des: "Meditation Coach & Stress Management Expert",
            clients: 11,
            year: 5,
            image: Tainer1
        }
    ];
    return (
        <section className='w-full mt-20 '>
            <Container>
                <h1 className=' w-full text-center md:text-[2vw] text-[8vw] mb-5 font-semibold'>Our <span className='text-[#CAFF33]'> Team</span> </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {ourteam.map((item, i) => (
                        <OurTeam item={item} key={i} />
                    ))}
                </div>
            </Container>
        </section>
    )
}

const LevelUp = () => {
    return (
        <section>
            <Container classes="mt-30  ">
                <div className='w-full py-4 md:px-10 px-4 relative md:h-[30vh] overflow-auto flex flex-col md:flex-row  justify-between items-center'>
                    <div className='absolute top-0 left-0 z-[-1] '>
                        <img src={AbstractDesign2} alt="" className='md:w-[12vw] w-[26vw]' />
                    </div>
                    <div className='md:w-2/3 flex flex-col gap-5 items-center justify-center'>
                        <h1 className='md:text-[2.5vw] text-[4vw] font-semibold'>Level Up Your Fitness Game <span className='text-[#CAFF33]'>Today!</span></h1>
                        <p className='md:text-sm text-[2vw]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque qui asperiores voluptates maiores laudantium cum in nihil odit doloremque illum laboriosam soluta architecto at, ad repellendus ut perferendis quas.</p>
                    </div>
                    <Button classes=" bg-[#CAFF33] py-3 px-6 mt-5 text-sm rounded-4xl text-gray-900 font-semibold w-fit mx-auto">Register Now</Button>
                </div>
            </Container>
        </section>
    )
}










export default Home
