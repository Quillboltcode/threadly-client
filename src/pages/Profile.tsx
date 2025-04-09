import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import EditProfileModal from '../components/ProfileForm';
import ProfileTabs from '../components/ProfileTab';
const Profile: React.FC = () => {
  const user = {
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    username: 'John Doe',
    email: 'jL2Q4@example.com',
    followers: 100,
    following: 50,
    postcount: 50
  };


  return (
    <div className="bg-gray-900 text-white w-ful">
      {/* Back Button */}
      <div className="px-4 py-2 flex max-sm:justify-end">
        <FaArrowLeft className="text-lg cursor-pointer" />
      </div>

      {/* Profile Header */}
      <div className="relative w-full h-32 bg-gray-800"></div>

      {/* Profile Picture and Info */}
      <div className="px-4">
        <div className="relative -mt-12 flex items-center">
          {/* Profile Picture */}
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center border-4 border-gray-900">
            {user.avatar &&
              <img src={user.avatar} alt="User Profile" aria-label="User Profile Picture" className="w-full h-full rounded-full" />
            }

            {!user.avatar &&
              <span className="text-2xl" aria-label="Default Profile Icon">☕</span>
            }
            {/* Placeholder for profile icon */}
          </div>

          {/* Edit Button */}
          <div className="ml-auto">
            <EditProfileModal />
          </div>
        </div>

        {/* Profile Name & Handle */}
        <h1 className="text-xl font-bold mt-2">{user.username}.bsky.social</h1>
        <p className="text-gray-400">@{user.username}.bsky.social</p>

        {/* Follower & Following Count */}
        <div className="flex space-x-4 text-gray-400 text-sm mt-2">
          <span>
            <span className="text-white font-semibold">{user.followers}</span> follower
          </span>
          <span>
            <span className="text-white font-semibold">{user.following}</span> following
          </span>
          <span>
            <span className="text-white font-semibold">{user.postcount}</span> posts
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center bg-gray-900">
        <ProfileTabs />
      </div>
    </div>
  );
}

export default Profile;






