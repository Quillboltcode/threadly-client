import React, { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const PasswordPage: React.FC = () => {
  const location = useLocation(); // Access route state
  const navigate = useNavigate();
  const [ email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useAuth();    

  useEffect(() => {
    // Retrieve the username from the route state
    const { username: routeUsername } = location.state || {};
    if (routeUsername) {
      setEmail(routeUsername);
    }
  }, [location]);
  // Get the return URL from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // Now we can use navigate safely here
      navigate(from, { replace: true });
    } catch (err) {
      // Error handling is done in the auth context
      toast.error("Error logging in");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-full flex flex-col justify-center items-center px-8">
        <h2 className="text-2xl font-medium mb-4">Account</h2>
        <div className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="@quillbolt.bsky.social"
              className="w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
            />
            <a href="#" className="absolute top-2 right-2 text-sm text-gray-400 hover:text-white">
              Forgot?
            </a>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;