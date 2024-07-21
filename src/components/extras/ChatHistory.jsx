import { Button, Card, Divider, Tooltip } from '@nextui-org/react';
import React from 'react';

const ChatHistory = ({ chathistory, setHistory, setMessages, setSelectedDocuments, setModelType }) => {

  const handleChatClick = (title) => {
    const selectedChat = chathistory.find(chat => {
      return chat.title === title;
    });

    if (selectedChat) {
      setMessages(selectedChat.chats);
      setModelType(selectedChat.model);
      setSelectedDocuments(selectedChat.fileNames);

    }
  };


  const handleNewChat = () => {
    setSelectedDocuments([]);
    setModelType('Choose a model');
  }

  return (
    <div className=" mb-5 mt-3 h-full  overflow-y-scroll no-scrollbar">
      <div className="flex justify-between items-center">
        <h2 className='text-xl font-  mt-'>Chat History</h2>
        <Tooltip content="Create New Chat" className='text-black font- '>
          <Button isIconOnly className="hover:bg-white/10" color="" aria-label="Like" onClick={handleNewChat}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
          </Button>
        </Tooltip>
      </div>
      <Divider className="mb-2 mt-2 bg-transparent" />
      {chathistory.length === 0 ? (
        <Card className="bg-gray-50 p-4 px-4 py-2 mb-1">
          <h2 className='text-md font- '>No chats yet</h2>
          <h2 className='text-md font- '>Your chat history will appear here</h2>
        </Card>
      ) : (
        chathistory.map((chat, index) => (
         <Card
            key={index}
            isPressable
            className="w-full bg-white/10 text-white px-4 py-3 mb-1.5 rounded-l-lg rounded-r-lg transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 rou"
            onClick={() => handleChatClick(chat.title)}
          >
            <h2 className='text-md font- '>{chat.title}</h2>
          </Card>
        ))
      )}
    </div>
  );
};

export default ChatHistory;
