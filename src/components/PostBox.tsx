import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { ChangeEvent, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGift, FaImage, FaPen, FaSmile, FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import { ScreenMode } from '../App';
import { useCreatePost } from '../hooks/usePost';
import { useAuth } from '../contexts/AuthContext';
type NewPostButtonProps = {
  mode: ScreenMode;
  isSidebar?: boolean; // Flag to determine if it's in the sidebar
  onClick?: () => void; // Optional click handler
  disabled?: boolean; // Disable btn for non user
};

type AttachmentType = 'image' | 'video' | 'emoji' | 'gif';

const URL = import.meta.env.VITE_API_URL;
const MAX_CHAR = 300;

// Main PostBox component that can be used as a modal
const PostBox: React.FC<{ onClose: () => void, url: string }> = ({ onClose }) => {
  const [content, setText] = useState<string>('');
  const [attachmentType, setAttachmentType] = useState<AttachmentType | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHAR) {
      setText(e.target.value);
    }
  };

  const { 
    createPost, 
    isPending, 
    isError, 
    error 
  } = useCreatePost({
    onSuccess: () => {
      // Reset form
      setText('');
      setAttachment(null);
      setAttachmentPreview(null);
    }
  });

  // Handle attachment button clicks
  const handleAttach = (type: AttachmentType) => {
    if (type === 'emoji') {
      // Handle emoji picker display
      setShowEmojiPicker(!showEmojiPicker);
      return;
    }

    setAttachmentType(type);

    // Setup accepted file types
    let acceptedTypes = '';
    switch (type) {
      case 'image':
        acceptedTypes = 'image/jpeg,image/png,image/jpg';
        break;
      case 'video':
        acceptedTypes = 'video/mp4,video/quicktime';
        break;
      case 'gif':
        acceptedTypes = 'image/gif';
        break;
    }

    // Set the accepted file types and trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.accept = acceptedTypes;
      fileInputRef.current.click();
    }
  };


  // Handle when a file is selected
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setAttachment(file);

      // Create preview URL for images and GIFs
      if (file.type.startsWith('image/') || file.type === 'image/gif') {
        const previewUrl = URL.createObjectURL(file);
        setAttachmentPreview(previewUrl);
      } else if (file.type.startsWith('video/')) {
        // For videos, we could create a thumbnail or just show the file name
        const previewUrl = URL.createObjectURL(file);
        setAttachmentPreview(previewUrl);
      }
    }
  };

  // Remove the selected attachment
  const removeAttachment = () => {
    if (attachmentPreview) {
      URL.revokeObjectURL(attachmentPreview);
    }
    setAttachment(null);
    setAttachmentPreview(null);
    setAttachmentType(null);
  };

  // Handle post submission  
  const handleSubmit = () => {
    createPost({
      content,
      file: attachment || undefined,
      attachmentType: attachmentType || undefined
    });
  };
  // Handle emoji selection
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    // Insert emoji at cursor position
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart || 0;
      const end = textarea.selectionEnd || 0;
      const textBefore = content.substring(0, start);
      const textAfter = content.substring(end);

      const newContent = textBefore + emojiData.emoji + textAfter;
      setText(newContent);

      // After state update, reset cursor position after the inserted emoji
      setTimeout(() => {
        const newCursorPos = start + emojiData.emoji.length;
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    } else {
      // If we can't access the textarea directly, just append to the end
      setText(prevContent => prevContent + emojiData.emoji);
    }

    // Close the emoji picker after selection
    setShowEmojiPicker(false);
  };
  // Close emoji picker when clicking outside
  React.useEffect(() => {
    if (showEmojiPicker) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element;
        if (!target.closest('.emoji-picker-container') &&
          !target.closest('button[data-emoji-button="true"]')) {
          setShowEmojiPicker(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showEmojiPicker]);


  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md backdrop-filter bg-opacity-40 z-50">
      <div className="PostBox bg-gray-900 p-4 rounded-lg w-full max-w-lg text-white">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-white font-medium">
            Cancel
          </button>
        </div>

        <textarea
          value={content}
          onChange={handleTextChange}
          placeholder="What's up?"
          className="w-full bg-gray-800 text-white p-2 rounded-md resize-none focus:outline-none"
          rows={3}
        ></textarea>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Attachment preview */}
        {attachmentPreview && (
          <div className="relative mb-4">
            {attachmentType === 'image' || attachmentType === 'gif' ? (
              <img
                src={attachmentPreview}
                alt="Attachment"
                className="max-h-64 rounded"
              />
            ) : attachmentType === 'video' ? (
              <video
                src={attachmentPreview}
                controls
                className="max-h-64 rounded"
              />
            ) : null}

            <button
              onClick={removeAttachment}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 opacity-75 hover:opacity-100"
            >
              &times;
            </button>
          </div>
        )}

        <div className="flex justify-between items-center">
          {/* Attachment buttons */}
          <div className="flex space-x-4 text-blue-400">
            <button onClick={() => handleAttach('image')}>
              <FaImage size={20} />
            </button>
            <button onClick={() => handleAttach('video')}>
              <FaVideo size={20} />
            </button>
            <button onClick={() => handleAttach('gif')}>
              <FaGift size={20} />
            </button>
            <button onClick={() => handleAttach('emoji')}
              data-emoji-button="true"
              >
              <FaSmile size={20} />
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-10 emoji-picker-container">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
      

        <button
          onClick={handleSubmit}
          disabled={isPending || (!content && !attachment)}
          className={`mt-3 w-1/2 justify-around p-2 rounded-md text-white font-bold 
              ${isPending || (!content && !attachment)
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-600 cursor-not-allowed'}`}
        >
          {isPending ? 'Posting..' : 'Post'}
        </button>

        {isError && (
        <div className="text-red-500 mt-2">
          Error posting: {(error as Error)?.message || 'Something went wrong'}
        </div>
      )}
      </div>
    </div>
  </div>
  );
};


const NewPostButton: React.FC<NewPostButtonProps> = ({ mode, onClick, disabled }) => {
  if (mode === 'full') {
    return (
      <div className="w-full p-4">
        <button
          aria-label="Create Post"
          disabled={disabled}
          onClick={onClick}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2"
        >
          <FaPen />
          <span>New Post</span>
        </button>
      </div>
    );
  }
  return (
    <div className="absolute bottom-4 left-4 z-[999]">
      <button
        aria-label="Create Post"
        onClick={onClick}
        disabled={disabled}
        className="bg-blue-500 text-white px-3 py-2 rounded-full flex items-center space-x-1"
      >
        <FaPen />
        {mode === 'icon' && <span>New Post</span>}
      </button>
    </div>
  );
};



// Component that includes both the trigger button and the modal
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
      {isModalOpen && <PostBox onClose={closeModal} url={URL} />}
    </>
  );
};

export { NewPostButton, PostBox, PostBoxModal };
export default PostBoxModal;
