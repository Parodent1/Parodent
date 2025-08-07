import { useEffect, useRef } from "react";
import "./EmojiSelector.css";

const EmojiSelector = ({
  emojiKey = "doctorEmoji",
  allowedEmojis = ["🩺", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "💉","🩺", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "💉","🩺", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", ],
  onEmojiChange = () => {},
  isOpen,
  setIsOpen,
}) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const savedEmoji = localStorage.getItem(emojiKey);
    if (savedEmoji) {
      onEmojiChange(savedEmoji);
    }
  }, [emojiKey]);

  const handleSelect = (emoji) => {
    localStorage.setItem(emojiKey, emoji);
    onEmojiChange(emoji);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="emojiDropdownWrapper" ref={dropdownRef}>
      <div className="emojiDropdown">
        <div className="emojiList">
          {allowedEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleSelect(emoji)}
              className="emojiItem"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiSelector;
