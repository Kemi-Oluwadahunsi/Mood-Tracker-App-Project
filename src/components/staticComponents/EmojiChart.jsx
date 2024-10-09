import { X } from "lucide-react";
import { emojiCategories } from "./emojis";

export const EmojiChart = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Select an Emoji
        </h3>
        <div
          onClick={onClose}
          className="absolute top-5 right-10 cursor-pointer text-gray-900 dark:text-white"
        >
          <X />
        </div>

        {emojiCategories?.map((category) => (
          <div key={category.name} className="mb-4">
            <h4 className="text-md font-medium mb-2 text-gray-700 dark:text-gray-300">
              {category.name}
            </h4>
            <div className="grid grid-cols-8 gap-2">
              {category.emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onSelect(emoji);
                    onClose();
                  }}
                  className="text-2xl hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};
