import React from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';

const ChatMessage = ({ message }) => {
  return (
    <div className={`p-3 my-2 max-w-[80%] break-words ${message.sender === 'user' ? 'bg-blue-500 rounded-l-lg rounded-br-lg text-md text-white self-end' : 'bg-[#6993ff] rounded-r-lg rounded-bl-lg text-md text-white self-start'}`}>
      {message.sender === 'user' ? message.text : <TextGenerateEffect words={message.text}  />
      }
    </div>
  );
};

export default ChatMessage;
