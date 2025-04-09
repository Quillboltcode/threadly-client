import React, { useState } from 'react';

interface EmailChangeFormProps {
  onSubmit: (newEmail: string) => void;
  onCancel: () => void;
}

const EmailChangeForm: React.FC<EmailChangeFormProps> = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50 backdrop-blur-md backdrop-filter">
      <div className="bg-gray-600 p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Change Your Email</h1>
        <p className="text-gray-400 mb-4">Enter your new email address below.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Request Change
          </button>
        </form>
        <button
          onClick={onCancel}
          className="mt-2 w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmailChangeForm;