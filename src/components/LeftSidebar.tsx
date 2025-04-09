import React, {  } from 'react';
import { FaHome, FaSearch, FaBell, FaComment, FaStream, FaList, FaUser, FaCog } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import { NavLink } from 'react-router';
import { ScreenMode } from '../App';
import NewPostButton from './NewPostButton';
import { usePosts } from '../hooks/usePost';


interface LeftSidebarProps {
  mode: ScreenMode;
  setMode: React.Dispatch<React.SetStateAction<ScreenMode>>;
  children? : React.ReactNode;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ mode , setMode,children }) => {
  // const { data, isLoading, isError } = usePosts();
  // console.log(data)
  return (
    <div
      className={`h-screen lg:ml-8 bg-gray-900 text-white flex flex-col transition-all border-b border-b-gray-700 duration-300
        ${mode === ScreenMode.Hidden ? 'w-0 overflow-hidden' : ''}
        ${mode === ScreenMode.Icon ? 'w-16' : ''}
        ${mode === ScreenMode.Full ? 'w-64' : ''}`}
    >
      {/* Toggle button for small screens */}
      {mode === ScreenMode.Hidden && (
        <button
          aria-label="Toggle Sidebar"
          className="p-3 text-white bg-gray-900 hover:bg-gray-700 fixed top-4 left-4 rounded-md z-[999]"
          onClick={() => setMode(ScreenMode.Icon)}
        >
          <CiMenuBurger />
        </button>
      )}

      {/* Logo or Header */}
      <div className="flex items-center justify-start mb-6">
        <div className="bg-blue-500 p-2 rounded-full">
          <FaHome />
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        <SidebarItems icon={<FaHome />} text="Home" link="/Home" mode={mode} />
        <SidebarItems icon={<FaSearch />} text="Search" link="/search" mode={mode} />
        <SidebarItems icon={<FaBell />} text="Notifications" link="/notifications" mode={mode} />
        <SidebarItems icon={<FaComment />} text="Messages" link="/messages" mode={mode} />
        <SidebarItems icon={<FaStream />} text="Streams" link="/streams" mode={mode} />
        <SidebarItems icon={<FaList />} text="Lists" link="/lists" mode={mode} />
        <SidebarItems icon={<FaUser />} text="Profile" link="/profile" mode={mode} />
        <SidebarItems icon={<FaCog />} text="Settings" link="/settings" mode={mode} />
      </nav>

      {mode === "full" && children}
    </div>
  );
};

type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  link: string;
  mode: ScreenMode;
};

const SidebarItems: React.FC<SidebarItemProps> = ({ icon, text, link, mode }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-2 p-3 hover:bg-gray-700 cursor-pointer ${isActive ? 'bg-gray-700' : ''
        }`
      }
    >
      {icon}
      {mode === ScreenMode.Full && <span className="whitespace-nowrap">{text}</span>}
    </NavLink>
  );
};

export default LeftSidebar;