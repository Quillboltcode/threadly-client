  // Component that includes both the trigger button and the modal

import { useState } from "react";
import { useNavigate } from "react-router";
import { ScreenMode } from "../App";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import NewPostButton from "./NewPostBtn";
import PostBox from "./PostBox";

  // Integrated PostBoxModal that uses NewPostButton for display
  const PostBoxModal: React.FC<{ mode: ScreenMode; isSidebar?: boolean }> = ({ mode, isSidebar }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const canCreatePost = isAuthenticated && user;
    const openModal = () => {
      if (canCreatePost) {
        setIsModalOpen(true);
      } else {
        // Optionally show a notification that user doesn't have permission
        toast.error("You don't have permission to create posts");
        navigate('/login');
      }
    };
    const closeModal = () => setIsModalOpen(false);

    return (
      <>

        {/* Render the NewPostButton  with conditional user authentication*/}
        <NewPostButton mode={mode} isSidebar={isSidebar} onClick={openModal} />
        {isModalOpen && <PostBox onClose={closeModal}  />}

      </>
    );
  };


export default PostBoxModal;