'use client';

import { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  Divider,
  useDisclosure,
  Spinner,
} from '@nextui-org/react';
import { TypeBox } from '@/components/extras/TypeBox';
import Upload from '@/components/extras/Upload';
import { ExpandableCardDemo } from '@/components/extras/DocumentCards';
import ChatSpace from '@/components/extras/ChatSpace';
import Image from 'next/image';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import ChatHistory from '@/components/extras/ChatHistory';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [modelType, setModelType] = useState('Choose a model');
  const [documents, setDocuments] = useState([
    {
      description: 'Analysis on pwc',
      title: 'pwc-ai-analysis',
      content: () => (
        <p>
          Lana Del Rey, an iconic American singer-songwriter, is celebrated for
          her melancholic and cinematic music style. Born Elizabeth Woolridge
          Grant in New York City, she has captivated audiences worldwide with
          her haunting voice and introspective lyrics. <br /> <br /> Her songs
          often explore themes of tragic romance, glamour, and melancholia,
          drawing inspiration from both contemporary and vintage pop culture.
          With a career that has seen numerous critically acclaimed albums, Lana
          Del Rey has established herself as a unique and influential figure in
          the music industry, earning a dedicated fan base and numerous
          accolades.
        </p>
      ),
    },
    {
      description: 'Babbu Maan',
      title: 'Mitran Di Chhatri',
      src: 'https://assets.aceternity.com/demos/babbu-maan.jpeg',
      ctaText: 'View',
      ctaLink: 'https://ui.aceternity.com/templates',
      content: () => (
        <p>
          Babu Maan, a legendary Punjabi singer, is renowned for his soulful
          voice and profound lyrics that resonate deeply with his audience. Born
          in the village of Khant Maanpur in Punjab, India, he has become a
          cultural icon in the Punjabi music industry. <br /> <br /> His songs
          often reflect the struggles and triumphs of everyday life, capturing
          the essence of Punjabi culture and traditions. With a career spanning
          over two decades, Babu Maan has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      ),
    },
    {
      description: 'Metallica',
      title: 'For Whom The Bell Tolls',
      src: 'https://assets.aceternity.com/demos/metallica.jpeg',
      ctaText: 'View',
      ctaLink: 'https://ui.aceternity.com/templates',
      content: () => (
        <p>
          Metallica, an iconic American heavy metal band, is renowned for their
          powerful sound and intense performances that resonate deeply with
          their audience. Formed in Los Angeles, California, they have become a
          cultural icon in the heavy metal music industry. <br /> <br /> Their
          songs often reflect themes of aggression, social issues, and personal
          struggles, capturing the essence of the heavy metal genre. With a
          career spanning over four decades, Metallica has released numerous hit
          albums and singles that have garnered them a massive fan following
          both in the United States and abroad.
        </p>
      ),
    },
    {
      description: 'Led Zeppelin',
      title: 'Stairway To Heaven',
      src: 'https://assets.aceternity.com/demos/led-zeppelin.jpeg',
      ctaText: 'View',
      ctaLink: 'https://ui.aceternity.com/templates',
      content: () => (
        <p>
          Led Zeppelin, a legendary British rock band, is renowned for their
          innovative sound and profound impact on the music industry. Formed in
          London in 1968, they have become a cultural icon in the rock music
          world. <br /> <br /> Their songs often reflect a blend of blues, hard
          rock, and folk music, capturing the essence of the 1970s rock era.
          With a career spanning over a decade, Led Zeppelin has released
          numerous hit albums and singles that have garnered them a massive fan
          following both in the United Kingdom and abroad.
        </p>
      ),
    },
    {
    description: " Based on the provided context, I can give you a one-line description of what it's about. The content appears to be discussing the impact of changing demographics, specifically the growing middle class and young population, on consumer behavior and trends in the fast-moving consumer goods (FMCG) industry in 2023.",
    title: "Indian-FMCG-Industry-Presentation[1]",
    content: " Based on the provided context about changing demographics, I can give you a summary that covers the key points.\n\nThe report highlights how the growing middle class and young population are driving consumption in various industries. To stay ahead of this trend, companies need to adapt to new consumer behaviors and preferences.\n\nIn terms of FMCG trends and innovations in 2023, sustainability, customer experience, digitalization, data analytics, and business development are expected to play a significant role. The report also mentions intelligence, e-commerce, blockchain, and opening up new opportunities as important areas to focus on.\n\nSome specific statistics mentioned in the report include:\n\n* 16% growth in the FMCG industry\n* 65% of consumers prioritizing sustainability when making purchasing decisions\n* 10% increase in e-commerce sales\n* 3% growth in blockchain-based transactions\n\nOverall, the report emphasizes the importance of understanding changing demographics and adapting to new trends and technologies to remain competitive in the market.\n\nPlease note that some sections of the text appear to be incomplete or unclear, which may affect the accuracy of my summary.",
    fileName: "Indian-FMCG-Industry-Presentation[1].pptx"
}
  ]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
    { sender: 'user', text: 'Can you tell me about your services?' },
  ]);


  useEffect(() => {
    console.log('Documents',selectedDocuments);
  },[selectedDocuments])

  const[loading,SetLoading] = useState(false);

 const handlePromptSubmit = async (text) => {
  // Add the new messages to the chat
  setMessages((prevMessages) => [
    ...prevMessages,
    { sender: 'user', text },
    // { sender: 'bot', text: `You said: ${text}` },
  ]);

  // Extract the file names from the selected documents
  const fileNames = selectedDocuments.map((doc) => doc.fileName);

  // Create the form data
  const formData = {
    query: text,
    fileName:fileNames,
  };

  // Make an API call
  try {
    SetLoading(true);
    const response = await axios.post('http://localhost:5001/response', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    SetLoading(false);

    console.log('API Response:', response.data);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'bot', text: `API Response: ${response.data.response}` },
    ]);
  } catch (error) {
    console.error('Error:', error);
  }
};

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [history,setHistory] = useState(
    [
      {
        title:"First history",
        chathistory: [],
      },
      {
        title: "Second history",
        chathistory: [],
      },
      {
        title:"Third history",
        chathistory:[]
      }]
  );

  return (
    <main className="flex flex-col p-4 md:flex-row h-screen gap-3">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner size="xl" />
        </div>
      )}
      <div className="flex flex-col gap-2 w-full md:w-1/5 p-4 bg-[#0c1b32] overflow-y-auto rounded-2xl">
        <h1 className="text-xl font-bold mb-4">Simplify.io</h1>
        <div className="flex flex-col justify-between h-full">
          <Upload setDocuments={setDocuments} />
          <ChatHistory chathistory={history} setHistory={setHistory}/>
          <Dropdown className="bg-gray-800">
            <DropdownTrigger>
              <Button variant="bordered" className="bg-gray-800 text-white border-gray-600">
                {modelType}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Model Selection"
              className="bg-gray-800 text-white"
              css={{
                backgroundColor: '#1f2937',
                '.nextui-dropdown-item': {
                  '&:hover': {
                    backgroundColor: '#111827',
                  },
                },
              }}
              onAction={(key) => setModelType(key)}
            >
              <DropdownItem key="llama-3">llama-3</DropdownItem>
              <DropdownItem key="gpt-3.5 turbo">gpt-3.5 turbo</DropdownItem>
              <DropdownItem key="gemini">gemini</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="flex-1 p-4 bg-[#0c1b32] flex flex-col relative overflow-y-auto rounded-2xl">
        <div className="absolute inset-0 flex flex-col justify-end">
          {modelType != 'Choose a model' && selectedDocuments.length > 0 ? (
            <div className="flex flex-col justify-center items-center mb-5 ">
              <ChatSpace messages={messages} />
              <div className="w-[90%] align-bottom">
                <TypeBox prompt={prompt} setPrompt={setPrompt} onSubmitPrompt={handlePromptSubmit} loading={loading} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mb-5">
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    Welcome Back!
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    Make sure to choose a model and the files you want to analyze before proceeding.
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href="https://twitter.com/mannupaaji"
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal text-black"
                    >
                      If you havent signed up yet →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full md:w-1/5 p-4 bg-[#0c1b32] overflow-y-auto rounded-2xl">
        <h2 className="text-xl text-purple-500 mt-5">Uploaded Documents</h2>
        <Divider className="mb-3 mt-2 bg-gray-600" />
        <ExpandableCardDemo
          documents={documents}
          selectedDocuments={selectedDocuments}
          setSelectedDocuments={setSelectedDocuments}
        />
      </div>
    </main>
  );
}
