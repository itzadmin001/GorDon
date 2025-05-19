import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

function SlickSlider({ data, type, settings, selectPackage, user, SetSelectPackage }) {
    const navigate = useNavigate()
    // Default settings if none are provided
    const defaultSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1198,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    const sliderSettings = { ...defaultSettings, ...settings };

    return (
        <Slider {...sliderSettings}>
            {data &&
                data.map((item, i) => (
                    <div key={i} className="px-3">
                        {type === "service" ? (
                            <div className="md:w-60 flex flex-col items-start gap-3 bg-[#0D0D0D] p-6 rounded-2xl cursor-pointer hover:bg-[#CAFF33] hover:text-black duration-300 h-full">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-sm">{item.des}</p>
                            </div>
                        ) : type === "pricing" ? (
                            <div className="md:w-68 flex flex-col items-center md:gap-4 gap-8 bg-[#0D0D0D] p-6 rounded-2xl text-center hover:bg-[#CAFF33] hover:text-black duration-300 h-full hover:scale-90">
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="md:text-2xl text-4xl font-bold">{item.price}</p>
                                <p className="text-sm">{item.description}</p>
                                <ul className="text-left space-y-2">
                                    {item.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span>✔️</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="bg-[#CAFF33] text-black px-4 py-2 rounded-full font-semibold hover:bg-black hover:text-[#CAFF33] cursor-pointer" onClick={() => {
                                    SetSelectPackage(item.id)
                                    navigate('/cart')
                                }}>
                                    Register Now
                                </button>
                            </div>
                        ) : null}
                    </div>
                ))}
        </Slider>
    );
}

export default SlickSlider;
