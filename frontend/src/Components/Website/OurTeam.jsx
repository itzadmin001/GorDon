import React from 'react';

function OurTeam({ item }) {
    return (
        <div className="w-full lg:w-[28w] bg-[#1C1C1C] rounded-2xl cursor-pointer hover:shadow-2xl hover:scale-105 duration-300">
            <div className="grid grid-cols-2  items-center p-4 gap-4">
                <div className="w-full flex flex-col items-start gap-2">
                    <h1 className="text-lg md:text-xl font-semibold">{item.name}</h1>
                    <p className="text-sm text-gray-400">{item.des}</p>
                    <div className="flex items-center gap-4">
                        <div>
                            <h1>
                                {item.clients}
                                <span className="text-red-500">+</span>
                            </h1>
                            <h3>Clients</h3>
                        </div>
                        <div>
                            <h1>
                                {item.year}
                                <span className="text-green-500">+</span>
                            </h1>
                            <h3>Year</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                        {item &&
                            item.Special.slice(0, 2).map((val, i) => (
                                <h1 key={i} className="bg-[#333232] py-1 px-2 rounded-md">
                                    {val}
                                </h1>
                            ))}
                        {item.Special.length > 2 && (
                            <h1 className="bg-[#333232] py-1 px-2 rounded-md">
                                +{item.Special.length - 2}
                            </h1>
                        )}
                    </div>
                </div>
                <div className="">
                    <img
                        src={item.image}
                        alt={item.name}
                        className=" md:w-full w-[30vw] rounded-2xl  mx-auto object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default OurTeam;