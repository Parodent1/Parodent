import React, { useEffect, useState, useRef } from 'react';
import './EmojiSelector.css';

const EmojiSelector = ({
emojiKey = "doctorEmoji",
allowedEmojis = ['🩺', '🧑‍⚕️', '👨‍⚕️', '👩‍⚕️', '💉', '⚕️'],
onEmojiChange = () => {},
}) => {
const [selectedEmoji, setSelectedEmoji] = useState('');
const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef();

useEffect(() => {
const savedEmoji = localStorage.getItem(emojiKey);
if (savedEmoji) {
    setSelectedEmoji(savedEmoji);
    onEmojiChange(savedEmoji);
}
}, [emojiKey]);

const handleSelect = (emoji) => {
setSelectedEmoji(emoji);
localStorage.setItem(emojiKey, emoji);
onEmojiChange(emoji);
setIsOpen(false);
};

const handleRemove = () => {
setSelectedEmoji('');
localStorage.removeItem(emojiKey);
onEmojiChange('');
setIsOpen(false);
};

const handleOutsideClick = (e) => {
if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
    setIsOpen(false);
}
};

useEffect(() => {
if (isOpen) {
    document.addEventListener("mousedown", handleOutsideClick);
} else {
    document.removeEventListener("mousedown", handleOutsideClick);
}
return () => document.removeEventListener("mousedown", handleOutsideClick);
}, [isOpen]);

return (
<div className="emojiDropdownWrapper" ref={dropdownRef}>
    <button className="emojiToggleBtn" onClick={() => setIsOpen(!isOpen)}>
    {selectedEmoji || '🙂'} 
    </button>

    {isOpen && (
    <div className="emojiDropdown">
        <div className="emojiList">
        {allowedEmojis.map((emoji) => (
            <button
            key={emoji}
            onClick={() => handleSelect(emoji)}
            className={`emojiItem ${selectedEmoji === emoji ? 'active' : ''}`}
            >
            {emoji}
            </button>
        ))}
        </div>
        <button className="removeEmojiBtn" onClick={handleRemove}>
        Прибрати емодзі
        </button>
    </div>
    )}
</div>
);
};

export default EmojiSelector;