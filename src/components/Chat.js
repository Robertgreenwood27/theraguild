// components/Chat.js
import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to the chatroom!', sender: 'admin' },
    { id: 2, text: 'Hey everyone, I have a question about the habitat of this species.', sender: 'user1' },
    { id: 3, text: 'I can help with that! What would you like to know?', sender: 'user2' },
  ]);

  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '' && username.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: username,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <div className="bg-black rounded-lg shadow-md p-4 border border-white">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <span className="font-bold">{message.sender}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your username"
        />
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;