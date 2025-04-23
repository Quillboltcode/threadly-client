import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa'; // For the chevron icon
import { useNavigate } from 'react-router';
import LogoComponent from '../components/LogoComponent';
const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [previousUsers, setPreviousUsers] = useState<{ username: string }[]>([]);
  

  const goBack = () => {
    navigate(-1); 
  };
  

  useEffect(() => {
    // Retrieve previously logged-in users from localStorage
    const storedUsers = localStorage.getItem('loggedInUsers');
    if (storedUsers) {
      setPreviousUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleLogin = (username: string) => {
    // Add the new user to the list of previous users
    setPreviousUsers((prevUsers) => [...prevUsers, { username }]);
    navigate('/create')
  };
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <h1 className="text-4xl font-bold text-blue-500">Sign in</h1>
        <p className="text-lg mt-2">Select from an existing account</p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8 border-l border-gray-700">
        {/* Sign-in Options */}
        <div className="w-full max-w-md">
          <h2 className="text-lg font-medium mb-2">Sign in as...</h2>
          {/* Display Previous Users */}
          {previousUsers.length > 0 && previousUsers.map((user, index) => (
            <button
              key={index}
              type="button"
              className="flex items-center justify-between w-full p-4 border border-gray-700 rounded-md hover:bg-gray-800 transition duration-300"
              onClick={() => handleLogin(user.username)}
            >
              <div className="flex items-center space-x-2">
                <LogoComponent className='w-5 h-5' />
                <span className="text-sm font-medium">{user.username}</span>
              </div>
              <FaChevronRight className="text-gray-400" />
            </button>
          ))}

          {/* Other Account */}
          <button
            onClick={()=>navigate('/create')}
            type="button"
            className="flex items-center justify-between w-full p-4 border border-gray-700 rounded-md hover:bg-gray-800 transition duration-300"
          >
            <span className="text-sm font-medium">Other account</span>
            <FaChevronRight className="text-gray-400" />
          </button>
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SignInPage;