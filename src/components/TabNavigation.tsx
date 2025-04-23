import { useState } from "react";

import { PiButterfly } from "react-icons/pi";



export default function TabNavigation() {
    const [activeTab, setActiveTab] = useState("discover");

    return (
        <div className="w-1/2 bg-gray-900 text-white py-2">
            {/* Flex Layout for Icon + Tabs */}
            <div className="flex flex-col items-center w-full max-w-md mx-auto px-4">
                {/* Center Icon */}
                <div className="flex justify-center relative ">
                    <PiButterfly className="text-blue-500 text-2xl" />
                </div>

                <div className="flex flex-row justify-between items-center w-full">
                    {/* Left Tab (Discover) */}
                    <button
                        className={`text-center w-full text-lg font-medium py-2 hover:bg-gray-600 ${activeTab === "discover" ? "text-blue-500" : "text-gray-400"
                            }`}
                        onClick={() => setActiveTab("discover")}
                    >
                        Discover
                        {activeTab === "discover" && (
                            <div className="w-10 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
                        )}
                    </button>

                    {/* Right Tab (Following) */}
                    <button
                        className={`text-center w-full text-lg font-medium py-2 hover:bg-gray-600 ${activeTab === "following" ? "text-blue-500" : "text-gray-400"
                            }`}
                        onClick={() => setActiveTab("following")}
                    >
                        Following
                        {activeTab === "following" && (
                            <div className="w-10 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
                        )}
                    </button>
                </div>
            </div>


            {/* Content */}
            {/* <div className="mt-4 w-full max-w-md px-4">
        {activeTab === "discover" && <p className="text-center">🌍 Discover Content</p>}
        {activeTab === "following" && <p className="text-center">👥 Following Content</p>}
      </div> */}
        </div>
    );
}
