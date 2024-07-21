import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TracingBeam from '../ui/tracing-beam';
import { Button } from '@nextui-org/react'; // Import the Button component from NextUI

const ChatSpace = ({ messages }) => {
  const chatContainerRef = useRef(null); // Ref for the chat container
  const scrollToBottomRef = useRef(null); // Ref for the dummy div

  useEffect(() => {
    // Scroll to the dummy div whenever messages change
    scrollToBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  
  return (
    <div className="relative w-full">
      
      <div ref={chatContainerRef} className="flex-1 flex flex-col m-3 p-4 h-full min-h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden rounded-lg w-[95%] pt-10 no-scrollbar">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        <div ref={scrollToBottomRef}></div>
      </div>
    </div>
  );
};

export default ChatSpace;
