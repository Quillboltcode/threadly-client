import React, { useState } from "react";

const ProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Media");

  const tabs = ["Posts", "Replies", "Media", "Videos", "Likes", "Feeds"];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Tabs Navigation */}
      <div className="flex justify-between border-b border-gray-700 text-gray-400">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 text-center py-2 ${
              activeTab === tab
                ? "text-white border-b-2 border-blue-500"
                : "hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty State - Only for "Media" */}
      {activeTab === "Media" && (
        <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full">
            🌱 {/* Replace with an actual SVG or icon */}
          </div>
          <p className="mt-2 text-sm">No posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileTabs;
