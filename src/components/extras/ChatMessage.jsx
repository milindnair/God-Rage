import React from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';

const ChatMessage = ({ message }) => {
  return (
    <div className={`p-3 my-2 rounded-lg max-w-[80%] break-words ${message.sender === 'user' ? 'bg-[#112546] text-white self-end' : 'bg-[#6993ff] text-black self-start'}`}>
      {message.sender === 'user' ? message.text : <TextGenerateEffect words={message.text}  />
      }
    </div>
  );
};

export default ChatMessage;
