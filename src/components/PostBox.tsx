import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaGift, FaImage, FaSmile, FaVideo } from 'react-icons/fa';
import { useCreatePost, useUpdatePost } from '../hooks/usePost';
import { Post } from '../types/post';

type AttachmentType = 'image' | 'video' | 'emoji' | 'gif';

const URL = import.meta.env.VITE_API_URL;
const MAX_CHAR = 300;

type PostBoxProps = {
  onClose: () => void;
  isEditing?: boolean;
  postToEdit?: Post;
};

const PostBox: React.FC<PostBoxProps> = ({
  onClose,
  isEditing = false,
  postToEdit
}) => {
  const [content, setContent] = useState(postToEdit?.content || '');
  const [attachmentType, setAttachmentType] = useState<AttachmentType | null>(null);
  const [attachments, setAttachments] = useState<File[]>(postToEdit?.image?.map((img) => new File([], img)) || []);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>(
    postToEdit?.image?.map((img) => `${import.meta.env.VITE_APP_UPLOAD}/${img}`) || []
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { createPost, isPending, isError, error } = useCreatePost({
    onSuccess: () => {
      setContent('');
      setAttachments([]);
      setAttachmentPreviews([]);
      onClose();
    }
  });

  const { updatePost } = useUpdatePost({
    onSuccess: () => {
      setContent('');
      setAttachments([]);
      setAttachmentPreviews([]);
      onClose();
    }
  })

  useEffect(() => {
    if (postToEdit && isEditing) {
      setContent(postToEdit.content);
      // Check if image exists and construct URL properly
      if (postToEdit.image?.length) {
        const imageUrls = postToEdit.image.map((img) =>
          img.startsWith('http') ? img : `${import.meta.env.VITE_APP_UPLOAD}/${img}`
        );
        setAttachmentPreviews(imageUrls);
      }
    }
  }, [postToEdit, isEditing]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHAR) {
      setContent(e.target.value);
    }
  };

  const handleAttach = (type: AttachmentType) => {
    if (type === 'emoji') {
      setShowEmojiPicker(!showEmojiPicker);
      return;
    }

    setAttachmentType(type);
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

    if (fileInputRef.current) {
      fileInputRef.current.accept = acceptedTypes;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Limit to 4 images
      const newFiles = attachments.concat(files).slice(0, 4);
      setAttachments(newFiles);

      // Generate preview URLs for all images
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setAttachmentPreviews(newPreviews);
    }
  };

  const removeAttachment = (index: number) => {
    const updatedAttachments = [...attachments];
    const removedFile = updatedAttachments.splice(index, 1)[0];
    setAttachments(updatedAttachments);

    const updatedPreviews = [...attachmentPreviews];
    updatedPreviews.splice(index, 1);
    setAttachmentPreviews(updatedPreviews);

    if (removedFile) {
      URL.revokeObjectURL(URL.createObjectURL(removedFile));
    }
  };

  const handleSubmit = () => {
    if (isEditing && postToEdit) {
      updatePost(postToEdit.id, {
        content,
        file: attachments.length > 0 ? attachments : undefined,
        attachmentType: attachmentType || undefined,
      });
    } else {
      createPost({
        content,
        file: attachments.length > 0 ? attachments : undefined,
        attachmentType: attachmentType || undefined,
      });
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart || 0;
      const end = textarea.selectionEnd || 0;
      const newContent = 
        content.slice(0, start) + emojiData.emoji + content.slice(end);
      setContent(newContent);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emojiData.emoji.length, start + emojiData.emoji.length);
      }, 0);
    } else {
      setContent(prev => prev + emojiData.emoji);
    }
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.emoji-picker-container') && 
          !target.closest('button[data-emoji-button="true"]')) {
        setShowEmojiPicker(false);
      }
    };
    
    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md backdrop-filter bg-opacity-40 z-50" 
    onClick={(e)=> e.stopPropagation()}
    >
      <div className="PostBox bg-gray-900 p-4 rounded-lg w-full max-w-lg text-white">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-white font-medium">
            Cancel
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleTextChange}
          placeholder="What's up?"
          className="w-full bg-gray-800 text-white p-2 rounded-md resize-none focus:outline-none"
          rows={3}
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
        />

{attachmentPreviews.length > 0 && (
          <div className="relative mb-4 flex flex-wrap gap-2">
            {attachmentPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview} alt={`Attachment ${index}`} className="max-h-32 rounded" />
                <button
                  onClick={() => removeAttachment(index)}
                  className="absolute top-1 right-1 bg-gray-800 text-white rounded-full p-1 opacity-75 hover:opacity-100"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex space-x-4 text-blue-400">
            <button onClick={() => handleAttach('image')}>
              <FaImage size={20} />
            </button>
            <button disabled onClick={() => handleAttach('video')}>
              <FaVideo size={20} />
            </button>
            <button disabled onClick={() => handleAttach('gif')}>
              <FaGift size={20} />
            </button>
            <button onClick={() => handleAttach('emoji')} data-emoji-button="true">
              <FaSmile size={20} />
            </button>
          </div>

          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-10 emoji-picker-container">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isPending || (!content && !attachments)}
            className={`mt-3 w-1/2 justify-around p-2 rounded-md text-white font-bold ${
              isPending || (!content && !attachments)
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            {isPending ? 'Saving...' : isEditing ? 'Update' : 'Post'}
          </button>
        </div>

        {isError && (
          <div className="text-red-500 mt-2">
            Error: {(error as Error)?.message || 'Something went wrong'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostBox;