'use client'

//import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Card, 
  CardBody,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import { TypeBox } from "@/components/extras/TypeBox";
import Upload, { TailwindcssButtons } from "@/components/extras/Upload";
import { useState } from "react";
import { ExpandableCardDemo } from "@/components/extras/DocumentCards";
import ChatHistory from "@/components/extras/ChatHistory";
// import { TypeBox } from "@/components/extras/typeBox";




export default function Home() {


  const [modelType,setModelType] = useState('Choose a model');
  const [documents,setDocuments] = useState([
  {
    description: "Analysis on pwc",
    title: "pwc-ai-analysis",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Summ",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
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
      );
    },
  },
  {
    description: "Babbu Maan",
    title: "Mitran Di Chhatri",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
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
      );
    },
  },

  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
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
      );
    },
  },
  {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
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
      );
    },
  },
  {
    description: "Mustafa Zahid",
    title: "Toh Phir Aao",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          &quot;Aawarapan&quot;, a Bollywood movie starring Emraan Hashmi, is
          renowned for its intense storyline and powerful performances. Directed
          by Mohit Suri, the film has become a significant work in the Indian
          film industry. <br /> <br /> The movie explores themes of love,
          redemption, and sacrifice, capturing the essence of human emotions and
          relationships. With a gripping narrative and memorable music,
          &quot;Aawarapan&quot; has garnered a massive fan following both in
          India and abroad, solidifying Emraan Hashmi&apos;s status as a
          versatile actor.
        </p>
      );
    },
  },
]);


  const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows`;
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <main className="flex flex-col p-4 md:flex-row min-h-screen gap-3">
      {/* <TextGenerateEffect  words={words} /> */}

      <div className="flex flex-col gap-2 w-full md:w-1/5 p-4 bg-[#0c1b32] overflow-y-auto rounded-2xl ">
        <h1 className="text-xl font-bold mb-4">Simplify.io</h1>
        <div className="flex flex-col justify-between h-full">
          <Upload setDocuments={setDocuments}/>
          <Dropdown className="bg-gray-800">
            <DropdownTrigger>
              <Button variant="bordered" className="bg-gray-800 text-white border-gray-600">{modelType}</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Model Selection"
              className="bg-gray-800 text-white "
              css={{

                backgroundColor: '#1f2937', // Ensure the background color is dark
                '.nextui-dropdown-item': {
                  '&:hover': {
                    backgroundColor: '#111827', // Darker color on hover
                  }
                }
              }}
              onAction={(key) => setModelType(key)}
            >
              <DropdownItem key="llama-3">llama-3</DropdownItem>
              <DropdownItem key="gpt-3.5 turbo">gpt-3.5 turbo</DropdownItem>
              <DropdownItem key="gemini">gemini</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <ChatHistory /> */}
        </div>
      </div>

      {/* Middle box chat area */}
      <div className="flex-1 p-4 bg-[#0c1b32] flex flex-col relative overflow-y-auto rounded-2xl">
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="flex justify-center items-center mb-5">
            <div className="w-3/5 align-bottom">
              <TypeBox />
            </div>
          </div>
        </div>
      </div>


      {/* Right box */}
      <div className="flex flex-col w-full md:w-1/5 p-4 bg-[#0c1b32] overflow-y-auto rounded-2xl">
        <ExpandableCardDemo documents={documents} />
      </div>
    </main>
  );
}
