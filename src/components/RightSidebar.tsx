import React from 'react';
import { FaCircleNotch } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle';
import { ScreenMode } from '../App';
import { useCommonTags } from '../hooks/useCommonTags';

interface RightSidebarProps {
  mode: ScreenMode;
  setMode: React.Dispatch<React.SetStateAction<ScreenMode>>;
}


const RightSidebar: React.FC<RightSidebarProps> = ({ mode }) => {
  const { data, error, isLoading } = useCommonTags();


  if (isLoading){
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className={`transition-all bg-gray-800 text-white border-l border-gray-700 p-4
        fixed right-0 top-0 h-screen duration-300 
        ${mode === ScreenMode.Hidden ? "w-0 overflow-hidden" : ""}
        ${mode === ScreenMode.Full ? "w-64 md:block hidden" : ""}`}
    >
      {mode !== ScreenMode.Hidden && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <div className="mb-4">
            {/* Getting Started Section */}
            <h2 className="text-gray-400 mb-2">GETTING STARTED</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaCircleNotch />
                <span>Like 10 posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCircleNotch />
                <span>Follow 7 accounts</span>
              </div>
            </div>
            {/* Theme Toggle */}
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-gray-400 mb-2">Discover</h2>
            <a className="text-blue-500" href="#">
              Following
            </a>
          </div>

          <div className="mb-4">
            <h2 className="text-gray-400 mb-2">Trending</h2>
            <div className="flex flex-wrap gap-2">
              {data?.map((tag) => (
                <span
                  key={tag.tag}
                  className="bg-gray-700 text-white px-2 py-1 rounded-full"
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          </div>

          <div className="text-gray-400 space-x-4">
            <a className="hover:underline" href="#">
              Feedback
            </a>
            <a className="hover:underline" href="#">
              Privacy
            </a>
            <a className="hover:underline" href="#">
              Terms
            </a>
            <a className="hover:underline" href="#">
              Help
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default RightSidebar;