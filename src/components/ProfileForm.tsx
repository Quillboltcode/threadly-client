import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateProfile } from "../hooks/useProfile";
import { User } from "../types/user";

const EditProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  return (
    <div className="flex flex-col items-center">
      {/* Button to open modal */}
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition border border-gray-700"
        onClick={() => setIsOpen(true)}
      >
        Edit Profile
      </button>

      {isOpen && (
        <ProfileModal
          displayName={displayName}
          setDisplayName={setDisplayName}
          description={description}
          setDescription={setDescription}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

// Extracted Profile Modal Component
const ProfileModal: React.FC<{
  displayName: string;
  setDisplayName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  profileImage: File | null;
  setProfileImage: (file: File | null) => void;
  coverImage: File | null;
  setCoverImage: (file: File | null) => void;
  closeModal: () => void;
}> = ({
  displayName,
  setDisplayName,
  description,
  setDescription,
  profileImage,
  setProfileImage,
  coverImage,
  setCoverImage,
  closeModal,
}) => {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "profile" | "cover") => {
      const file = event.target.files?.[0];
      if (file) {
        type === "profile" ? setProfileImage(file) : setCoverImage(file);
      }
    };

    const { mutateAsync: updateProfile } = useUpdateProfile();

    const handleSaveChanges = async () => {
      if (!displayName.trim()) {
        toast.error("Display name cannot be empty!");
        return;
      }

      try {
        // Prepare data for API call
        const updatedData: Partial<User> = {
          username: displayName,
          bios: description,
          avatar: profileImage ? URL.createObjectURL(profileImage) : undefined,
          
        };

        // Call the updateProfile mutation
        await toast.promise(
          updateProfile(updatedData, {
            onSuccess: () => {
              toast.success("Profile updated successfully!");
              closeModal();
            },
            onError: () => {
              toast.error("Failed to update profile!");
            },
          }),
          {
            loading: "Updating profile...",
            success: "Profile updated successfully!",
            error: "Failed to update profile!",
          }
        );
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Something went wrong!");
      }
    };



    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-900 text-white w-[450px] p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-center mb-4">Edit my profile</h2>

          {/* Banner Upload */}
          <div className="relative w-full h-28 bg-gray-800 rounded-lg flex justify-center items-center">
            {coverImage ? (
              <img src={URL.createObjectURL(coverImage)} alt="Cover" className="absolute h-full w-full rounded-lg object-cover" />
            ) : (
              <span className="text-gray-400">Upload Cover</span>
            )}
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, "cover")} />
          </div>

          {/* Profile Picture Upload */}
          <div className="relative w-20 h-20 -mt-10 mx-auto">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
              {profileImage ? <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-full h-full rounded-full object-cover" /> : "☕"}
            </div>
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, "profile")} />
          </div>

          {/* Input Fields */}
          <div className="mt-4">
            <label className="text-sm text-gray-400">Display Name</label>
            <input
              type="text"
              placeholder="e.g. Alice Roberts"
              className="w-full bg-gray-800 p-2 mt-1 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              placeholder="e.g. Artist, dog-lover, and avid reader."
              className="w-full bg-gray-800 p-2 mt-1 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button onClick={handleSaveChanges}
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition">
              Save Changes
            </button>
          </div>

          <button className="block w-full mt-2 text-center text-gray-400 hover:text-white transition" onClick={closeModal}>
            Cancel
          </button>
        </div>

      </div>

    );
  };

export default EditProfile;
