import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TracingBeam from '../ui/tracing-beam';

const ChatSpace = ({ messages }) => {
  const chatContainerRef = useRef(null); // Ref for the chat container
  const scrollToBottomRef = useRef(null); // Ref for the dummy div

  useEffect(() => {
    // Scroll to the dummy div whenever messages change
    scrollToBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div ref={chatContainerRef} className="flex-1 flex flex-col m-3 p-4 h-full min-h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden rounded-lg w-[95%] pt-10 no-scrollbar">
      {/* <TracingBeam className="px-6 py-4"> */}
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {/* Dummy div to scroll to */}
        <div ref={scrollToBottomRef}></div>
      {/* </TracingBeam> */}
    </div>
  );
};

export default ChatSpace;
