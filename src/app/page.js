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
// import { TypeBox } from "@/components/extras/typeBox";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
`;
  return (
    <main className="flex min-h-screen">
      {/* <TextGenerateEffect  words={words} /> */}
      {/* <Dropdown>
        <DropdownTrigger>
          <Button 
            variant="bordered" 
          >
            Open Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
      
      <div class="flex min-h-screen w-screen p-6 bg-[#0F1035]">
        <div class="w-1/5 p-4 bg-gray-300 overflow-y-auto rounded-l-2xl">
          <h1 class="text-xl font-bold mb-4">Simplify.io</h1>
          <p>Content for the left column</p>
        </div>

        <div class="flex-1 p-4 bg-white border-l border-r border-gray-200 flex flex-col relative overflow-y-auto">
          <div class="absolute inset-0 flex flex-col justify-between">
                
            <div class="flex justify-center items-center mb-0">
              <div class="w-3/5">
                <TypeBox />
              </div>
            </div>
          </div>
        </div>

        <div class="w-1/5 p-4 bg-gray-300 overflow-y-auto rounded-r-2xl">
            <h2 class="text-xl font-bol d mb-4">Right Column</h2>
            <p>Content for the right column</p>
        </div>
      </div>


    </main>
  );
}
