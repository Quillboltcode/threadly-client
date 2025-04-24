import { FaPen } from "react-icons/fa";
import { ScreenMode } from "../App";

type NewPostButtonProps = {
    mode: ScreenMode;
    isSidebar?: boolean; // Flag to determine if it's in the sidebar
    onClick?: () => void; // Optional click handler
    disabled?: boolean; // Disable btn for non user
  };

const NewPostButton: React.FC<NewPostButtonProps> = ({ mode, onClick, disabled }) => {
    if (mode === 'full') {
      return (
        <div className="fixed bottom-20 left-4 z-[999]">
          <button
            aria-label="Create Post"
            disabled={disabled}
            onClick={onClick}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPen />
            <span>New Post</span>
          </button>
        </div>
      );
    }
    return (
      <div className="fixed bottom-4 md:hidden right-2 z-[999]">
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

export default NewPostButton;