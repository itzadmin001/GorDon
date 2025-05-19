import React from "react";
import { FaSpinner } from "react-icons/fa";

function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen  text-white">
            <div className="text-center">
                <FaSpinner className="text-6xl animate-spin text-[#CAFF33] mx-auto mb-4" />
                <h1 className="text-2xl font-bold">Loading...</h1>
                <p className="text-gray-400 mt-2">
                    Please wait while we prepare everything for you.
                </p>
            </div>
        </div>
    );
}

export default Loading;