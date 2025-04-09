import React from "react";
import { FaUserPlus, FaUser, FaLock, FaHandPaper, FaImages, FaPaintBrush, FaUniversalAccess, FaLanguage, FaQuestionCircle, FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router";

export const settingsOptions = [
  { icon: <FaUserPlus />, label: "Add another account", path: "/settings/add-account" },
  { icon: <FaUser />, label: "Account", path: "/settings/account" },
  { icon: <FaLock />, label: "Privacy and security", path: "/settings/privacy" },
  { icon: <FaHandPaper />, label: "Moderation", path: "/settings/moderation" },
  { icon: <FaImages />, label: "Content and media", path: "/settings/content" },
  { icon: <FaPaintBrush />, label: "Appearance", path: "/settings/appearance" },
  { icon: <FaUniversalAccess />, label: "Accessibility", path: "/settings/accessibility" },
  { icon: <FaLanguage />, label: "Languages", path: "/settings/languages" },
  { icon: <FaQuestionCircle />, label: "Help", path: "/settings/help" },
  { icon: <FaInfoCircle />, label: "About", path: "/settings/about" },
];

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const username = (user as any).user?.username || user?.email || "User";
  const handleLogout = async () => {
    await logout();
  };
  const handleBack = () => {
    navigate(-1);
  };
  
  const navigateToPage = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="bg-gray-900 text-white flex w-full items-center justify-center">
      <div className="w-full max-w-md p-4">
        <div className="flex items-center space-x-3">
          <button className="text-white text-xl">
            <FaArrowLeft onClick={handleBack}></FaArrowLeft>
          </button>
          <h2 className="text-xl font-semibold">Settings</h2>
        </div>

        <div className="flex flex-col items-center py-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold">
            ☕
          </div>
          <h3 className="text-lg font-semibold mt-2">{username}.threadly.social</h3>
          <p className="text-gray-400">@{username}.threadly.social</p>
        </div>

        <div className="mt-4 bg-gray-800 rounded-lg">
          {settingsOptions.map((option, index) => (
            <div
            onClick={() => navigateToPage(option.path)}
              key={index}
              className="flex items-center space-x-4 p-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-none"
            >
              <span className="text-xl">{option.icon}</span>
              <span className="text-white">{option.label}</span>
            </div>
          ))}
        </div>

        <button 
        onClick={handleLogout}
        className="mt-4 text-red-500 text-center py-2 cursor-pointer hover:text-red-600">
          Log out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
