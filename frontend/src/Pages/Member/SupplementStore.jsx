import React from 'react';
import { FaCartPlus, FaStar } from 'react-icons/fa';

// Example product data
const products = [
    {
        id: 1,
        name: "Whey Protein",
        description: "High-quality protein for muscle growth and recovery.",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        price: 49.99,
    },
    {
        id: 2,
        name: "BCAA Energy",
        description: "Boost your workout endurance and hydration.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        price: 29.99,
    },
    {
        id: 3,
        name: "Multivitamin",
        description: "Daily vitamins and minerals for overall health.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        price: 19.99,
    },
    {
        id: 4,
        name: "Creatine Monohydrate",
        description: "Increase strength and power during high-intensity workouts.",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        price: 24.99,
    },
];

function SupplementStore() {
    return (
        <div className="min-h-screen bg-gray-900 py-10 px-2">
            <h2 className="text-3xl font-bold text-center text-[#CAFF33] mb-10">Supplement Store</h2>
            <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center p-5 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-32 h-32 object-cover rounded-xl mb-4 border-4 border-[#CAFF33] shadow"
                        />
                        <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                        <div className="flex items-center mb-2">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="text-yellow-300 font-semibold">{product.rating}</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3 text-center">{product.description}</p>
                        <div className="flex items-center justify-between w-full mb-3">
                            <span className="text-[#CAFF33] font-bold text-lg">${product.price}</span>
                            <button
                                className="flex items-center cursor-pointer gap-2 bg-[#CAFF33] text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-[#b6e62e] transition"
                                title="Add to Cart"
                            >
                                <FaCartPlus /> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SupplementStore;