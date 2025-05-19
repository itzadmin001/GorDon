import React from "react";
import Container from "../../Components/Website/Container";
import Button from "../../Components/Website/Button";
import SlickSlider from "../../Components/Website/SlickSlider";

function Pricing() {
    const PricingDetails = [
        {
            name: "Basic Package",
            price: "$25",
            description: "per month, billed annually",
            features: [
                "Unlimited Gym Access",
                "2x Fitness Consultant",
                "Nutrition Tracking",
                "1x Free Supplement",
                "3 Days per week",
                "Personal Trainer"
            ],
            maxUsers: 50
        },
        {
            name: "Mid Package",
            price: "$55",
            description: "per month, billed annually",
            features: [
                "Unlimited Gym Access",
                "4x Fitness Consultant",
                "Nutrition Tracking",
                "5x Free Supplement",
                "5 Days per week",
                "Personal Trainer"
            ],
            maxUsers: 50
        },
        {
            name: "Pro Package",
            price: "$75",
            description: "per month, billed annually",
            features: [
                "Unlimited Gym Access",
                "7x Fitness Consultant",
                "Nutrition Tracking",
                "6x Free Supplement",
                "Gym Card",
                "Personal Trainer"
            ],
            maxUsers: 50
        },
        {
            name: "Athlete Package",
            price: "$105",
            description: "per month, billed annually",
            features: [
                "Unlimited Gym Access",
                "Free Clothes",
                "All Training Program",
                "Free Fitness Consultant",
                "Free Supplement",
                "Gym Card"
            ],
            maxUsers: 50
        }
    ];

    return (
        <div className=" text-white">
            {/* Hero Section */}
            <section className="py-16 ">
                <Container classes="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        Our <span className="text-[#CAFF33]">Pricing</span>
                    </h1>
                    <p className="text-gray-400 md:w-2/3 mx-auto mt-4">
                        Choose the plan that fits your fitness goals and budget. Whether you're just starting or looking for advanced training, we have the perfect plan for you.
                    </p>
                </Container>
            </section>

            {/* Pricing Plans Section */}
            <section className="py-16">
                <Container >
                    <div className="mt-10">
                        <SlickSlider
                            data={PricingDetails}
                            type="pricing"
                            settings={{
                                slidesToShow: 4,
                                autoplaySpeed: 3000,
                                dots: false,
                            }}
                        />
                    </div>
                </Container>
            </section>

            {/* Call to Action Section */}
            <section className="bg-[#CAFF33] py-16">
                <Container classes="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-gray-800 md:w-2/3 mx-auto mb-8">
                        Join our fitness community today and take the first step towards achieving your fitness goals. Choose a plan and start your journey now!
                    </p>
                    <Button classes="bg-black text-[#CAFF33] px-6 py-3 rounded-full font-semibold hover:">
                        View All Plans
                    </Button>
                </Container>
            </section>
        </div>
    );
}

export default Pricing;