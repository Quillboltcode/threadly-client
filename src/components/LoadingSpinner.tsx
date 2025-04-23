import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div
        className="spinner w-12 h-12 border-4 border-t-blue-500 border-b-transparent rounded-full"
      ></div>
    </div>
  );
};

export default LoadingSpinner;