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
    <div className="p-4 h-80 overflow-y-scroll no-scrollbar">
      <div className="flex justify-between items-center">
        <h3>Chat History</h3>
        <Tooltip content="Create New Chat" className='text-black'>
          <Button isIconOnly color="danger" aria-label="Like" onClick={handleNewChat}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
          </Button>
        </Tooltip>
      </div>
      <Divider className="mb-3 mt-2" />
      {chathistory.length === 0 ? (
        <Card className="bg-gray-50 p-4 mb-3">
          <h4>No chats yet</h4>
          <h4>Your chat history will appear here</h4>
        </Card>
      ) : (
        chathistory.map((chat, index) => (
         <Card
            key={index}
            isPressable
            className="bg-gray-50 p-4 mb-3 transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 rou"
            onClick={() => handleChatClick(chat.title)}
          >
            <h4>{chat.title}</h4>
          </Card>
        ))
      )}
    </div>
  );
};

export default ChatHistory;
