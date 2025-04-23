import React from 'react';
import LogoComponent from '../components/LogoComponent';
// import SignInPage from './SignInPage';
import { useNavigate } from 'react-router';
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Logo and Title */}
      
      <div className="mb-8 items-center justify-center">
        <div className="flex items-center justify-center">
        <LogoComponent/>
        </div>
        <h1 className="text-4xl font-bold">Threadly</h1>
        <div className="text-center">
        <p className="text-xl text-neutral-400 mt-2">What's up?</p></div>
      </div>

      {/* Buttons */}
      <div className="mb-8">
        <button 
          className="w-full px-8 py-2 text-white bg-blue-500 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Create account
        </button>
        <button
          onClick={()=>navigate('/signin')}
          className="w-full px-8 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Sign in
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-48 bottom-2 w-full border-t border-gray-700 text-sm text-gray-400">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Links */}
          <div className="flex space-x-4">
            <span  className="hover:text-white">Business</span>
            <span  className="hover:text-white">Blog</span>
            <span className="hover:text-white">Jobs</span>
          </div>

          {/* Language Selector could be add*/}
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;