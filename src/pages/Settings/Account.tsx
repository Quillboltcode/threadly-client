import React, { useState } from 'react';
import {
  MdEmail,
  MdEdit,
  MdCalendarToday,
  MdLock,
  MdAlternateEmail,
  MdFileDownload,
  MdOutlineDelete,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { FaArrowLeft, FaSnowflake } from 'react-icons/fa';
import { useNavigate } from 'react-router';
// import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '../../contexts/AuthContext';
import EmailChangeForm from '../../components/EmailChangeForm';
import { useUpdateProfile } from '../../hooks/useProfile';
import toast from 'react-hot-toast';


const AccountSettings: React.FC = () => {

  const { user } = useAuth();
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const { mutate: updateProfile } = useUpdateProfile();

  const openModal = () => {
    setIsChangingEmail(!isChangingEmail);
  };

  // Handler for email change form submission
  const handleEmailChange = async (newEmail: string) => {
    if (!user) return;

    // Create a partial update with only the email field
    // This assumes your API supports partial updates
    updateProfile(
      {
        ...user,  // Include all current user data
        email: newEmail  // Override only the email field
      },
      {
        onSuccess: () => {
          toast.success('Email updated successfully');
          setIsChangingEmail(false);
        },
        onError: (error) => {
          console.error('Failed to update email:', error);
          toast.error('Failed to update email. Please try again.');
        }
      }
    );
    // Close the modal after submission
    
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/settings');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center space-x-3">
        <button onClick={handleBack} className="text-white text-xl">
          <FaArrowLeft></FaArrowLeft>
        </button>
        <h2 className="text-xl font-semibold">Account</h2>
      </div>

      {/* Email section */}
      <div className="flex justify-between items-center border-b border-gray-800 py-4">
        <div className="flex items-center gap-4">
          <MdEmail className="w-5 h-5" />
          <div>
            <div className="text-sm text-gray-400">Email</div>
            <div className="text-sm">{user?.email || ""}</div>
          </div>
        </div>
        <MdEdit onClick={openModal}
          className="text-blue-400 cursor-pointer" title="Change email" />
        {isChangingEmail && 
        <EmailChangeForm 
        onSubmit={handleEmailChange}
        onCancel={() => setIsChangingEmail(false)}
        />
        }
        
      </div>

      {/* Other settings */}
      {[
        { icon: <MdCalendarToday className="w-5 h-5" />, label: 'Birthday', action: 'Edit' },
        { icon: <MdLock className="w-5 h-5" />, label: 'Password' },
        { icon: <MdAlternateEmail className="w-5 h-5" />, label: 'Handle' },
        { icon: <MdFileDownload className="w-5 h-5" />, label: 'Export my data' },
      ].map(({ icon, label, action }) => (
        <div
          key={label}
          className="flex justify-between items-center border-b border-gray-800 py-4"
        >
          <div className="flex items-center gap-4">
            {icon}
            <span>{label}</span>
          </div>
          {action ? (
            <button className="text-blue-400 hover:underline">{action}</button>
          ) : (
            <MdOutlineArrowForwardIos className="text-gray-500" />
          )}
        </div>
      ))}

      {/* Danger zone */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center text-red-400 hover:text-red-500 cursor-pointer">
          <div className="flex items-center gap-4">
            <FaSnowflake className="w-5 h-5" />
            <span>Deactivate account</span>
          </div>
          <MdOutlineArrowForwardIos />
        </div>

        <div className="flex justify-between items-center text-red-500 hover:text-red-600 cursor-pointer">
          <div className="flex items-center gap-4">
            <MdOutlineDelete className="w-5 h-5" />
            <span>Delete account</span>
          </div>
          <MdOutlineArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
