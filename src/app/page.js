'use client'

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button
} from "@nextui-org/react";
import { TypeBox } from "@/components/extras/TypeBox";
import Upload, { TailwindcssButtons } from "@/components/extras/Upload";
import { useState } from "react";
// import { TypeBox } from "@/components/extras/typeBox";


export default function Home() {
  const [modelType,setModelType] = useState('Choose a model');


  const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
`;
  return (
    <main className="flex flex-col p-4 md:flex-row min-h-screen gap-3">
      {/* <TextGenerateEffect  words={words} /> */}

      <div className="flex flex-col gap-2 w-full md:w-1/5 p-4 bg-[#0c1b32] overflow-y-auto rounded-2xl ">
        <h1 className="text-xl font-bold mb-4">Simplify.io</h1>
        <div className="flex flex-col justify-between h-full">
          <Upload />
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
        <h2 className="text-xl font-bold mb-4">Right Column</h2>
        <p>Content for the right column</p>
      </div>
    </main>
  );
}
