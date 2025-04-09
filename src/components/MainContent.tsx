import React, { useState } from 'react';
import {FaRetweet } from 'react-icons/fa'
import { PiButterfly } from "react-icons/pi";
import TabNavigation from './TabNavigation';

const MainContent: React.FC = () => {
  const [PostArray,setPostArray] = useState(null);
  const [activeTab, setActiveTab] = useState('following');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-1/2   flex-2 flex flex-col">
      {/* icon and tab for Following and Discover */}
      <TabNavigation />
      <div className="flex-1 flex">
        <div className="w-3/5 p-4">
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <FaRetweet className='text-gray-500 mr-2'></FaRetweet>
              <i className="fas fa-retweet text-gray-400 mr-2"></i>
              <span className="text-gray-400">Reposted by Bluesky</span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Knight Foundation</span>
              <span className="text-gray-400">@knightfoundation.org · 6d</span>
            </div>
            <p className="mb-2">
              Jay Graber, <span className="text-blue-500">@jay.bsky.team</span>, CEO of{' '}
              <span className="text-blue-500">@bsky.app</span> joined{' '}
              <span className="text-blue-500">@maribel-wadsworth.bsky.social</span> on the{' '}
              <span className="text-blue-500">#KMF25</span> stage for a timely conversation on the social
              network’s rapid growth, unique algorithm and how journalists can leverage it effectively.
            </p>
            <p className="text-blue-500 mb-2">
              Watch the full conversation here:{' '}
              <a className="text-blue-500" href="https://kf.org/419MKgK">
                kf.org/419MKgK
              </a>
            </p>
            <img
              src="https://placehold.co/600x400"
              alt="A woman speaking at a conference"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

